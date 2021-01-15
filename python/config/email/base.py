from collections.abc import Mapping


class EmailConfig(Mapping):
    required_keys = ["to", "subject", "content"]

    def __iter__(self):
        yield from self.required_keys

    def __len__(self):
        return len(self.required_keys)

    def __getitem__(self, key):
        return getattr(self, key)
