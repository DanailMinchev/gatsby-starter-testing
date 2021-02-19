FROM node:15.9.0-buster@sha256:bd7bd82ef35c2442f3bf2f3392d1c4c1ebe9db37deb86e7e6416974b88202f0c

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
