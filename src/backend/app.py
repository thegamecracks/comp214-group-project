from fastapi import FastAPI

from .lifespan import lifespan

app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"hello": "world!"}
