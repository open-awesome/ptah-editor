'use strict'

const fs = require('fs')
const fetch = require('node-fetch')
const urlJoin = require('url-join')
const urlParse = require('url-parse')
const buildUrl = require('build-url')
const { auth1KoaMiddleware } = require('authone-middleware-node')

const config = require('../../config/config')

const mailchimpPostmessageHtmlTemplate = fs.readFileSync(config.mailchimpPostmessageHtmlTemplatePath).toString('utf8')

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.mailchimpRoutesNamespace, 'callback'])
})

const authorizeUrl = urlParse(config.mailchimpAuthorizeUrl)
const tokenUrl = urlParse(config.mailchimpTokenUrl)

const middlewareOptions = {
  publicHost: authorizeUrl.origin,
  authorizePath: authorizeUrl.pathname,
  tokenPath: tokenUrl.pathname,
  redirectUri: callbackUrl,
  clientId: config.mailchimpClientId,
  clientSecret: config.mailchimpClientSecret,
  namespace: config.mailchimpSessionNamespace,
  postmessageHtmlTemplate: mailchimpPostmessageHtmlTemplate,
  postMessageTargetOrigin: config.postMessageTargetOrigin,
  scope: [],
  debug: false
}

const middleware = auth1KoaMiddleware(middlewareOptions)

const login = middleware.login

const authorize = async (ctx) => {
  const auth1Tokens = ctx.session[config.auth1SessionNamespace]
  if (!auth1Tokens) {
    ctx.log.error(new Error('No authenticated user in session'))
    return middleware.setHtmlResponse(ctx, { errorCode: 'logged-user-required' })
  }

  try {
    await middleware.authorize(ctx)

    const mailchimpTokens = ctx.session[config.mailchimpSessionNamespace]
    // remove mailchimp oauth tokens from session, we don't need it there any more
    ctx.session[config.mailchimpSessionNamespace] = null

    if (mailchimpTokens) {
      const mailchimpAccessToken = mailchimpTokens.access_token

      const auth1AccessToken = auth1Tokens.access_token

      const updateUserEndpointUrl = urlJoin([config.ptahApiHostUrl, '/api/v1/user'])

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

      if (mailchimpIntegration) {
        return middleware.setHtmlResponse(ctx)
      }
    }
    return middleware.setHtmlResponse(ctx, { errorCode: 'no-mailchimp-integration' })
  } catch (err) {
    ctx.log.error(err)
    return middleware.setHtmlResponse(ctx, { errorCode: err.message || 'unknown' })
  }
}

module.exports = {
  login,
  authorize
}
