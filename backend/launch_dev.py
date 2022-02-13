import uvicorn
import argparse


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process some integers.")
    parser.add_argument(
        "--db",
        type=str,
        default="memory",
        help=(
            '"memory" for in-memory db'
            'docker localhost:15432 (the one created by "docker compose up -d db")'
        ),
    )
    args = parser.parse_args()

    if args.db == "docker":
        env_file = "./backend/deployment/.env_dockerdb_localtesting"
    else:
        env_file = "./backend/.env"

    uvicorn.run(
        "app.app:app",
        host="0.0.0.0",
        port=5000,
        log_level="info",
        reload=True,
        env_file=env_file,
    )
