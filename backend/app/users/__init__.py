from fastapi import APIRouter
from fastapi_users import FastAPIUsers

from app.models.user import User, UserCreate, UserDB, UserUpdate
from app.users.auth_backend import authentication_backend
from app.users.user_manager import get_user_manager

fastapi_users = FastAPIUsers(
    get_user_manager,
    [authentication_backend],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)


auth_router = APIRouter(prefix="/auth", tags=["auth"])
auth_router.include_router(fastapi_users.get_auth_router(authentication_backend), prefix="/jwt")
auth_router.include_router(fastapi_users.get_register_router())
auth_router.include_router(fastapi_users.get_reset_password_router())
auth_router.include_router(fastapi_users.get_verify_router())

users_router = APIRouter()
users_router.include_router(auth_router)
users_router.include_router(fastapi_users.get_users_router(), prefix="/users", tags=["users"])


current_active_user = fastapi_users.current_user(active=True)
