from typing import List

from pony.orm import Json, PrimaryKey, Required
from pydantic import BaseModel

from models import db


class IngredientQuantity(BaseModel):
    quantity: float
    unit: str


class IngredientWithQuantity(BaseModel):
    name: str
    quantity: IngredientQuantity


class IngredientsList(BaseModel):
    ingredients: List[IngredientWithQuantity]


class Recipe(db.Entity):
    id = PrimaryKey(int)
    ingredients_list = Required(Json)
    instructions = Required(Json)
