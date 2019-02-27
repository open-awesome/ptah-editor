'use strict'

const fs = require('fs')
const urlJoin = require('url-join')
const urlParse = require('url-parse')
const buildUrl = require('build-url')
const { auth1KoaMiddleware } = require('authone-middleware-node')

const config = require('../../config/config')

const auth1PostmessageHtmlTemplate = fs.readFileSync(config.auth1PostmessageHtmlTemplatePath).toString('utf8')

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.auth1RoutesNamespace, 'callback'])
})

const authorizeUrl = urlParse(config.auth1AuthorizeUrl)
const tokenUrl = urlParse(config.auth1TokenUrl)
const revokeUrl = urlParse(config.auth1RevokeTokenUrl)

const middlewareOptions = {
  publicHost: authorizeUrl.origin,
  authorizePath: authorizeUrl.pathname,
  tokenPath: tokenUrl.pathname,
  revokePath: revokeUrl.pathname,
  redirectUri: callbackUrl,
  clientId: config.auth1ClientId,
  clientSecret: config.auth1ClientSecret,
  cacheType: 'redis',
  cacheRedisHost: config.redisHost,
  cacheRedisPort: config.redisPort,
  namespace: config.auth1SessionNamespace,
  postmessageHtmlTemplate: auth1PostmessageHtmlTemplate,
  postMessageTargetOrigin: config.postMessageTargetOrigin,
  scope: config.auth1Scope,
  debug: false
}

const middleware = auth1KoaMiddleware(middlewareOptions)

const login = middleware.login
const authorize = middleware.authorize
const refresh = middleware.refresh
const logout = middleware.logout

module.exports = {
  login,
  authorize,
  refresh,
  logout
}
