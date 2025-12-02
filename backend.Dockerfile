FROM ghcr.io/astral-sh/uv:python3.11-alpine

RUN addgroup --gid 32840 -S runner && adduser --uid 32840 -S runner -G runner
WORKDIR /home/runner

COPY --link packages/backend/pyproject.toml packages/backend/
COPY --link pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache \
    uv sync --frozen
COPY --link packages/backend/src/ packages/backend/src/

USER runner
ENV PYTHONUNBUFFERED=1
STOPSIGNAL SIGINT
ENTRYPOINT ["uv", "--no-cache", "run", "--directory", "packages/backend/src/", "--frozen", "--no-sync", "-m"]
CMD ["uvicorn", "backend:app"]
