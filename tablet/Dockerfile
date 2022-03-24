FROM node:9-alpine
# Temporary fix because of https://github.com/nodejs/node/issues/13667
# We cannot use Alpine because of Chimp  (we need PhantomJS), in prod Alpine should be used

WORKDIR /usr/src/mobile

# Install native dependencies
RUN set -ex; \
    apk --no-cache add --virtual native-deps g++ gcc git libgcc libstdc++ linux-headers make python 

# Install Node.js dependencies
COPY package.json yarn.lock ./
RUN set -ex; \
    yarn install --no-cache --frozen-lockfile; 

# Bundle app source
COPY . .

EXPOSE 4000


