FROM cypress/included:7.4.0@sha256:5071ff8f81d755f46b9f4b45e2fc589cf6d5b960174a2a459685d95160f8914d AS test

EXPOSE 8000 9229 6006

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  tini \
  && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["tini", "--"]


FROM test AS cypress

WORKDIR /opt/node_app
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY . .

RUN cypress verify


FROM test as storybook

WORKDIR /opt/node_app/app

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
ENV PATH /opt/node_app/app/node_modules/.bin:$PATH

COPY . .
