'use strict'

const fs = require('fs')
const Router = require('koa-router')

const config = require('../../config/config')

const auth1Middleware = require('./auth1.oauth2')
const mailchimpAuthMiddleware = require('./mailchimp.oauth2')

const router = new Router({
  prefix: config.routesPrefix
})

const auth1RoutesNamespace = config.auth1RoutesNamespace
const mailchimpRoutesNamespace = config.mailchimpRoutesNamespace

const indexContent = fs.readFileSync(config.indexHtmlPath).toString('utf8')

router
  .get('/_healthz', async (ctx, next) => {
    ctx.body = {}
    next()
  })

  .get('/', async (ctx) => {
    ctx.type = 'html'
    ctx.body = indexContent
  })

  .get(`${auth1RoutesNamespace}/login`, auth1Middleware.login)
  .get(`${auth1RoutesNamespace}/callback`, auth1Middleware.authorize)
  .get(`${auth1RoutesNamespace}/refresh`, auth1Middleware.refresh)
  .get(`${auth1RoutesNamespace}/logout`, auth1Middleware.logout)

  .get(`${mailchimpRoutesNamespace}/login`, mailchimpAuthMiddleware.login)
  .get(`${mailchimpRoutesNamespace}/callback`, mailchimpAuthMiddleware.authorize)
  .get(`${mailchimpRoutesNamespace}/callback/success`, mailchimpAuthMiddleware.success)
  .get(`${mailchimpRoutesNamespace}/callback/fail`, mailchimpAuthMiddleware.fail)

module.exports.routes = function () {
  return router.routes()
}
module.exports.allowedMethods = function () {
  return router.allowedMethods()
}
