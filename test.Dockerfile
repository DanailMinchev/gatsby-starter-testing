FROM cypress/included:8.4.1@sha256:4fde46a55449698ac1dfc67bcd6ba30ff177af21d282503bef814a6754304fc9 AS test

EXPOSE 8000 9229 6006

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  tini \
  && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["tini", "--"]


FROM test AS cypress

WORKDIR /opt/node_app
COPY package.json package-lock.json ./
RUN npm install --force && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY . .

RUN cypress verify


FROM test as storybook

WORKDIR /opt/node_app/app

COPY package.json package-lock.json ./
RUN npm install --force && npm cache clean --force
ENV PATH /opt/node_app/app/node_modules/.bin:$PATH

COPY . .
