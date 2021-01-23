from collections.abc import Mapping

from jinja2 import Environment, FileSystemLoader, select_autoescape


class EmailConfig(Mapping):
    required_keys = ("to", "subject", "contents")

    def __iter__(self):
        yield from self.required_keys

    def __len__(self):
        return len(self.required_keys)

    def __getitem__(self, key):
        return getattr(self, key)

    @staticmethod
    def get_template(template_filename):
        env = Environment(
            loader=FileSystemLoader(searchpath="config/email/templates"),
            autoescape=select_autoescape(["html", "xml"]),
        )
        return env.get_template(template_filename)
