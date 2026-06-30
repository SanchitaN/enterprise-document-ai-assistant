from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.models.user import User
from app.schemas.user import UserCreate


def create_user(db: Session, user: UserCreate) -> User:

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )

    hashed_password = hash_password(user.password)

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def login_user(
    db: Session,
    email: str,
    password: str,
):
    print("=" * 50)
    print("EMAIL RECEIVED:", repr(email))
    print("PASSWORD RECEIVED:", repr(password))

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    print("USER FOUND:", user)

    if not user:
        print("FAILED: USER NOT FOUND")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    print("HASH IN DB:", user.hashed_password)

    password_ok = verify_password(
        password,
        user.hashed_password,
    )

    print("PASSWORD CHECK:", password_ok)

    if not password_ok:
        print("FAILED: PASSWORD INCORRECT")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    print("LOGIN SUCCESS")

    access_token = create_access_token(
        {"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }