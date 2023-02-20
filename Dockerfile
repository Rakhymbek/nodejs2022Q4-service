FROM node:18-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm config set strict-ssl false
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]