FROM postgres:18

COPY custom-entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/custom-entrypoint.sh
ENTRYPOINT ["custom-entrypoint.sh"]
