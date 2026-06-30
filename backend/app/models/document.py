from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import relationship

from app.db.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    stored_filename = Column(String(255), unique=True, nullable=False)

    file_type = Column(String(50), nullable=False)

    file_size = Column(Integer, nullable=False)

    status = Column(
        String(50),
        default="uploaded",
        nullable=False,
    )

    text_length = Column(
    Integer,
    default=0,
    nullable=False,
)

    chunk_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    processing_error = Column(
        Text,
        nullable=True,
    )

    upload_time = Column(
            DateTime,
            default=datetime.utcnow,
        )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    owner = relationship(
    "User",
    back_populates="documents",
)