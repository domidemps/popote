from typing import Dict, List

from fastapi import APIRouter

from tools.static import read_json_from_config

router = APIRouter()


@router.get("/recipes/{recipe_id}")
async def get_recipe(recipe_id: str) -> Dict[str, List[Dict[str, str]]]:
    return read_json_from_config("recipes")[recipe_id]
