from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
)

from fastapi.responses import FileResponse
from pathlib import Path
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.services.document_service import (
    save_document,
    get_documents,
    get_document,
    delete_document,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=201,
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return save_document(
        db,
        file,
        current_user,
    )


@router.get(
    "",
    response_model=list[DocumentResponse],
)
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_documents(
        db,
        current_user,
    )


@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def retrieve_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_document(
        db,
        document_id,
        current_user,
    )


@router.delete(
    "/{document_id}",
)


@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = get_document(
        db,
        document_id,
        current_user,
    )

    upload_dir = Path("storage/uploads")

    file_path = (
        upload_dir /
        document.stored_filename
    )

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Document file not found.",
        )

    return FileResponse(
        path=file_path,
        filename=document.filename,
        media_type="application/pdf",
    )

def remove_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete_document(
        db,
        document_id,
        current_user,
    )