FROM node:18-alpine

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /app

COPY ./src/${SERVICE_NAME}/package.json /app/

RUN yarn install

COPY ./src/${SERVICE_NAME}/app /app/src

COPY ./src/utils /app/src/utils

COPY tsconfig.json .env  /app/

COPY ./prisma /app/prisma

CMD yarn run start