import numpy as np

from app.services.embedding_services import EmbeddingService
from app.services.vector_store import VectorStore

embedding_service = EmbeddingService()

vector_store = VectorStore()

chunks = [
    "The company revenue increased by 20 percent.",
    "Artificial Intelligence is transforming healthcare.",
    "The bridge design uses prestressed concrete.",
]

embeddings = embedding_service.embed_texts(chunks)

vector_store.add_embeddings(
    embeddings,
    chunks,
)

query = "How much did the company earn?"

query_embedding = embedding_service.embed_texts(
    [query]
)

results = vector_store.search(
    query_embedding,
)

print(results)