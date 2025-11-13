#!/usr/bin/env bash
set -euo pipefail

for file in pg-dhparams pg-fullchain pg-privkey; do
    if [[ ! -f /run/secrets/$file ]]; then
        continue
    fi
    cp /run/secrets/$file /etc/postgresql/$file
    chmod 600 /etc/postgresql/$file
    chown postgres:postgres /etc/postgresql/$file
done

docker-entrypoint.sh $@
