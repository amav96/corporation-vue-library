FROM node:16.13.1-alpine

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3004


CMD ["npm", "start"]