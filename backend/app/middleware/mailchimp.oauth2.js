'use strict'

const fs = require('fs')
const _ = require('lodash')
const fetch = require('node-fetch')
const urlJoin = require('url-join')
const urlParse = require('url-parse')
const buildUrl = require('build-url')

const config = require('../../config/config')

const createMiddleware = require('./oauth2')

const mailchimpPostmessageHtmlTemplate = fs.readFileSync(config.mailchimpPostmessageHtmlTemplatePath).toString('utf8')

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.mailchimpRoutesNamespace, 'callback'])
})

const authorizeUrl = urlParse(config.mailchimpAuthorizeUrl)
const tokenUrl = urlParse(config.mailchimpTokenUrl)

console.debug('mailchimp.oauth2.js tokenUrl', tokenUrl.origin, tokenUrl.pathname)

const oauthConfig = {
  // Client ID and secret for OAuth provider
  clientId: config.mailchimpClientId,
  clientSecret: config.mailchimpClientSecret,

  // Redirect URL for this application, i.e. where you mounted the authorized middleware
  callbackUrl: callbackUrl,

  sessionNamespace: config.mailchimpSessionNamespace,

  publicHost: config.publicHost,

  // These options are passed to simple-oauth2, see https://github.com/lelylan/simple-oauth2
  oauthOptions: {
    auth: {
      tokenHost: tokenUrl.origin,
      tokenPath: tokenUrl.pathname,
      authorizeHost: authorizeUrl.origin,
      authorizePath: authorizeUrl.pathname
    }
  },

  scope: [],

  postmessageHtmlTemplate: mailchimpPostmessageHtmlTemplate
}

const oauthMiddleware = createMiddleware(Object.assign({}, oauthConfig))

const login = async (ctx) => {
  if (!_.get(ctx, 'session.userId')) {
    ctx.log.error(new Error('No authenticated user in session'))
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: 'logged-user-required' })
  }
  try {
    await oauthMiddleware.login(ctx)
  } catch (err) {
    ctx.log.error(err)
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: err.message || 'unknown' })
  }
}

const authorized = async (ctx) => {
  if (!_.get(ctx, 'session.userId')) {
    ctx.log.error(new Error('No authenticated user in session'))
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: 'logged-user-required' })
  }

  try {
    await oauthMiddleware.authorized(ctx)

    const oauthToken = oauthMiddleware.getTokenFromSession(ctx)
    const mailchimpAccessToken = oauthToken.token.access_token

    const auth1Oauth = ctx.session[config.auth1SessionNamespace]
    const auth1AccessToken = auth1Oauth.access_token

    const updateUserEndpointUrl = urlJoin([config.ptahApiRootUrl, '/api/v1/user'])

    let mailchimpIntegration = false

    try {
      const response = await fetch(updateUserEndpointUrl, {
        method: 'POST',
        body: JSON.stringify({
          mailchimpAccessToken: mailchimpAccessToken
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth1AccessToken}`,
          'X-Request-ID': ctx.id
        }
      })
      if (response.ok) {
        // Parse response
        const result = await response.json()
        mailchimpIntegration = result.mailchimpIntegration
      } else {
        throw new Error(response.error)
      }
    } catch (err) {
      throw err
    }

    // remove mailchimp oauth tokens from session, we don't need it there any more
    ctx.session[config.mailchimpSessionNamespace] = null

    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: mailchimpIntegration ? '' : 'no-mailchimp-integration' })
  } catch (err) {
    ctx.log.error(err)
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: err.message || 'unknown' })
  }
}

module.exports = {
  login,
  authorized
}
