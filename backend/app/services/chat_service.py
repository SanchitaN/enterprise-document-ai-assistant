from app.services.embedding_services import EmbeddingService
from app.services.vector_store import VectorStore
from app.services.llm_service import LLMService


class ChatService:

    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.vector_store = VectorStore()
        self.llm = LLMService()

    def ask(self, question: str):

        query_embedding = self.embedding_service.embed_texts(
            [question]
        )

        results = self.vector_store.search(query_embedding)
        print("=" * 50)
        print("Retrieved Results:")
        print(results)
        print("=" * 50)
        context = [
            item.text
            for item in results
        ]

        answer = self.llm.generate_answer(
            question,
            context,
        )

        return answer, results

        