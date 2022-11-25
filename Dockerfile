FROM python:3.8-alpine

LABEL name="Stakater Cloud Documentation" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Documentation for Stakater Cloud"

RUN pip3 install mkdocs-material mkdocs-mermaid2-plugin

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY --chown=1001:root . .

# build the docs
RUN mkdocs build

# set non-root user
USER 1001

EXPOSE 8080
CMD ["python", "-m", "http.server", "8080", "-d", "./site"]
