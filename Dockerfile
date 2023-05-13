FROM node:16.12-alpine

WORKDIR /usr/src

COPY . .

EXPOSE 3000

CMD npm install && npm run start
