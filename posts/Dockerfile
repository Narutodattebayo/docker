FROM node:alpine

WORKDIR /posts

COPY package.json .

RUN npm install

COPY . .

CMD ["npm","start"]