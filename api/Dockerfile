#Inspired from https://github.com/kriasoft/nodejs-api-starter/blob/master/Dockerfile
FROM node:9-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG COMMIT_SHA=''
ENV COMMIT_SHA=$COMMIT_SHA

ARG VERSION=''
ENV VERSION=$VERSION

# Set a working directory
WORKDIR /usr/src/app

# Install native dependencies
RUN set -ex; \
    apk --no-cache add --virtual native-deps alpine-sdk git openssh make yarn gcc g++ python 

# Install Node.js dependencies
COPY package.json yarn.lock ./
RUN set -ex; \
    if [ "$NODE_ENV" = "production" ] || [ "$NODE_ENV" = "beta" ]; then \
    yarn install --no-cache --frozen-lockfile --production; \
    elif [ "$NODE_ENV" = "test" ]; then \
    touch yarn-error.log; \
    mkdir -m 777 build; \
    yarn install --no-cache --frozen-lockfile; \
    chown -R node:node build node_modules package.json yarn.lock yarn-error.log; \
    else \
    touch yarn-error.log; \
    mkdir -p -m 777 build node_modules /home/node/.cache/yarn; \
    chown -R node:node build node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
    fi;

RUN mkdir /etc/periodic/everymin
RUN touch /var/log/cron.log
RUN crontab -l | { cat; echo "*    *       *       *       *       run-parts /etc/periodic/everymin"; } | crontab -

# Copy application files
COPY server ./server/
COPY bin ./bin/
COPY common ./common/
COPY codegen ./codegen/
COPY fixtures ./fixtures/
# Attempts to copy "build" folder even if it doesn't exist

COPY __tests__ ./__tests__/


# Run the container under "node" user by default
USER node

CMD ["yarn", "start"]


