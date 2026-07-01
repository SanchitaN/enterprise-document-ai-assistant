from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    SourceResponse,
)

from app.services.chat_service import ChatService
from app.services.conversation_service import (
    add_message,
    create_or_get_conversation,
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

chat_service = ChatService()


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:

        conversation = create_or_get_conversation(
            db=db,
            current_user=current_user,
            document_id=request.document_id,
            conversation_id=request.conversation_id,
            title=request.question[:60],
        )

        add_message(
            db=db,
            conversation=conversation,
            role="user",
            content=request.question,
        )

        answer, results = chat_service.ask(
            request.question,
            request.document_id,
        )

        add_message(
            db=db,
            conversation=conversation,
            role="assistant",
            content=answer,
        )

        return ChatResponse(
            conversation_id=conversation.id,
            answer=answer,
            sources=[
                SourceResponse(
                    document_id=item.document_id,
                    filename=item.filename,
                    page=item.page,
                    chunk_index=item.chunk_index,
                )
                for item in results
            ],
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )