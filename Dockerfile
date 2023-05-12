FROM node:16-alpine

WORKDIR /var/www
COPY . .

EXPOSE 3000

CMD npm install && npm run start
