'use strict'

const _ = require('lodash')
const fetch = require('node-fetch')
const format = require('string-template')
const simpleOauth2 = require('simple-oauth2')

module.exports = ({
  clientId,
  clientSecret,
  scope,
  url,
  callbackUrl,
  state,
  oauthOptions = {},
  postmessageHtmlTemplate = '',
  userinfoUrl,
  sessionNamespace,
  postMessageTargetOrigin
}) => {
  // Initialize OAuth
  const oauth2 = simpleOauth2.create({
    ...oauthOptions,
    client: {
      id: clientId,
      secret: clientSecret,
      ...oauthOptions.client
    },
    auth: {
      ...oauthOptions.auth
    }
  })

  // Login endpoint
  const login = async (ctx) => {
    try {
      ctx.session.state = Math.random().toString(36).substring(2)
      // Redirect to OAuth provider
      const url = oauth2.authorizationCode.authorizeURL({
        redirect_uri: callbackUrl,
        scope: scope.join(' '),
        state: ctx.session.state
      })
      ctx.redirect(url)
    } catch (err) {
      throw err
    }
  }

  // Authorized endpoint
  const authorized = async (ctx) => {
    try {
      if (!ctx.query.code || !ctx.query.state || ctx.query.state !== ctx.session.state) {
        throw new Error('Invalid code or state')
      }
      ctx.session.state = null
      // Request access token
      const result = await oauth2.authorizationCode.getToken({
        redirect_uri: callbackUrl,
        code: ctx.query.code
      })
      const oauthToken = oauth2.accessToken.create(result)
      ctx.session[sessionNamespace] = oauthToken.token
    } catch (err) {
      throw err
    }
  }

  const userinfo = async (ctx) => {
    const token = getTokenFromSession(ctx)
    if (!token.token.access_token) {
      return null
    }
    try {
      const response = await fetch(`${userinfoUrl}?access_token=${token.token.access_token}`, {
        method: 'GET'
      })
      if (response.ok) {
        // Parse response
        return await response.json()
      } else {
        throw new Error(response.error)
      }
    } catch (err) {
      throw err
    }
  }

  const refresh = async (ctx) => {
    try {
      const token = getTokenFromSession(ctx)
      const result = await token.refresh()

      ctx.session[sessionNamespace] = result.token
    } catch (err) {
      throw err
    }
  }

  const logout = async (ctx) => {
    try {
      const token = getTokenFromSession(ctx)
      await token.revokeAll()
    } catch (err) {
      throw err
    }
  }

  const getTokenFromSession = (ctx) => {
    let tokenParams = ctx.session[sessionNamespace]
    if (!tokenParams) {
      throw new Error('No oauth tokens stored in session for ' + sessionNamespace)
    }
    return oauth2.accessToken.create(tokenParams)
  }

  const sendHtmlResponse = (ctx, params) => {
    const _params = _.defaults(params, {
      errorCode: 'unknown',
      accessToken: '',
      expiresIn: 0,
      targetOrigin: postMessageTargetOrigin
    })
    _params.isSuccess = _params.errorCode === ''
    ctx.type = 'html'
    ctx.body = format(postmessageHtmlTemplate, _params)
  }

  return {
    login,
    authorized,
    refresh,
    logout,
    userinfo,
    getTokenFromSession,
    sendHtmlResponse
  }
}
