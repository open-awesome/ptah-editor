'use strict'

const fs = require('fs')
const urlJoin = require('url-join')
const urlParse = require('url-parse')
const buildUrl = require('build-url')

const config = require('../../config/config')
const createMiddleware = require('./oauth2')
const RedisOauthCache = require('./redis-oauth-cache')

const redisOauthCache = new RedisOauthCache(config.redisPort, config.redisHost)

const auth1PostmessageHtmlTemplate = fs.readFileSync(config.auth1PostmessageHtmlTemplatePath).toString('utf8')

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.auth1RoutesNamespace, 'callback'])
})

const authorizeUrl = urlParse(config.auth1AuthorizeUrl)
const tokenUrl = urlParse(config.auth1TokenUrl)
const revokeUrl = urlParse(config.auth1RevokeTokenUrl)

const oauthConfig = {
  // Client ID and secret for OAuth provider
  clientId: config.auth1ClientId,
  clientSecret: config.auth1ClientSecret,

  // Redirect URL for this application, i.e. where you mounted the authorized middleware
  callbackUrl: callbackUrl,

  publicHost: config.publicHost,

  userinfoUrl: config.auth1UserinfoUrl,

  scope: config.auth1Scope,

  sessionNamespace: 'auth1',

  // These options are passed to simple-oauth2, see https://github.com/lelylan/simple-oauth2
  oauthOptions: {
    auth: {
      tokenHost: tokenUrl.origin,
      tokenPath: tokenUrl.pathname,
      authorizeHost: authorizeUrl.origin,
      authorizePath: authorizeUrl.pathname,
      revokePath: revokeUrl.pathname
    }
  },

  postmessageHtmlTemplate: auth1PostmessageHtmlTemplate
}

const oauthMiddleware = createMiddleware(Object.assign({}, oauthConfig))

const login = async (ctx) => {
  try {
    await oauthMiddleware.login(ctx)
  } catch (err) {
    ctx.log.error(err)
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: err.message })
  }
}

const authorized = async (ctx) => {
  try {
    await oauthMiddleware.authorized(ctx)
    const oauthToken = oauthMiddleware.getTokenFromSession(ctx)
    const userinfo = await oauthMiddleware.userinfo(ctx)
    ctx.session.userId = userinfo.sub

    return oauthMiddleware.sendHtmlResponse(ctx, {
      errorCode: '',
      accessToken: oauthToken.token.access_token,
      expiresIn: oauthToken.token.expires_in
    })
  } catch (err) {
    ctx.log.error(err)
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: err.message })
  }
}

const refresh = async (ctx) => {
  try {
    await oauthMiddleware.refresh(ctx)
    const oauthToken = oauthMiddleware.getTokenFromSession(ctx)
    ctx.body = {
      accessToken: oauthToken.token.access_token,
      expiresIn: oauthToken.token.expires_in
    }
  } catch (err) {
    throw err
  }
}

const logout = async (ctx) => {
  try {
    await oauthMiddleware.logout(ctx)

    // remove token introspection result from redis cache after token revocation
    const oauthToken = oauthMiddleware.getTokenFromSession(ctx)
    await redisOauthCache.destroy(oauthToken.token.access_token, ctx)
  } catch (err) {
    ctx.log.error(err)
  }
  ctx.session = null
  ctx.status = 200
  ctx.redirect('/')
}

module.exports = {
  login,
  authorized,
  refresh,
  logout
}
