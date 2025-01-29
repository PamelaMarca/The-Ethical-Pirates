FROM node:23.2.0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
CMD [ "npm","run", "dev" ]