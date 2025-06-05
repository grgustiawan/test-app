FROM node:18-alpine

RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3100

# Start the app with PM2 in fork mode
CMD ["pm2-runtime", "dist/server.js"]
