# Getting Started with Ptah backend

This document assumes you've built the [frontend part of Ptah](_index.md), have checked that it works well and now you're happy to build [Ptah backend](https://github.com/ProtocolONE/ptah-editor/tree/develop/backend) and enable the full functionality.

## These are the dependencies you need to have set up: 
* Node.js v10+
* NPM v6+
* Redis v5+

---
**NOTE**

Sometimes you just want to check that everything compiles and launches. You can skip `CORS, REDIS, SENTRY` parameters so that the default values are used. See [app.js code](/backend/app/app.js) for more info.

---

`NODE_ENV=production AUTH1_CLIENT_ID={string} AUTH1_CLIENT_SCOPE={string="openid,offline"} 
AUTH1_CLIENT_SECRET={string} AUTH1_ISSUER_URL={string} CORS_VALID_ORIGINS={string} POST_MESSAGE_TARGET_ORIGIN={string} 
PTAH_API_HOST_URL={string} MAILCHIMP_CLIENT_ID={string} MAILCHIMP_CLIENT_SECRET={string} PUBLIC_HOST={string} 
REDIS_HOST={string} REDIS_PORT={string} ROUTES_PREFIX={string} SENTRY_DSN={string} SESSION_COOKIE_NAME={string} 
SESSION_COOKIE_SIGN_KEY={string} SESSION_MAX_AGE={string=21600} SERVER_POR={string=80} node ./index.js`

See [config.js code](/backend/config/config.js) for insights of the backend configuration settings.

Where:
```
{AUTH1_CLIENT_ID} - client id for OAuth2 authentication through Auth1 service
{AUTH1_CLIENT_SCOPE} - required client scope for OAuth2 authentication through Auth1 service
{AUTH1_CLIENT_SECRET} - client secret for OAuth2 authentication through Auth1 service
{AUTH1_ISSUER_URL} - url of Auth1 host 
{CORS_VALID_ORIGINS} - list of valid origins for CORS protection, separated by comma. Notice! The default value is *, it disables CORS protection
{MAILCHIMP_CLIENT_ID} - client id for OAuth2 authentication in Mailchimp service
{MAILCHIMP_CLIENT_SECRET} - client secret for OAuth2 authentication in Mailchimp service
{NODE_ENV} - Current environment
{POST_MESSAGE_TARGET_ORIGIN} - target origin for postMessages with authorization results
{PTAH_API_HOST_URL} - host with ptah-api, for example https://ptahapi.tst.protocol.one
{PUBLIC_HOST} - public host url, for example https://landings.protocol.one
{REDIS_HOST} - redis host
{REDIS_PORT} - redis post
{ROUTES_PREFIX} - common prefix for all routes. Uses empty string by default
{SENTRY_DSN} - public DSN for Sentry
{SERVER_PORT} - port of the Koa http server
{SESSION_COOKIE_NAME} - name of the cookie session
{SESSION_COOKIE_SIGN_KEY} - key to sign the cookie session
{SESSION_MAX_AGE} - session lifetime in seconds

```

## User Authorization
The user authorization process happens in an iframe. You will receive a postMessage from the iframe 
with the result of the authorization.
* Open an `/auth1/login` URL in an iframe to have the user log in
* The result is a postMessage with a json-serialized object with an auth token, expiration time and an error code if it occurs. 
** See the actual structure of the object in [backend/templates/auth1.postmessage.html.template](../backend/templates/auth1.postmessage.html.template)
* The auth token shall be stored in the browser's local storage
* Pass the auth token as a bearer authorization header to all requests to the Ptah API.

To refresh a page you can send a GET request to `/auth1/refresh` to get a json response with an updated token. 

To logout you can send a refresh token as a "refresh" header and the access token as a bearer authorization in a GET request to 
`/auth1/logout`

## Mailchimp linking

You can link your MailChip account to collect your visitor emails on on your landing page.

* Open an `/mailchimp/login` url in an iframe to have the user log in
* The result is a postMessage with a json-serialized object with success sign and an error code if it occurs. 
** See the actual structure of the object in [backend/templates/mailchimp.postmessage.html.template](../backend/templates/auth1.postmessage.html.template)
