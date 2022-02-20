import uuid
from unittest.mock import AsyncMock

import pytest
from app.models import UserModel

user_payload = {
    "email": "dwight.shrute@dundermifflin.com",
    "password": "bears, beets, Battlestar Galactica",
}


@pytest.fixture(scope="class")
async def send_account_verification_email(class_mocker) -> AsyncMock:
    yield class_mocker.patch("app.emailing.verify_account.send_account_verification_email")


@pytest.mark.anyio
async def test_register_user(async_client, send_account_verification_email):
    response = await async_client.post("/auth/register", json=user_payload)

    assert response.status_code == 201
    assert await UserModel.filter(email=user_payload["email"]).all()
    send_account_verification_email.assert_called_once()


@pytest.mark.anyio
async def test_register_user_existing(async_client, send_account_verification_email):
    await UserModel.create(
        id=uuid.uuid4(),
        email=user_payload["email"],
        hashed_password="whatever",
    )
    response = await async_client.post("/auth/register", json=user_payload)
    assert response.status_code == 400
    send_account_verification_email.assert_not_called()
