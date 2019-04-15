FROM node:latest

WORKDIR /usr/src/app
COPY package.json ./

Run npm install

COPY . .

EXPOSE 8081
CMD ["npm","start"]
