from fastapi import FastAPI

from .lifespan import lifespan
from .middleware import add_middleware
from .routes import auth

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)
add_middleware(app)


@app.get("/")
def read_root():
    return {"hello": "world!"}
