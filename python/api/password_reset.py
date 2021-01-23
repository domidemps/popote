from datetime import datetime, timedelta

from fastapi import APIRouter, Body, HTTPException, Request, status
from jose import JWTError, jwt
from pony.orm import db_session
from pydantic import EmailStr, UUID4

from core.email.password_reset import send_password_reset_email
from models.user import User
from security.oauth import ALGORITHM, SECRET_KEY, get_password_hash
from security.scopes import users_reset

RESET_PASSWORD_BAD_TOKEN = "RESET_PASSWORD_BAD_TOKEN"

router = APIRouter()


@router.post("/forgot-password", status_code=status.HTTP_202_ACCEPTED)
async def forgot_password(request: Request, email: EmailStr = Body(..., embed=True)):
    with db_session:
        user = User.get(email=email)

    if user is not None:
        expire = datetime.utcnow() + timedelta(minutes=15)
        token_data = {"user_id": str(user.id), "scopes": [users_reset], "exp": expire}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        client_url = request.client.host + ":" + request.client.port
        await send_password_reset_email(user, token, client_url)


@router.post("/reset-password")
async def reset_password(token: str, password: str):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_scopes = data.get("scopes", [])
        if users_reset not in token_scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": users_reset},
            )
        user_id = data.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=RESET_PASSWORD_BAD_TOKEN,
            )

        try:
            user_id = UUID4(user_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=RESET_PASSWORD_BAD_TOKEN,
            )
        with db_session:
            user = User.get(uuid=user_id)
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=RESET_PASSWORD_BAD_TOKEN,
                )
            user.password = get_password_hash(password)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=RESET_PASSWORD_BAD_TOKEN,
        )
