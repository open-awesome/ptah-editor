'use strict'

const fs = require('fs')
const urlJoin = require('url-join')
const urlParse = require('url-parse')
const buildUrl = require('build-url')
const ObjectID = require('bson-objectid')

const config = require('../../config/config')

const createMiddleware = require('./oauth2')
const getUser = require('../utils/get-user')
const getDbCollection = require('../utils/get-db-collection')

const sessionNamespace = 'mailchimp'

const mailchimpPostmessageHtmlTemplate = fs.readFileSync(config.mailchimpPostmessageHtmlTemplatePath).toString('utf8')

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.mailchimpRoutesNamespace, 'callback'])
})

const authorizeUrl = urlParse(config.mailchimpAuthorizeUrl)
const tokenUrl = urlParse(config.mailchimpTokenUrl)

const oauthConfig = {
  // Client ID and secret for OAuth provider
  clientId: config.mailchimpClientId,
  clientSecret: config.mailchimpClientSecret,

  // Redirect URL for this application, i.e. where you mounted the authorized middleware
  callbackUrl: callbackUrl,

  sessionNamespace: sessionNamespace,

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
  try {
    await getUser(ctx)
  } catch (err) {
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: 'logged-user-required' })
  }
  try {
    await oauthMiddleware.login(ctx)
  } catch (err) {
    ctx.log.error(err)
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: 'unknown' })
  }
}

const authorized = async (ctx) => {
  let user
  try {
    user = await getUser(ctx)
  } catch (err) {
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: 'logged-user-required' })
  }

  try {
    await oauthMiddleware.authorized(ctx)
    const oauthToken = oauthMiddleware.getTokenFromSession(ctx)

    user.mailchimpIntegration = true
    user.mailchimpAccessToken = oauthToken.token.access_token

    const collection = getDbCollection.users(ctx)
    await collection.updateOne({ _id: ObjectID(user._id) }, { $set: user })

    // remove mailchimp oauth tokens from session, we don't need it there any more
    ctx.session[sessionNamespace] = null

    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: '' })
  } catch (err) {
    ctx.log.error(err)
    return oauthMiddleware.sendHtmlResponse(ctx, { errorCode: err.message })
  }
}

module.exports = {
  login,
  authorized
}
