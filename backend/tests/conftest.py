import pytest
from starlette.testclient import TestClient
from tortoise.contrib.test import finalizer, initializer

from app.app import app


@pytest.fixture(scope="module")
def client() -> TestClient:
    initializer(
        ["app.models"],
        db_url="sqlite://./test.db",
    )
    with TestClient(app) as c:
        yield c
    finalizer()
