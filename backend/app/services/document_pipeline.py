from pathlib import Path

from sqlalchemy.orm import Session

from app.models.document import Document
from app.services.document_processor import DocumentProcessor
from app.services.chunker import DocumentChunker
from app.services.embedding_services import EmbeddingService
from app.services.vector_store import VectorStore


class DocumentPipeline:

    def __init__(self):
        self.processor = DocumentProcessor()
        self.chunker = DocumentChunker()
        self.embedding_service = EmbeddingService()
        self.vector_store = VectorStore()

    def process_document(
    self,
    db: Session,
    document: Document,
    file_path: Path,
):
        try:
            document.status = "processing"

            text = self.processor.process_document(file_path)
            if not text.strip():
                raise ValueError(
                    "No extractable text found in the document."
                )
            
            from app.models.chunk_metadata import ChunkMetadata

            chunks = self.chunker.split_text(text)
            if not chunks:
                raise ValueError(
                    "No text could be extracted from this PDF."
                )
            
            metadata = []

            for i, chunk in enumerate(chunks):
                metadata.append(
                    ChunkMetadata(
                        document_id=document.id,
                        filename=document.filename,
                        page=1,          # We'll improve this later
                        chunk_index=i,
                        text=chunk,
                    )
                )

            embeddings = self.embedding_service.embed_texts(chunks)
            

        
            self.vector_store.add_embeddings(
                embeddings,
                metadata,
            )
            

            document.status = "processed"
            document.text_length = len(text)
            document.chunk_count = len(chunks)

            db.commit()
            db.refresh(document)

        except Exception as e:
            db.rollback()

            document.status = "failed"
            document.processing_error = str(e)

            db.commit()
            raise