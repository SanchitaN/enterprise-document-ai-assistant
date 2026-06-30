from app.services.embedding_services import EmbeddingService

service = EmbeddingService()

embeddings = service.embed_texts([
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
])

print(embeddings.shape)