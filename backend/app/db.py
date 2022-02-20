from fastapi_users.db import TortoiseUserDatabase

from app.models.user import UserDB, UserModel
from app.settings import AppSettings

DATABASE_URL = AppSettings().database_url

TORTOISE_ORM = {
    "connections": {"default": DATABASE_URL},
    "apps": {
        "models": {
            "models": ["app.models", "aerich.models"],
            "default_connection": "default",
        },
    },
}


async def get_user_db():
    yield TortoiseUserDatabase(UserDB, UserModel)
