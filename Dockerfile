FROM node:18
WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install
COPY server.js /app
CMD ["node", "server.js"]