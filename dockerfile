FROM node:12-slim as base
WORKDIR /usr/src/app
RUN npm i @angular/cli@latest -g; npm i -g live-server;
COPY package*.json ./
RUN npm i
COPY . ./
FROM base as build
WORKDIR /usr/src/app
RUN npm run build
WORKDIR /usr/src/app/www
EXPOSE 8080
CMD live-server
