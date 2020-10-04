import os

from pony.orm import Database


def init_db(db: Database):
    db_password = os.environ["POPOTE_DB_PASSWORD"]
    db.bind(provider="postgres", user="popote_team", password=db_password, database="popote")
    db.generate_mapping(create_tables=True)
