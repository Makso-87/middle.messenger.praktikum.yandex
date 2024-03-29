FROM node:16.12-alpine

WORKDIR /usr/src/app

ADD . /usr/src/app
ADD package.json /usr/src/app/package.json

RUN npm install

EXPOSE 3000

CMD npm run start
