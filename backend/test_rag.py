from pathlib import Path

from app.services.document_processor import DocumentProcessor
from app.services.chunker import DocumentChunker
from app.services.rag_service import RAGService

processor = DocumentProcessor()
chunker = DocumentChunker()
rag = RAGService()

text = processor.process_pdf(
    Path("../storage/uploads/89838abd-1107-46df-b382-63b0f28acad5.pdf")
)

chunks = chunker.split_text(text)

rag.index_document(chunks)

question = input("Ask a question: ")

results = rag.retrieve(question)

print("\nTop Retrieved Chunks:\n")

for i, chunk in enumerate(results, start=1):
    print(f"----- Chunk {i} -----")
    print(chunk[:500])
    print()