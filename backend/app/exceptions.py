class ConfigurationError(Exception):
    def __init__(self, message: str = ""):
        super().__init__("\n".join(("Invalid configuration", message)))
