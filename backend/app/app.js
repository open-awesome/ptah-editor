'use strict'

const os = require('os')
const Koa = require('koa')
const serve = require('koa-static')
const urlParse = require('url-parse')
const Sentry = require('@sentry/node')
const session = require('koa-session2')
const { KoaReqLogger } = require('koa-req-logger')
const cacheControl = require('koa-cache-control')

const config = require('../config/config')

const router = require('./middleware/router')

const mongo = require('./middleware/mongo')
const RedisStore = require('./middleware/redis')

Sentry.init({
  dsn: config.sentryDsn,
  serverName: `${os.hostname()}-${process.env.NODE_ENV}`
})

const app = new Koa()

app.on('error', err => {
  Sentry.captureException(err)
})

// logger and errors handler
const logger = new KoaReqLogger({
  alwaysError: true // treat all non-2** http codes as error records in logs
})
app.use(logger.getMiddleware())

// session
const publicUrl = urlParse(config.publicHost)
app.keys = [config.sessionCookieSignKey]
app.use(session({
  key: config.sessionCookieName,
  store: new RedisStore(config.redisPort, config.redisHost),
  signed: true,
  httpOnly: true,
  domain: publicUrl.host
}
))

// serve statics (mainly for development; in production static must be served by nginx)
app.use(serve(config.staticPath))

// setup db connection
const mongoOptions = {
  host: config.dbHost,
  port: config.dbPort,
  db: config.dbName
}
const mongoConnectionOptions = {}
if (config.dbUser && config.dbPass && config.dbAuthMethod) {
  mongoConnectionOptions.auth = {
    user: config.dbUser,
    password: config.dbPass
  }
  mongoConnectionOptions.authSource = config.dbName
  mongoConnectionOptions.authMechanism = config.dbAuthMethod
}

// handle mongoDb connection error with code 500 instead of 200 by default, and crash the app after send answer
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (~err.name.toLowerCase().indexOf('mongo')) {
      ctx.res.once('finish', function () {
        process.exit(1)
      })
    }
    const error = new Error(err.message || 'Internal Server Error')
    error.status = err.status || 500
    throw error
  }
})
app.use(mongo(mongoOptions, mongoConnectionOptions))

app.use(router.routes())
app.use(router.allowedMethods())

app.use(cacheControl({
  noCache: true
}))

// server
const port = config.serverPort
const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})

module.exports = server
