from fastapi import Request

from config.email.password_reset import PasswordResetEmailConfig
from core.email.utils import CustomAIOSMTP
from models.user import User
from security.credentials import get_credentials


async def send_password_reset_email(user: User, token: str, request: Request):
    email_config = PasswordResetEmailConfig(user, token, request)
    async with CustomAIOSMTP(oauth2_info=get_credentials(path="/email/oauth2")) as yag:
        await yag.send(**email_config)
