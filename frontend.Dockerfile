FROM oven/bun:alpine

RUN addgroup --gid 32841 -S runner && adduser --uid 32841 -S runner -G runner
WORKDIR /home/runner

COPY --link packages/frontend/package.json packages/frontend/
COPY --link bun.lock package.json tsconfig.json ./
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile
COPY --link packages/frontend/ packages/frontend/

USER runner
STOPSIGNAL SIGINT
ENV NODE_ENV=production
ENTRYPOINT ["bun", "run", "--cwd", "packages/frontend"]
CMD ["start"]
