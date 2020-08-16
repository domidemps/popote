import sys
import uvicorn

sys.path.append("python")

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=5000, log_level="info", reload=True)
