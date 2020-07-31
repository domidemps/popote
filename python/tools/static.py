import json
from typing import Any, Dict


def read_json_from_static(name: str) -> Dict[str, Any]:
    import os
    print(os.getcwd())
    with open(f"static/{name}.json", "r") as f:
        return json.load(f)
