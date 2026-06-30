from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    Source,
)
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

chat_service = ChatService()


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(request: ChatRequest):

    answer, results = chat_service.ask(
        request.question
    )

    return ChatResponse(
        answer=answer,
        sources=[
            Source(
                filename=item.filename,
                page=item.page,
                chunk_index=item.chunk_index,
            )
            for item in results
        ],
    )