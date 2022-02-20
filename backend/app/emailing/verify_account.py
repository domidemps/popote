from app.emailing.craft_email import EmailType, get_email_contents
from app.emailing.email_client import get_email_client
from app.emailing.models import EmailDefinition
from app.models.user import User

from app.settings import EmailSettings


def prepare_account_verification_email(user: User, token: str, settings: EmailSettings):
    contents = get_email_contents(EmailType.AccountValidation, settings.frontend_url, token)
    return EmailDefinition(
        subject=settings.account_verify_subject,
        to=user.email,
        contents=contents,
    )


async def send_account_verification_email(user: User, token: str):
    email_config = prepare_account_verification_email(user, token, EmailSettings())
    client = get_email_client(EmailSettings().client)
    await client.send_email(email_config)
