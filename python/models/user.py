import uuid

from pony.orm import PrimaryKey, Required

from .base import db


class User(db.Entity):
    uuid = PrimaryKey(uuid.UUID, default=uuid.uuid4)
    name = Required(str)
    email = Required(str, unique=True)
    password = Required(str)

    def __class_getitem__(cls, item) -> "User":
        return super().__class_getitem__(item)
