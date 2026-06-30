from pathlib import Path

from app.services.document_processor import DocumentProcessor

processor = DocumentProcessor()

text = processor.process_pdf(
    Path("../storage/uploads/89838abd-1107-46df-b382-63b0f28acad5.pdf")
)

print(text[:1000])