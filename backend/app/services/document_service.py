from pathlib import Path
import shutil
import uuid

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.document import Document
from app.services.document_pipeline import DocumentPipeline

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]
UPLOAD_DIR = PROJECT_ROOT / "storage" / "uploads"

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".pptx",
    ".png",
    ".jpg",
    ".jpeg",
}

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB


def save_document(
    db: Session,
    file: UploadFile,
    current_user,
):
    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type.",
        )

    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)

    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File exceeds 20 MB.",
        )

    unique_filename = f"{uuid.uuid4()}{extension}"

    upload_path = UPLOAD_DIR / unique_filename

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    document = Document(
        filename=file.filename,
        stored_filename=unique_filename,
        file_type=extension,
        file_size=file_size,
        owner_id=current_user.id,
        status="uploaded",
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    pipeline = DocumentPipeline()

    pipeline.process_document(
        db=db,
        document=document,
        file_path=upload_path,
    )

    db.refresh(document)

    return document


from fastapi import HTTPException, status


def get_documents(
    db: Session,
    current_user,
):
    return (
        db.query(Document)
        .filter(Document.owner_id == current_user.id)
        .order_by(Document.upload_time.desc())
        .all()
    )


def get_document(
    db: Session,
    document_id: int,
    current_user,
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.owner_id == current_user.id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    return document


def delete_document(
    db: Session,
    document_id: int,
    current_user,
):
    document = get_document(
        db,
        document_id,
        current_user,
    )

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully."
    }