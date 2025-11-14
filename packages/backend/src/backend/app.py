from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

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


# Keep this at the end for lowest priority
app.mount("/", StaticFiles(directory="packages/frontend/dist", html=True))
