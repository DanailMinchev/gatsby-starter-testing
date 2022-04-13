FROM node:17.9.0-buster@sha256:17a5112a2d6ec26ad6656d22ac9596e703db9d59285fb61eca0a078903800e7e

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=8000
ENV PORT $PORT
EXPOSE $PORT 9229

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  tini \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/node_app
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY . .

ENTRYPOINT ["tini", "--"]
