FROM docker.io/library/postgres:18-alpine

COPY custom-entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/custom-entrypoint.sh
COPY scripts/ /docker-entrypoint-initdb.d/
ENTRYPOINT ["custom-entrypoint.sh"]
