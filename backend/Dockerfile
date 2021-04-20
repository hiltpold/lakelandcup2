FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./backend/package.json /usr/src/app/
RUN npm install
COPY ./backend/dist/ /usr/src/app/src
COPY ./config/postgres.env /usr/src/app/config/postgres.env
COPY ./config/mailgun.env /usr/src/app/config/mailgun.env
EXPOSE 9002
CMD [ "node", "./src/app.js" ]