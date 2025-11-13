from fastapi import FastAPI

from .lifespan import lifespan
from .routes import auth

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"hello": "world!"}
