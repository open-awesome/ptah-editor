FROM node:10.12-alpine

#RUN apk update && apk add libpng-dev
RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool

WORKDIR /application
COPY .eslintrc.js aliases.config.js gulpfile.js package.json vue.config.js webpack.mix.js yarn.lock /application/
RUN yarn install 
RUN yarn build

ENV NODE_ENV=production

COPY . /application/

ENV HOST 0.0.0.0
EXPOSE 80

CMD ["yarn", "run", "prod"]
