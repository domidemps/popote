from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from app.db import DATABASE_URL
from app.recipes.controller import router as recipes_router
from app.settings import AppSettings
from app.users import users_router

app = FastAPI(title=AppSettings().app_name)

app.include_router(users_router)
app.include_router(recipes_router)

register_tortoise(
    app,
    db_url=DATABASE_URL,
    modules={"models": ["app.models"]},
    generate_schemas=True,
)
