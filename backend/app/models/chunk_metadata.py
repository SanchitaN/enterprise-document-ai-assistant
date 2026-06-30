from dataclasses import dataclass


@dataclass
class ChunkMetadata:
    document_id: int
    filename: str
    page: int
    chunk_index: int
    text: str