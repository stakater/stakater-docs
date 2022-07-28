FROM registry.access.redhat.com/ubi8/nodejs-16

LABEL name="Stakater Cloud Documentation" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Documentation for Stakater Cloud"

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# set non-root user
USER 1001

# copy the entire application
COPY . .

# download the application dependencies
RUN npm ci

# build the application
RUN npm run docs:build

ENTRYPOINT ["npm", "run", "docs:serve"]