import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api import recipes, users

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(recipes.router)
app.include_router(users.router)

os.chdir("python")


@app.get("/")
async def root():
    return {"message": "Hello World"}
