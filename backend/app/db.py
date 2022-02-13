import os

from fastapi_users.db import TortoiseUserDatabase

from app.models.user import UserDB, UserModel

DATABASE_URL = os.environ.get("DATABASE_URL")


async def get_user_db():
    yield TortoiseUserDatabase(UserDB, UserModel)
