from app.emailing.models import EmailDefinition
from app.settings import EmailSettings
from aioyagmail import AIOSMTP


class GmailClient:
    @staticmethod
    async def send_email(email_config: EmailDefinition):
        async with AIOSMTP(oauth2_file=EmailSettings().oauth2_filepath) as yag:
            await yag.send(**email_config.dict())
