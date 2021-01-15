from config.email.base import EmailConfig
from models.user import User


class PasswordResetEmailConfig(EmailConfig):
    def __init__(self, user: User, token: str, client_url: str):
        self.user = user
        self.to = user.email
        self.subject = "Popote - Réinitialisation du mot de passe"
        self.content = self.generate_content(client_url, token)

    @staticmethod
    def generate_content(client_url, token):
        return client_url + f"/reset-password/{token}"
