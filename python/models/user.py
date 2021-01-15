from uuid import UUID, uuid4

from pony.orm import PrimaryKey, Required

from .base import db


class User(db.Entity):
    uuid: UUID = PrimaryKey(UUID, default=uuid4)
    name: str = Required(str)
    email: str = Required(str, unique=True)
    password: str = Required(str)
    active: bool = Required(bool, default=False)

    def __class_getitem__(cls, uuid: str) -> "User":
        """Used to silence type checkers warnings with the type hint"""
        return super().__class_getitem__(uuid)
