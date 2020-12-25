from fastapi import APIRouter, Depends, Security
from pony.orm import db_session

from security.oauth import get_current_active_user, get_password_hash
from models.user import User

router = APIRouter()


@router.get("/users/users/{email}")
async def read_user(email: str) -> str:
    with db_session:
        user = User.get(email=email)
    return user.name


@router.post("/users")
def create_user(name: str, email: str, password: str) -> str:
    hashed_password = get_password_hash(password)
    with db_session:
        User(name=name, email=email, password=hashed_password)
    return hashed_password


@router.get("/users/me")
async def read_user_me(current_user: User = Security(get_current_active_user, scopes=["user:read"])):
    # TODO: Return a JSON containing username, email...
    return current_user


@router.post("/users/me")
@db_session
def update_user_name(new_name: str, current_user_uuid: str = Security(get_current_active_user, scopes=["user:write"])):
    user = User[current_user_uuid]
    user.name = new_name
    return user.to_dict()


@router.delete("/users")
async def delete_user(user_id) -> str:
    return f"DELETE TBA {user_id}"
