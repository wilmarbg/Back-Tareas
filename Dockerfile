FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN nest build

EXPOSE 3000

CMD ["nest", "start"]
