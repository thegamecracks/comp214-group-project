import os

from fastapi import FastAPI
from ratelimit import RateLimitMiddleware, Rule
from ratelimit.auths.ip import EmptyInformation, client_ip
from ratelimit.backends.simple import MemoryBackend
from ratelimit.types import Scope
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
    app.add_middleware(
        RateLimitMiddleware,
        authenticate=_ratelimit_authenticate,
        backend=MemoryBackend(),
        config={
            r"^/": [Rule(minute=60)],
        },
    )


async def _ratelimit_authenticate(scope: Scope) -> tuple[str, str]:
    try:
        return await client_ip(scope)
    except EmptyInformation:
        return "global", "default"
