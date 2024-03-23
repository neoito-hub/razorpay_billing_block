FROM node:16.20.1-alpine

COPY . ./app

# Install appblocks/bb-cli
RUN npm install @appblocks/bb-cli -g

# Install dotenv-ci
RUN npm install dotenv-cli -g