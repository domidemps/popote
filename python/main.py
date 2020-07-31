import os

from fastapi import FastAPI

from tools.static import read_json_from_static

app = FastAPI()

os.chdir("python")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/recipes/{recipe_id}")
async def get_recipe(recipe_id):
    return read_json_from_static("recipes")[recipe_id]
