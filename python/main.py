import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api import recipes, users, token
from init_db import init_db
from models import db

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(recipes.router)
app.include_router(users.router)
app.include_router(token.router)

os.chdir("python")

init_db(db)


@app.get("/")
async def root():
    return {"message": "Hello World"}
