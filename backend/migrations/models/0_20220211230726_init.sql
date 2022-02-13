-- upgrade --
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL  PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "hashed_password" VARCHAR(255) NOT NULL,
    "is_active" BOOL NOT NULL  DEFAULT True,
    "is_superuser" BOOL NOT NULL  DEFAULT False,
    "is_verified" BOOL NOT NULL  DEFAULT False
);
CREATE INDEX IF NOT EXISTS "idx_users_email_133a6f" ON "users" ("email");
CREATE TABLE IF NOT EXISTS "recipes" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "ingredients" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(20) NOT NULL,
    "content" JSONB NOT NULL
);
