## Ptah documentation
This is just a start. Proper docs will appear here sometime.

## Dependencies: 
* Node.js v10+
* NPM v6+
* Redis v5+

## Install and run
* `yarn install`
* `yarn cjs`
* `gulp locale_sync`
* `gulp public-image`
* `yarn build`
* `NODE_ENV=production AUTH1_CLIENT_ID={string} AUTH1_CLIENT_SCOPE={string="openid,offline"} 
AUTH1_CLIENT_SECRET={string} AUTH1_ISSUER_URL={string} CORS_VALID_ORIGINS={string} POST_MESSAGE_TARGET_ORIGIN={string} 
PTAH_API_HOST_URL={string} MAILCHIMP_CLIENT_ID={string} MAILCHIMP_CLIENT_SECRET={string} PUBLIC_HOST={string} 
REDIS_HOST={string} REDIS_PORT={string} ROUTES_PREFIX={string} SENTRY_DSN={string} SESSION_COOKIE_NAME={string} 
SESSION_COOKIE_SIGN_KEY={string} SESSION_MAX_AGE={string=21600} SERVER_POR={string=80} node ./index.js`

Where:

*Obligatory params*

{AUTH1_CLIENT_ID} - client id for OAuth2 authentication through Auth1 service

{AUTH1_CLIENT_SCOPE} - required client scope for OAuth2 authentication through Auth1 service

{AUTH1_CLIENT_SECRET} - client secret for OAuth2 authentication through Auth1 service

{AUTH1_ISSUER_URL} - url of Auth1 host 

{CORS_VALID_ORIGINS} - list of valid origins for CORS protection, separated by comma. Notice! Value of * uses by default (disable CORS protection)

{MAILCHIMP_CLIENT_ID} - client id for OAuth2 authentication in Mailchimp service

{MAILCHIMP_CLIENT_SECRET} - client secret for OAuth2 authentication in Mailchimp service

{NODE_ENV} - Current environment

{POST_MESSAGE_TARGET_ORIGIN} - target origin for postMessages with results of authorization

{PTAH_API_HOST_URL} - host with ptah-api, for example https://ptahapi.tst.protocol.one

{PUBLIC_HOST} - Public host url, for example https://landings.protocol.one

{REDIS_HOST} - Redis host

{REDIS_PORT} - Redis post

{ROUTES_PREFIX} - Common prefix for all routes, use empty string by default

{SENTRY_DSN} - public DSN for Sentry

{SERVER_PORT} - Port of koa http server

{SESSION_COOKIE_NAME} - Name of cookie session

{SESSION_COOKIE_SIGN_KEY} - Key for signing cookie session

{SESSION_MAX_AGE} - session lifetime in seconds






## User Authentication

For make a user login, you must open an `/auth1/login` url if iframe. 
All process of authorization will go in that frame, and finally you receive a postMessage from iframe, 
with result of authorization. 

Result will be an json-serialized object with auth token, expire time and error code if it occures. 
Actual structure of object you may see in `backend/templates/auth1.postmessage.html.template` file.

Token, that you receive form postMessage, you must store in browser's local storage.
You must pass access token as bearer authorization header to all requests to ptah api.

For refresh you must send GET request to `/auth1/refresh`, and you will get json response with updated token. 

For logout you must send refresh token as "refresh" header and access token as bearer authorization in GET request to 
`/auth1/logout`

## Mailchimp linking

For link user accounts in mailchimp and use maillists on your landing page, you must open an `/mailchimp/login` url
in iframe.
All process of authorization will go in that frame, and finally you receive a postMessage from iframe, 
with result of authorization. 
