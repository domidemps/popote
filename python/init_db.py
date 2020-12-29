from pony.orm import Database

from security.credentials import get_credentials


def init_db(db: Database):
    db_credentials = get_credentials(path="db/db_account")
    db.bind(
        provider="postgres",
        user=db_credentials["username"],
        password=db_credentials["password"],
        database="popote",
        host="localhost",
    )
    db.generate_mapping(create_tables=True)
