#Inspired from https://github.com/kriasoft/nodejs-api-starter/blob/master/Dockerfile
FROM node:9-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG COMMIT_SHA=''
ENV COMMIT_SHA=$COMMIT_SHA

# Set a working directory
WORKDIR /usr/src/app

# Install native dependencies
RUN set -ex; \
    apk --no-cache add --virtual native-deps g++ gcc libpng-dev libgcc libstdc++ linux-headers make python 

# Install Node.js dependencies
COPY package.json yarn.lock ./
RUN set -ex; \
    if [ "$NODE_ENV" = "production" ]; then \
    npm install -g firebase-tools --silent; \
    NODE_ENV=development yarn --silent; \
    fi;

# Copy application files
COPY src ./src/
COPY ssl ./ssl/
COPY public ./public/
COPY webpack.config.js .
COPY webpack.config.prod.js .
COPY firebase.json .
COPY .babelrc .

# Attempts to copy "build" folder even if it doesn't exist
#COPY build* ./build/


CMD ["yarn", "start"]

