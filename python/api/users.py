from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Request, Response, Security, status
from jose import JWTError, jwt
from pony.orm import RowNotFound, TransactionIntegrityError, db_session
from pydantic import BaseModel, UUID4

from core.email.account_activation import send_account_activation_email
from models.user import User
from security.oauth import ALGORITHM, SECRET_KEY, get_current_active_user, get_password_hash
from security.scopes import users_readwrite

router = APIRouter()

ACTIVATE_USER_BAD_TOKEN = "ACTIVATE_USER_BAD_TOKEN"


class UserCreationPayload(BaseModel):
    name: str
    email: str
    password: str


@router.get("/users/me")
async def read_user_me(current_user: User = Security(get_current_active_user, scopes=users_readwrite)) -> dict:
    return current_user.to_dict(exclude=("uuid", "password"))


@router.post("/users", status_code=201)
async def create_user(request: Request, response: Response, name: str, password: str, email: str):
    hashed_password = get_password_hash(password)
    try:
        with db_session:
            user = User(name=name, email=email, password=hashed_password)
    except TransactionIntegrityError as e:
        try:
            with db_session:
                user = User.get(email=email)
                if not user.active:
                    now = datetime.utcnow()
                    if (user.creation_date - now).days == 0:
                        raise HTTPException(
                            status_code=400,
                            detail=(
                                f"An inactive user with the same email address ({email}) already exists in the "
                                f"database."
                            ),
                        ) from e
                    user.set(name=name, password=hashed_password, creation_date=now)
        except RowNotFound:
            raise HTTPException(
                status_code=409,
                detail=f"A user with the same email address ({email}) already exists in the database.",
            ) from e

    response.headers["Location"] = f"/users/users/{user.uuid}"

    expire = datetime.utcnow() + timedelta(days=1)
    token_data = {"user_id": str(user.uuid), "scopes": ["users:activate"], "exp": expire}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    client_url = request.client.host + ":" + "8080"
    await send_account_activation_email(user, token, client_url)


@router.post("/users/activate")
async def activate_user(token: str):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_scopes = data.get("scopes", [])
        if "users:reset" not in token_scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": "users:activate"},
            )
        user_id = data.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ACTIVATE_USER_BAD_TOKEN,
            )

        try:
            user_id = UUID4(user_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ACTIVATE_USER_BAD_TOKEN,
            )
        with db_session:
            user = User.get(uuid=user_id)
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=ACTIVATE_USER_BAD_TOKEN,
                )
            user.active = True
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ACTIVATE_USER_BAD_TOKEN,
        )


@router.post("/users/me")
async def update_user_name(
    new_name: str, user: User = Security(get_current_active_user, scopes=[users_readwrite])
) -> str:
    with db_session:
        user.name = new_name
    return "Username updated"


@router.delete("/users")
async def delete_user(user_id) -> str:
    return f"DELETE TBA {user_id}"
