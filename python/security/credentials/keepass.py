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
        attachment_properties = {}
        if entry.attachments:
            try:
                attachment_properties = {}
                for attachment in entry.attachments:
                    file_content = json.loads(attachment.data)
                    attachment_properties.update(
                        {field: file_content.get(field) for field in fields if file_content.get(field)}
                    )  # TODO: Should use walrus operator once we migrate to 3.8
            except JSONDecodeError:
                raise ConfigurationError(f"Unable to parse attached file of entry {path} in Keepass.")

        custom_properties = {
            field: entry.custom_properties.get(field) for field in fields if entry.custom_properties.get(field)
        }  # TODO: Should use walrus operator once we migrate to 3.8
        default_properties = {
            field: getattr(entry, field, None) for field in fields if getattr(entry, field, None)
        }  # TODO: Should use walrus operator once we migrate to 3.8

        all_properties = {}  # TODO: Should use dict union operator once we migrate to 3.9
        for properties in (default_properties, custom_properties, attachment_properties):
            all_properties.update(properties)

        return all_properties
