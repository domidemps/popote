from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from app.db import DATABASE_URL
from app.recipes.controller import router as recipes_router
from app.users import auth_backend, fastapi_users

app = FastAPI()

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(fastapi_users.get_register_router(), prefix="/auth", tags=["auth"])
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(fastapi_users.get_users_router(), prefix="/users", tags=["users"])

app.include_router(recipes_router)

TORTOISE_ORM = {
    "connections": {"default": DATABASE_URL},
    "apps": {
        "models": {
            "models": ["app.models", "aerich.models"],
            "default_connection": "default",
        },
    },
}

register_tortoise(
    app,
    db_url=DATABASE_URL,
    modules={"models": ["app.models"]},
    generate_schemas=True,
)
