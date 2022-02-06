import json


user_payload = {
    "email": "dwight.shrute@dundermifflin.com",
    "password": "beets",
}


def test_register_user(client):
    response = client.post(
        "/auth/register",
        data=json.dumps(user_payload),
    )
    assert response.status_code == 201
