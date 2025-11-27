FROM docker.io/oven/bun:alpine AS build

COPY --link packages/frontend/package.json packages/frontend/
COPY --link bun.lock package.json tsconfig.json ./
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile
COPY --link packages/frontend/ packages/frontend/

RUN  --mount=type=cache,target=/root/.bun \
    bun run --cwd packages/frontend build

FROM docker.io/library/nginx:alpine
COPY --from=build /home/bun/app/packages/frontend/dist/ /usr/share/nginx/html/
