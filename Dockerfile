FROM oven/bun:alpine AS frontend

COPY --link packages/frontend/ packages/frontend/
COPY --link bun.lock package.json tsconfig.json ./
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile
RUN bun -F frontend build

FROM ghcr.io/astral-sh/uv:python3.11-alpine

RUN addgroup --gid 32841 -S runner && adduser --uid 32841 -S runner -G runner
WORKDIR /home/runner

COPY --link packages/backend/ packages/backend/
COPY --link pyproject.toml uv.lock ./
COPY --from=frontend /home/bun/app/packages/frontend/dist/ packages/frontend/dist/
RUN --mount=type=cache,target=/root/.cache \
    uv sync --frozen

USER runner
ENV PYTHONUNBUFFERED=1
STOPSIGNAL SIGINT
ENTRYPOINT ["uv", "run", "--frozen", "--no-sync", "-m"]
CMD ["uvicorn", "backend:app"]
