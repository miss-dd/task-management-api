
FROM node:18
WORKDIR /app
COPY package*.json ./
# RUN npm ci --omit=dev is modern and faster than npm install --production
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
