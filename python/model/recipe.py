from typing import List
from pydantic import BaseModel
from pony.orm import Database, Required, Json

db = Database()


class IngredientQuantity(BaseModel):
    quantity: float
    unit: str


class IngredientWithQuantity(BaseModel):
    name: str
    quantity: IngredientQuantity


class IngredientsList(BaseModel):
    ingredients: List[IngredientWithQuantity]


class Recipe(db.Entity):
    ingredients_list = Required(Json)
