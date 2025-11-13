import os

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware


def add_middleware(app: FastAPI) -> None:
    domain = os.environ.get("BACKEND_DOMAIN")
    if domain:
        allowed_hosts = [domain]
    else:
        allowed_hosts = ["*"]

    app.add_middleware(CORSMiddleware)
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)
