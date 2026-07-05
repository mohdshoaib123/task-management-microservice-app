 FROM node:18-alpine AS builder
#  build stage 

WORKDIR /app

COPY package*.json /app

RUN npm install  

COPY tsconfig.json ./

COPY . .
RUN npm run build


FROM node:18-alpine
# production stage
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist  ./dist

CMD ["node","dist/index.js"]
