FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm install prisma @prisma/client
RUN npx prisma db push
RUN npx prisma migrate deploy

CMD npm run start 

EXPOSE 3000
