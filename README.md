# webscrapping

docker build --file=frontend/frontend.dockerfile -t playground-web-frontend .
docker build --file=backend/backend.dockerfile -t playground-web-backend .  
docker-compose -f docker-compose.yml up --build
