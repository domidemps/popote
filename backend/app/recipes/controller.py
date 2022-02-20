from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from app.models import Recipe, RecipeCreate, RecipeRead, UserDB
from app.users import current_active_user

router = APIRouter(tags=["recipes"])
router.responses = {
    status.HTTP_401_UNAUTHORIZED: {
        "description": "Missing token or inactive user.",
    },
    status.HTTP_404_NOT_FOUND: {
        "description": "The user does not exist.",
    },
}


@router.get("/users/me/recipes", response_model=list[RecipeRead])
async def get_recipes(user: UserDB = Depends(current_active_user)):
    recipes = await Recipe.filter(user_id=user.id)
    return [await RecipeRead.from_tortoise_orm(recipe) for recipe in recipes]


@router.get("/users/me/recipes/{recipe_id}", response_model=RecipeRead)
async def get_recipe(recipe_id: int, user: UserDB = Depends(current_active_user)):
    recipe = await Recipe.filter(user_id=user.id, id=recipe_id)
    if not recipe:
        raise HTTPException(status_code=404)
    return await RecipeRead.from_tortoise_orm(recipe[0])


@router.post("/users/me/recipes", status_code=201)
async def post_recipe(recipe: RecipeCreate, user: UserDB = Depends(current_active_user)):
    await Recipe.create(**recipe.dict(), user_id=user.id)
    return
