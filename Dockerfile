FROM node:14

WORKDIR /app


ADD ./ /app
RUN npm install -g nodemon
RUN npm install

EXPOSE 3000


CMD ["nodemon", "app/index.js"]