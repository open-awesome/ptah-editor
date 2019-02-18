FROM node:10.12-alpine AS node

#RUN apk update && apk add libpng-dev
RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool

RUN npm install gulp -g

WORKDIR /app

ENV NODE_ENV=production \
    AUTH1_AUTHORIZE_URL="" \
    AUTH1_CLIENT_ID="" \
    AUTH1_CLIENT_SCOPE="openid,offline" \
    AUTH1_CLIENT_SECRET="" \
    AUTH1_TOKEN_URL="" \
    AUTH1_USERINFO_URL="" \
    DB_AUTH_METHOD="SCRAM-SHA-256" \
    DB_HOST="" \
    DB_NAME="ptah" \
    DB_PASS="" \
    DB_PORT=27017 \
    DB_USER="" \
    PUBLIC_HOST="" \
    REDIS_HOST="" \
    REDIS_PORT="" \
    ROUTES_PREFIX="" \
    SENTRY_DSN="" \
    SESSION_COOKIE_NAME="" \
    SESSION_COOKIE_SIGN_KEY="" \
    SERVER_PORT=80


COPY .eslintrc.js aliases.config.js gulpfile.js package.json vue.config.js webpack.mix.js yarn.lock /app/
# RUN npm install && npm prune --production
RUN yarn install
COPY . /app/
RUN yarn cjs && gulp locale_sync && gulp public-image && yarn build

# RUN chmod +x start.sh

# EXPOSE 80

# CMD ["./start.sh"]

FROM nginx:1.15.4

WORKDIR /usr/share/nginx/html
COPY --from=node /app/dist /usr/share/nginx/html
