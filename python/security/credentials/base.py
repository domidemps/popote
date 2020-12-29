from abc import ABC, abstractmethod


class CredentialsReader(ABC):
    @abstractmethod
    def read(self, path, fields) -> str:
        ...
