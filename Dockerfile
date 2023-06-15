FROM node:16

# Sets the workdir and create the project folder
RUN mkdir -p /home/backend
WORKDIR /home/backend

# Copy all the files to the project folder
COPY . /home/backend

# Install dependencies
RUN npm install

EXPOSE 8000

CMD ["npm", "run", "dev"]