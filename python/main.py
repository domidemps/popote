import os

from fastapi import FastAPI

from api import recipes, users

app = FastAPI()
app.include_router(recipes.router)
app.include_router(users.router)

os.chdir("python")


@app.get("/")
async def root():
    return {"message": "Hello World"}
