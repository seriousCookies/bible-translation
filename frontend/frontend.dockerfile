
FROM node:12-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY frontend/package*.json /app
RUN npm install
COPY frontend/ /app
EXPOSE 4200
CMD ["npm", "start"]