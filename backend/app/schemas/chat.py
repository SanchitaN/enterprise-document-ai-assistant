from typing import Optional

from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    document_id: int
    conversation_id: Optional[int] = None


class SourceResponse(BaseModel):
    document_id: int
    filename: str
    page: int
    chunk_index: int


class ChatResponse(BaseModel):
    conversation_id: int
    answer: str
    sources: list[SourceResponse]