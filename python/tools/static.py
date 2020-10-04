import json
from typing import Any, Dict


def read_json_from_config(name: str) -> Dict[str, Any]:
    with open(f"config/{name}.json", "r") as f:
        return json.load(f)
