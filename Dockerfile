FROM node:latest

# Create working directory
WORKDIR /usr/app

COPY package*.json ./
COPY ./index.js ./

ENV PORT 3000
# Install dependencies.
RUN npm install

# Run the server on container startup.
CMD [ "node", "index" ]
