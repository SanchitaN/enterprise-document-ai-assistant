from datetime import datetime

from pydantic import BaseModel


class ConversationCreate(BaseModel):
    title: str
    document_id: int


class ConversationResponse(BaseModel):
    id: int
    title: str
    document_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True