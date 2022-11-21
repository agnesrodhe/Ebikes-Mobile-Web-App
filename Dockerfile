FROM node:14.13.1-buster-slim

COPY . /home
WORKDIR /home

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]