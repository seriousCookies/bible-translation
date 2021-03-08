
FROM node:12-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY backend/package*.json /app
RUN npm install
COPY backend/ /app
EXPOSE 3001
CMD ["npm", "start"]