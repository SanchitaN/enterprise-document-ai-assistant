from fastapi import FastAPI
from sqlalchemy import text

from app.core.config import settings
from app.db.database import engine
from app.api.v1.auth import router as auth_router
from app.db.base import Base
from app.models.user import User
from app.models.document import Document
from app.api.v1.documents import router as document_router
from app.api.v1.chat import router as chat_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(auth_router)
app.include_router(document_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "message": "Backend Running"
    }


@app.get("/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "database": "connected",
        "status": "healthy"
    }