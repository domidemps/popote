from jinja2 import Environment, FileSystemLoader, select_autoescape

from app.emailing.models import EmailType


def get_template(template_filename):
    env = Environment(
        loader=FileSystemLoader(searchpath="app/emailing/templates"),
        autoescape=select_autoescape(["html", "xml"]),
    )
    return env.get_template(template_filename)


def get_email_contents(email_type: EmailType, client_url: str, token: str):
    template = get_template(f"{email_type}.html")
    return template.render(link_url=f"{client_url}/account-validation/{token}")
