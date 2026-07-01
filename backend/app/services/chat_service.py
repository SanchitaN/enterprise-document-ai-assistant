from app.services.embedding_services import EmbeddingService
from app.services.vector_store import VectorStore
from app.services.llm_service import LLMService


class ChatService:

    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.vector_store = VectorStore()
        self.llm = LLMService()

    def ask(
    self,
    question: str,
    document_id: int,
    ):

        query_embedding = self.embedding_service.embed_texts(
            [question]
        )

        results = self.vector_store.search(
            query_embedding,
            top_k=20,
        )

        results = [
            chunk
            for chunk in results
            if chunk.document_id == document_id
        ]

        if len(results) == 0:
            return (
                "No relevant information was found in the selected document.",
                [],
            )
        
        context = [
            item.text
            for item in results
        ]


        results = [
        chunk
        for chunk in results
        if chunk.document_id == document_id
        ]

        answer = self.llm.generate_answer(
            question,
            context,
        )

        return answer, results

        