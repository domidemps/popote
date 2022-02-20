from app.emailing.clients import EmailClient, GmailClient, MailtrapClient
from app.exceptions import ConfigurationError
from app.settings import EmailSettings

EMAIL_CLIENTS_MAPPING: dict[str, EmailClient] = {
    "mailtrap": MailtrapClient,
    "gmail": GmailClient,
}


def get_email_client(client_type: str) -> EmailClient:
    try:
        return EMAIL_CLIENTS_MAPPING[client_type]
    except KeyError:
        raise ConfigurationError(
            f"{EmailSettings().Config.env_prefix.upper()}CLIENT should be one of "
            f"{' | '.join(EMAIL_CLIENTS_MAPPING)}"
        )
