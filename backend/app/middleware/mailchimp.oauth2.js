'use strict'

const fs = require('fs')
const fetch = require('node-fetch')
const urlJoin = require('url-join')
const buildUrl = require('build-url')
const format = require('string-template')
const MailChimpOAuth = require('mailchimp').MailChimpOAuth

const config = require('../../config/config')

const mailchimpPostmessageHtmlTemplate = fs.readFileSync(config.mailchimpPostmessageHtmlTemplatePath).toString('utf8')

const setHtmlResponse = (ctx, params) => {
  const defaultParams = {
    accessToken: '',
    expiresIn: 0,
    targetOrigin: config.postMessageTargetOrigin
  }
  const resultParams = Object.assign({}, defaultParams, params)
  if (resultParams.accessToken) {
    resultParams.errorCode = ''
  } else {
    resultParams.errorCode = typeof (resultParams.errorCode) === 'undefined' ? '' : resultParams.errorCode
  }
  resultParams.isSuccess = resultParams.errorCode === ''
  ctx.type = 'html'
  ctx.body = format(mailchimpPostmessageHtmlTemplate, resultParams)
}

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.mailchimpRoutesNamespace, 'callback'])
})

const options = {
  clientId: config.mailchimpClientId,
  clientSecret: config.mailchimpClientSecret,
  redirectUri: callbackUrl
}

const oauth = new MailChimpOAuth(options)

const login = (ctx) => {
  const auth1Tokens = ctx.session[config.auth1SessionNamespace]
  if (!auth1Tokens) {
    ctx.log.error(new Error('No authenticated user in session'))
    return ctx.redirect(callbackUrl + '/fail')
  }
  ctx.redirect(oauth.getAuthorizeUri())
}

const authorize = async (ctx) => {
  const auth1Tokens = ctx.session[config.auth1SessionNamespace]
  if (!auth1Tokens) {
    ctx.log.error(new Error('No authenticated user in session'))
    return ctx.redirect(callbackUrl + '/fail')
  }
  const auth1AccessToken = auth1Tokens.access_token
  const updateUserEndpointUrl = urlJoin([config.ptahApiHostUrl, '/api/v1/user'])
  const code = ctx.query.code

  return new Promise((resolve, reject) => {
    try {
      if (code) {
        oauth.on('receivedAccessToken', async function (data) {
          let mailchimpIntegration = false

          const response = await fetch(updateUserEndpointUrl, {
            method: 'POST',
            body: JSON.stringify({
              mailchimpAccessToken: data.accessToken
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
          if (mailchimpIntegration) {
            resolve()
          }
        })
        oauth.getAccessToken({ code: code })
      }
    } catch (err) {
      reject(err)
    }
  })
    .then(
      () => {
        ctx.redirect(callbackUrl + '/success')
      },
      error => {
        ctx.log.error(error)
        ctx.redirect(callbackUrl + '/fail')
      }
    )
}

const success = (ctx) => {
  setHtmlResponse(ctx)
}

const fail = (ctx) => {
  setHtmlResponse(ctx, { errorCode: 'no-mailchimp-integration' })
}

module.exports = {
  login,
  authorize,
  success,
  fail
}
