FROM node:20-alpine as base

ARG DOCKER_UID=1000
ARG DOCKER_GID=${DOCKER_UID}

RUN deluser --remove-home node \
  && addgroup -S node -g $DOCKER_GID \
  && adduser -S -G node -u $DOCKER_UID node