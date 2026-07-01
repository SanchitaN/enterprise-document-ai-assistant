from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.models.message import Message
from app.models.user import User


def create_conversation(
    db: Session,
    current_user: User,
    title: str,
    document_id: int,
) -> Conversation:
    conversation = Conversation(
        title=title,
        user_id=current_user.id,
        document_id=document_id,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def get_conversations(
    db: Session,
    current_user: User,
):
    return (
        db.query(Conversation)
        .filter(
            Conversation.user_id == current_user.id
        )
        .order_by(
            Conversation.updated_at.desc()
        )
        .all()
    )


def get_conversation(
    db: Session,
    conversation_id: int,
    current_user: User,
):
    return (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )


def delete_conversation(
    db: Session,
    conversation: Conversation,
):
    db.delete(conversation)
    db.commit()


def add_message(
    db: Session,
    conversation: Conversation,
    role: str,
    content: str,
):
    message = Message(
        conversation_id=conversation.id,
        role=role,
        content=content,
    )

    db.add(message)

    db.commit()

    db.refresh(message)

    return message


def get_messages(
    db: Session,
    conversation: Conversation,
):
    return (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation.id
        )
        .order_by(
            Message.created_at.asc()
        )
        .all()
    )


def create_or_get_conversation(
    db: Session,
    current_user: User,
    document_id: int,
    conversation_id: int | None,
    title: str,
):
    if conversation_id is None:
        return create_conversation(
            db=db,
            current_user=current_user,
            title=title,
            document_id=document_id,
        )

    conversation = get_conversation(
        db=db,
        conversation_id=conversation_id,
        current_user=current_user,
    )

    if conversation is None:
        raise ValueError("Conversation not found")

    return conversation