FROM node:16.13.0

WORKDIR /var/www
COPY . .

EXPOSE 3000

CMD npm install && npm run start
