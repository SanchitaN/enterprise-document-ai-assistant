from pathlib import Path
import pickle

import faiss
import numpy as np


class VectorStore:

    def __init__(self, dimension=384):
        self.dimension = dimension

        self.storage_dir = Path("storage/vector_index")
        self.storage_dir.mkdir(parents=True, exist_ok=True)

        self.index_path = self.storage_dir / "index.faiss"
        self.metadata_path = self.storage_dir / "metadata.pkl"

        if self.index_path.exists():
            self.index = faiss.read_index(str(self.index_path))

            with open(self.metadata_path, "rb") as f:
                self.documents = pickle.load(f)

        else:
            self.index = faiss.IndexFlatIP(dimension)
            self.documents = []

    def add_embeddings(self, embeddings, chunk_metadata):
        import numpy as np

        embeddings = np.asarray(embeddings, dtype=np.float32)

        if embeddings.ndim == 1:
            embeddings = embeddings.reshape(1, -1)

        self.index.add(embeddings)

        self.documents.extend(chunk_metadata)
        self.save()

    def save(self):
        faiss.write_index(
            self.index,
            str(self.index_path),
        )

        with open(self.metadata_path, "wb") as f:
            pickle.dump(
                self.documents,
                f,
            )

    def search(self, query_embedding, top_k=20):
        scores, indices = self.index.search(
            query_embedding.astype(np.float32),
            k=top_k,
        )

        results = []

        for idx in indices[0]:
            if idx != -1:
                results.append(
                    self.documents[idx]
                )

        return results