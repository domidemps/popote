from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from security.oauth import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token

router = APIRouter()


@router.post("/login", tags=["auth"])
async def auth_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password, or inactive user",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.uuid), "scopes": form_data.scopes},
        expires_delta=access_token_expires,
    ).decode("utf-8")

    response.set_cookie(key="Authorization", value=f"Bearer {access_token}", httponly=True)


@router.get("/logout")
async def logout_and_remove_cookie():
    response = Response(status_code=204)
    response.delete_cookie("Authorization")
    return Response
