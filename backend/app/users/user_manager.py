from typing import Optional

import structlog
from fastapi import Depends, Request
from fastapi_users import BaseUserManager
from fastapi_users.db import TortoiseUserDatabase

from app.db import get_user_db
from app.emailing.verify_account import send_account_verification_email
from app.models.user import UserCreate, UserDB

SECRET = "SECRET"
logger = structlog.getLogger()


class UserManager(BaseUserManager[UserCreate, UserDB]):
    user_db_model = UserDB
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: UserDB, request: Optional[Request] = None):
        logger.info(f"User {user.id} has registered.")
        await self.request_verify(user, request)

    async def on_after_request_verify(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ):
        await send_account_verification_email(user, token)
        logger.info(f"Verification requested for user {user.id}. Verification token: {token}")

    async def on_after_forgot_password(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ):
        logger.info(f"User {user.id} has forgot their password. Reset token: {token}")


async def get_user_manager(user_db: TortoiseUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)
