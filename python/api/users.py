from fastapi import APIRouter


router = APIRouter()


@router.get("/users/{user_id}")
async def get_user(user_id: str, color: int) -> str:
    return f"GET TBA {user_id}, color={color}"


@router.post("/users")
async def post_user(user_id) -> str:
    return f"POST TBA {user_id}"


@router.delete("/users")
async def delete_user(user_id) -> str:
    return f"DELETE TBA {user_id}"
