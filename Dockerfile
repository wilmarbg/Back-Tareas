FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm i
RUN npm i -g @nestjs/cli

RUN nest build

EXPOSE 3000

CMD ["nest", "start"]
