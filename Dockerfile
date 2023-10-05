FROM node:18.17-alpine

# Sets the workdir and create the project folder
RUN mkdir -p /home/backend
WORKDIR /home/backend

COPY ./package.json ./package-lock.json .

# Install dependencies
RUN npm ci

EXPOSE 8000

CMD ["npm", "run", "dev"]
