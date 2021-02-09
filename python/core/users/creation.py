from datetime import datetime

from fastapi import HTTPException
from pony.orm import db_session

from models.user import User


async def update_inactive_user(email: str, hashed_password: str, username: str, previous_exception: Exception):
    # Async here is useless ATM but won't be once we move from Pony to Tortoise ORM
    with db_session:
        user = User.get(email=email)
        if user.active:
            raise HTTPException(
                status_code=409,
                detail=f"An active user with the same email address ({email}) already exists in the database.",
            ) from previous_exception

        now = datetime.utcnow()
        if (user.creation_date - now).days < 1:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"An inactive user with the same email address ({email}) already exists in the database."
                ),
            ) from previous_exception

        user.set(name=username, password=hashed_password, creation_date=now)
    return user
