from typing import Protocol

from app.emailing.models import EmailDefinition


class EmailClient(Protocol):
    async def send_email(self, email_config: EmailDefinition):
        ...
