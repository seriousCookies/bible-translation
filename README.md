# webscrapping

docker build --file=frontend/Dockerfile -t playground-web-frontend .
docker build --file=backend/Dockerfile -t playground-web-backend .  
docker-compose -f docker-compose.yml up --build
