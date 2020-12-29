import functools

from exceptions import ConfigurationError
from security.credentials.json import JSONCredentialsReader
from security.credentials.keepass import KeepassCredentialsReader


@functools.lru_cache()
def get_credentials(path: str, fields: tuple = ("username", "password")) -> dict:
    credentials_reader = get_credentials_reader()
    return credentials_reader.read(path, fields)


def get_credentials_reader():
    credentials_reader_mapping = {
        "Keepass": KeepassCredentialsReader,
        "JSON": JSONCredentialsReader,
    }
    first_failed = None
    for method in credentials_reader_mapping:
        try:
            return credentials_reader_mapping[method]()
        except ConfigurationError as e:
            first_failed = first_failed or e
    raise ConfigurationError(
        f"No valid credentials storage detected. The displayed cause of this exception is the error raised from "
        f"the first credentials retrieval attempt, using the default (preferred) method of credentials storage, "
        f"namely: {next(iter(credentials_reader_mapping))}."
    ) from first_failed
