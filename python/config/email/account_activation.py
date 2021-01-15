from fastapi import Request

from config.email.base import EmailConfig
from models.user import User


class PasswordResetEmailConfig(EmailConfig):
    def __init__(self, user: User, token: str, request: Request):
        self.user = user
        self.to = user.email
        self.subject = "Popote - Réinitialisation du mot de passe"
        self.content = str(request.client.host + ":" + request.client.port) + f"/reset-password/{token}"

    def generate_content(self):
        return f"""Hello {self.user.name}"""
