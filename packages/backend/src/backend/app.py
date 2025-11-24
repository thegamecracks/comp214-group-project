from fastapi import FastAPI

from .dependencies import AccountID
from .lifespan import lifespan
from .middleware import add_middleware
from .routes import auth

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)
add_middleware(app)


@app.get("/users/me")
def get_me(account_id: AccountID):
    return {"account_id": account_id}
