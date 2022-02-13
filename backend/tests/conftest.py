import os

import pytest
from starlette.testclient import TestClient
from tortoise.contrib.test import finalizer, initializer


@pytest.fixture(autouse=True)
def environ(monkeypatch):
    """Set the SECRET env var to assert the behavior."""
    monkeypatch.setenv("DATABASE_URL", "sqlite://:memory:")


@pytest.fixture()
def client(environ) -> TestClient:
    from app.app import app
    initializer(
        ["app.models"],
        db_url=os.environ["DATABASE_URL"],
    )
    with TestClient(app) as c:
        yield c
    finalizer()
