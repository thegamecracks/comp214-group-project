from fastapi import FastAPI

from .dependencies import Account
from .lifespan import lifespan
from .middleware import add_middleware
from .routes import auth, employees

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)
app.include_router(employees.router)
add_middleware(app)


@app.get("/users/me")
def get_me(account: Account):
    return account
