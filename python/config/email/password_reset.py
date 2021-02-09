from config.email.base import EmailConfig
from models.user import User


class PasswordResetEmailConfig(EmailConfig):
    def __init__(self, user: User, token: str, client_url: str):
        self.user = user
        self.to = user.email
        self.subject = "Popote - Réinitialisation du mot de passe"
        self.contents = self.generate_content(client_url, token)

    def generate_content(self, client_url, token):
        template = self.get_template("password_reset_email.html")  # TODO: Invalid HTML
        return template.render(password_reset_url=f"{client_url}/reset-password/{token}")
