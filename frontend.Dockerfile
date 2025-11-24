FROM oven/bun:alpine

RUN addgroup --gid 32841 -S runner && adduser --uid 32841 -S runner -G runner
WORKDIR /home/runner

COPY --link packages/frontend/ packages/frontend/
COPY --link bun.lock package.json tsconfig.json ./
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

USER runner
STOPSIGNAL SIGINT
ENV NODE_ENV=production
ENTRYPOINT ["bun", "run", "--cwd", "packages/frontend"]
CMD ["start"]
