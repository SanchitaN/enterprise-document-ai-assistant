from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
    MessageResponse,
)

from app.services.conversation_service import (
    create_conversation,
    get_conversations,
    get_conversation,
    delete_conversation,
    get_messages,
)

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.post(
    "",
    response_model=ConversationResponse,
    status_code=201,
)
def create(
    request: ConversationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_conversation(
        db,
        current_user,
        request.title,
        request.document_id,
    )


@router.get(
    "",
    response_model=list[ConversationResponse],
)
def list_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_conversations(
        db,
        current_user,
    )


@router.get(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def retrieve(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = get_conversation(
        db,
        conversation_id,
        current_user,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    return conversation


@router.get(
    "/{conversation_id}/messages",
    response_model=list[MessageResponse],
)
def messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = get_conversation(
        db,
        conversation_id,
        current_user,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    return get_messages(
        db,
        conversation,
    )


@router.delete(
    "/{conversation_id}",
    status_code=204,
)
def remove(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = get_conversation(
        db,
        conversation_id,
        current_user,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    delete_conversation(
        db,
        conversation,
    )