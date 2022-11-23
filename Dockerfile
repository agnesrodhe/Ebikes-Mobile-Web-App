FROM debian:stretch-slim

RUN apt update && \
    apt install -y apache2 curl

COPY build /var/www/html

CMD apachectl -D FOREGROUND
