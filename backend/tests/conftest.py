import os

import pytest
from dotenv import load_dotenv
from fastapi import FastAPI
from httpx import AsyncClient
from starlette.testclient import TestClient
from tortoise.contrib.test import finalizer, initializer


@pytest.fixture(autouse=True, scope="session")
def environ():
    """Set the SECRET env var to assert the behavior."""
    load_dotenv("./tests/.testenv", override=True)


@pytest.fixture(autouse=True)
def wipe_dependencies_override():
    from app.app import app

    app.dependency_overrides = {}


@pytest.fixture(scope="session", autouse=True)
def anyio_backend():
    return "asyncio"


@pytest.fixture()
def app() -> FastAPI:
    from app.app import app

    initializer(
        ["app.models"],
        db_url=os.environ["DATABASE_URL"],
    )
    yield app
    finalizer()


@pytest.fixture()
def client(app) -> TestClient:
    with TestClient(app) as c:
        yield c


@pytest.fixture()
async def async_client(app) -> AsyncClient:
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
