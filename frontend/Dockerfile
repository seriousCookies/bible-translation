FROM node:12-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY frontend/package*.json /app
RUN npm install
RUN npm install -g @angular/cli
COPY frontend/ /app
EXPOSE 4200/tcp
CMD ng serve --host 0.0.0.0