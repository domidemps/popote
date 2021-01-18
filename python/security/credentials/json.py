import json
from json import JSONDecodeError

from config.security.json import SECRET_JSON_PATH
from exceptions import ConfigurationError
from security.credentials.base import CredentialsReader


class JSONCredentialsReader(CredentialsReader):
    def __init__(self):
        try:
            with open(SECRET_JSON_PATH, "r") as secret_file:
                self.json = json.load(secret_file)
        except FileNotFoundError as e:
            raise ConfigurationError(f"No credentials JSON found at {SECRET_JSON_PATH}.") from e
        except JSONDecodeError as e:
            raise ConfigurationError(f"File {SECRET_JSON_PATH} is not a valid JSON file") from e

    def read(self, path: str, fields: tuple = None) -> dict:
        entry = self.json
        try:
            for key in path.split("/"):
                entry = entry[key]
        except KeyError:
            raise ConfigurationError(f"Path {path} not found in JSON credentials file.")
        return {key: value for key, value in entry.items() if (key in fields if fields else True)}
