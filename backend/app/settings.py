from pydantic import BaseSettings


class AppSettings(BaseSettings):
    app_name: str
    database_url: str

    class Config:
        env_file = ".env"


class EmailSettings(BaseSettings):
    oauth2_filepath: str = ""
    account_verify_subject: str
    frontend_url: str
    client: str

    class Config:
        env_prefix = "email_"
        env_file = ".env"


class MailtrapSettings(BaseSettings):
    username: str
    password: str
    sender: str = "noreply@popote.kitchen"

    class Config:
        env_prefix = "mailtrap_"
        env_file = ".env"
