from pony.orm import Database

from security.credentials import get_credentials


def init_db(db: Database):
    db_credentials = get_credentials(path="db/account", fields=("username", "password", "url", "database_name"))
    db.bind(
        provider="postgres",
        user=db_credentials["username"],
        password=db_credentials["password"],
        database=db_credentials["database_name"],
        host=db_credentials["url"],
    )
    db.generate_mapping(create_tables=True)
