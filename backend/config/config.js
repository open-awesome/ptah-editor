'use strict'

const path = require('path')

const envUtils = require('../app/utils/env')
const getEnvVariable = envUtils.getEnvVariable
const getEnvVariableArray = envUtils.getEnvVariableArray

const config = {
  serverPort: +getEnvVariable('SERVER_PORT', 80),

  dbHost: getEnvVariable('DB_HOST', 'localhost'),
  dbPort: +getEnvVariable('DB_PORT', '27017'),
  dbName: getEnvVariable('DB_NAME', 'ptah'),
  dbUser: getEnvVariable('DB_USER', 'ptah'),
  dbPass: getEnvVariable('DB_PASS', 'ptah'),
  dbAuthMethod: getEnvVariable('DB_AUTH_METHOD', 'SCRAM-SHA-256'),
  dbUsersCollectionName: 'ptah-users',

  redisHost: getEnvVariable('REDIS_HOST', '192.168.99.100'),
  redisPort: +getEnvVariable('REDIS_PORT', '6379'),

  sessionCookieName: getEnvVariable('SESSION_COOKIE_NAME', 'ptahsid'),
  sessionCookieSignKey: getEnvVariable('SESSION_COOKIE_SIGN_KEY', '3a610fe5-fd7f-41a3-89ba-e7c8c9bcd1d1'),

  routesPrefix: getEnvVariable('ROUTES_PREFIX', ''),
  auth1RoutesNamespace: '/auth1',
  mailchimpRoutesNamespace: '/mailchimp',

  sentryDsn: getEnvVariable('SENTRY_DSN', 'https://0c02631c9b4645699161cffa21721ef4@sentry.tst.protocol.one/9'),

  publicHost: getEnvVariable('PUBLIC_HOST', 'http://127.0.0.1'),

  indexHtmlPath: path.resolve('dist/index.html'),
  staticPath: path.resolve('dist'),

  auth1ClientId: getEnvVariable('AUTH1_CLIENT_ID', '5c6a9d5568add43d9cb21826'),
  auth1ClientSecret: getEnvVariable('AUTH1_CLIENT_SECRET', 'J0dNcG9uj9gWHwyj3GnGvnRZNsJs3xcDBWnrENzobLFkxzftOnu7R6DWzF8tIDAH'),
  auth1Scope: getEnvVariableArray('AUTH1_CLIENT_SCOPE', 'openid,offline'),
  auth1AuthorizeUrl: getEnvVariable('AUTH1_AUTHORIZE_URL', 'http://192.168.99.100:4444/oauth2/auth'),
  auth1TokenUrl: getEnvVariable('AUTH1_TOKEN_URL', 'http://192.168.99.100:4444/oauth2/token'),
  auth1RevokeTokenUrl: getEnvVariable('AUTH1_REVOKE_TOKEN_URL', 'http://192.168.99.100:4444/oauth2/revoke'),
  auth1UserinfoUrl: getEnvVariable('AUTH1_USERINFO_URL', 'http://192.168.99.100:4444/userinfo'),
  auth1PostmessageHtmlTemplatePath: path.resolve('backend/templates/auth1.postmessage.html.template'),

  mailchimpClientId: getEnvVariable('PTAH_MAILCHIMP_CLIENT_ID', '462853669980'),
  mailchimpClientSecret: getEnvVariable('PTAH_MAILCHIMP_CLIENT_SECRET', '76db4d17f02fa0a036054278e08beaa0af50c328ba7e435b26'),
  mailchimpAuthorizeUrl: getEnvVariable('MAILCHIMP_AUTHORIZE_URL', 'https://login.mailchimp.com/oauth2/authorize'),
  mailchimpTokenUrl: getEnvVariable('MAILCHIMP_TOKEN_URL', 'https://login.mailchimp.com/oauth2/token'),
  mailchimpPostmessageHtmlTemplatePath: path.resolve('backend/templates/mailchimp.postmessage.html.template')

}

module.exports = config
