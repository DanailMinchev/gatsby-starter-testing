FROM node:16.7.0-buster@sha256:48724c60fe610e1295cc5f0aa8d9f2a87a4daf4a66d0089f910fcaf5c7e8d912

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
