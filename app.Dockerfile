FROM node:14.14.0-buster@sha256:a054bd2e7ee8f0d40b6db577b4965e2f80e2707e40b2f221cc4418be253c3036

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
