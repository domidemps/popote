from fastapi import APIRouter, HTTPException, Security
from pony.orm import TransactionIntegrityError, db_session

from models.user import User
from security.oauth import get_current_active_user, get_password_hash

router = APIRouter()


@router.get("/users/users/{email}")
async def read_user(email: str) -> str:
    with db_session:
        user = User.get(email=email)
    return user.name


@router.get("/users")
async def read_users(_: User = Security(get_current_active_user, scopes=["users:read"])) -> list[dict[str, str]]:
    with db_session:
        users = User.select()
        return [user.to_dict() for user in users]


@router.post("/users")
def create_user(name: str, email: str, password: str) -> str:
    hashed_password = get_password_hash(password)
    try:
        with db_session:
            User(name=name, email=email, password=hashed_password)
    except TransactionIntegrityError as e:
        raise HTTPException(
            status_code=409, detail=f"A user with the same email address ({email}) already exists in the database."
        ) from e
    return hashed_password


@router.get("/users/me")
async def read_user_me(current_user: User = Security(get_current_active_user, scopes=["users:read"])) -> dict:
    return current_user.to_dict(exclude=("uuid", "password"))


@router.post("/users/me")
def update_user_name(new_name: str, user: User = Security(get_current_active_user, scopes=["users:write"])) -> str:
    with db_session:
        user.name = new_name
    return "Username updated successfully"


@router.delete("/users")
async def delete_user(user_id) -> str:
    return f"DELETE TBA {user_id}"
