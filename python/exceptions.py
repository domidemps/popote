from fastapi import HTTPException


class ConfigurationError(HTTPException):
    def __init__(self, detail=""):
        detail = "Bad API configuration." + (f" {detail}" if detail else "")
        super().__init__(status_code=500, detail=detail)
