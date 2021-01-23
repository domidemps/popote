from config.email.base import EmailConfig
from models.user import User


class AccountActivationEmailConfig(EmailConfig):
    def __init__(self, user: User, token: str, client_url: str):
        self.user = user
        self.to = user.email
        self.subject = "Popote - Activation du compte"
        self.contents = self.generate_content(client_url, token)

    def generate_content(self, client_url, token):
        template = self.get_template("account_activation.html")
        return template.render(activation_url=f"{client_url}/account-validation/{token}")
