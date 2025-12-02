from fastapi import FastAPI

from .dependencies import Account
from .lifespan import lifespan
from .middleware import add_middleware
from .routes import include_routers

app = FastAPI(
    lifespan=lifespan,
    swagger_ui_parameters={"persistAuthorization": True},
)
include_routers(app)
add_middleware(app)


@app.get("/users/me")
def get_me(account: Account):
    return account
