FROM node:16-alpine as BildKit

WORKDIR /var/www
COPY . .

EXPOSE 3000

CMD npm install && npm run start
