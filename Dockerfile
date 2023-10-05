FROM node:18.17.1

# Updates dependencies
RUN apt-get update

# Sets the workdir and create the project folder
RUN mkdir -p /home/backend
WORKDIR /home/backend
RUN mkdir node_modules

COPY ./package.json ./package-lock.json .

# Install dependencies
RUN npm ci

EXPOSE 8000 8001

CMD ["npm", "run", "dev"]
