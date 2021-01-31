import json
from json import JSONDecodeError

from pykeepass import PyKeePass
from pykeepass.exceptions import CredentialsError

from config.security.keepass import KEEPASS_PASSWORD, KEEPASS_PATH
from exceptions import ConfigurationError
from security.credentials.base import CredentialsReader


class KeepassCredentialsReader(CredentialsReader):
    def __init__(self):
        try:
            self.keepass = PyKeePass(KEEPASS_PATH, password=KEEPASS_PASSWORD)
        except AttributeError as e:
            if not KEEPASS_PATH:
                raise ConfigurationError("'POPOTE_KEEPASS_PATH' environment variable is not set.") from e
            raise
        except FileNotFoundError as e:
            raise ConfigurationError(f"No keepass database file found at {KEEPASS_PATH}.") from e
        except CredentialsError as e:
            raise ConfigurationError(f"Invalid password for keepass database file at {KEEPASS_PATH}.") from e

    def read(self, path: str, fields: tuple) -> dict:
        entry = self.keepass.find_entries(path=path)
        if entry is None:
            raise ConfigurationError(f"No entry found at path {path} in Keepass.")
        if entry.attachments:
            try:
                return json.loads(entry.attachments[0].data)
            except JSONDecodeError:
                raise ConfigurationError(f"Unable to parse file at path {path} in Keepass.")
        return {field: getattr(entry, field, None) for field in fields}
