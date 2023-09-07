FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN yarn install

CMD ["yarn", "run", "start"]