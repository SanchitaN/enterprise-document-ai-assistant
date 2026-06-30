from app.services.embedding_services import EmbeddingService
from app.services.vector_store import VectorStore


class RAGService:

    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.vector_store = VectorStore()

    def index_document(self, chunks):
        embeddings = self.embedding_service.embed_texts(chunks)
        self.vector_store.add_embeddings(
            embeddings,
            chunks,
        )

    def retrieve(self, question, k=5):
        query_embedding = self.embedding_service.embed_texts(
            [question]
        )

        return self.vector_store.search(
            query_embedding,
            k,
        )