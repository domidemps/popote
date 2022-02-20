from enum import Enum

from pydantic import BaseModel


class EmailType(str, Enum):
    AccountValidation = "account-validation"
    PasswordReset = "password-reset"


class EmailDefinition(BaseModel):
    subject: str
    to: str
    contents: str
