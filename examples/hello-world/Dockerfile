FROM alpine:latest

RUN mkdir /etc/hello-world
COPY hello-world /usr/local/bin
COPY version.txt /etc/hello-world

CMD /usr/local/bin/hello-world
