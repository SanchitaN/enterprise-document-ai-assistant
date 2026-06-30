from datetime import datetime

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    filename: str
    file_type: str
    file_size: int
    status: str
    text_length: int
    chunk_count: int
    processing_error: str | None
    upload_time: datetime

    class Config:
        from_attributes = True