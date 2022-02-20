import datetime
import smtplib
from email.message import EmailMessage

from app.emailing.models import EmailDefinition
from app.settings import MailtrapSettings


class MailtrapClient:
    @staticmethod
    async def send_email(email_config: EmailDefinition):
        mailtrap_settings = MailtrapSettings()

        message = EmailMessage()
        message["Subject"] = email_config.subject
        message["From"] = mailtrap_settings.sender
        message["To"] = email_config.to
        now = datetime.datetime.utcnow().astimezone().strftime("%a, %d %b %Y %H:%M:%S %z")
        message["Date"] = now
        message.set_content(email_config.contents, subtype='html')
        with smtplib.SMTP("smtp.mailtrap.io", 2525) as server:
            server.login(mailtrap_settings.username, mailtrap_settings.password)
            server.send_message(message, mailtrap_settings.sender, email_config.to)
