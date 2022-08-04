## Stage 1 (base)
FROM node:14-alpine as base
LABEL org.opencontainers.image.authors=mustanish.altamash@gmail.com
LABEL org.opencontainers.image.title="hieqfrontend"
LABEL org.opencontainers.image.source=https://github.com/mustanish/hieq-frontend
LABEL org.opencontainers.image.licenses=UNLICENSED
LABEL com.taskmanager.nodeversion=$NODE_VERSION
WORKDIR /usr/src/hieq-frontend
COPY package.json yarn.lock* ./
EXPOSE 3000

## Stage 2 (development)
FROM base as dev
ENV NODE_ENV=development
RUN yarn install
CMD [ "yarn", "start"]

## Stage 3 (default, production)
FROM base as prod
ENV NODE_ENV=production
COPY . .  
CMD ["node", "dist/main"]  