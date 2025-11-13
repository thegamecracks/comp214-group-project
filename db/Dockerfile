FROM postgres:18-alpine

COPY custom-entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/custom-entrypoint.sh
ENTRYPOINT ["custom-entrypoint.sh"]
