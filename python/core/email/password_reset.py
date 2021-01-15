from config.email.password_reset import PasswordResetEmailConfig
from core.email.utils import CustomAIOSMTP
from models.user import User
from security.credentials import get_credentials


async def send_password_reset_email(user: User, token: str, client_url: str):
    email_config = PasswordResetEmailConfig(user, token, client_url)
    async with CustomAIOSMTP(oauth2_info=get_credentials(path="/email/oauth2")) as yag:
        await yag.send(**email_config)
