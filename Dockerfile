FROM node:18-alpine

WORKDIR /product-service

COPY . .

RUN npm ci --omit=dev

CMD [ "npm", "run", "start" ]