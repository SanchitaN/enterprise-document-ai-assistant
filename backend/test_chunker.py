from pathlib import Path

from app.services.document_processor import DocumentProcessor
from app.services.chunker import DocumentChunker

processor = DocumentProcessor()
chunker = DocumentChunker()

text = processor.process_pdf(
    Path("../storage/uploads/89838abd-1107-46df-b382-63b0f28acad5.pdf")
)

chunks = chunker.split_text(text)

print(f"Total Chunks: {len(chunks)}")

print("\nFirst Chunk:\n")
print(chunks[0])