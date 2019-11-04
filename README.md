[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/ProtocolOne/ptah-editor.svg?branch=master)](https://travis-ci.org/ProtocolOne/ptah-editor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/da503bb6111644f68a1266eea37309c7)](https://www.codacy.com/app/ProtocolOne/storefront)

# Ptah - Vue.js-based landing page builder
<p align="center">
<img align="center" width="596" height="336" src="/docs/ptah-editor.gif">
</p>

Ptah is a Vue.js-based open-source game-focused landing page builder framework that combines various ready-to-use templates. 
It is can be used as a separate product or as an editor inside a CMS to empower less technical users to create modern and fast landing pages for games or e-commerce.

* Open source under [Apache-2.0 license](LICENSE)
* Built with Vue.js
* Produces ready to deploy [PWA projects](https://developers.google.com/web/progressive-web-apps/)
* Can be used as a standalone tool or intergrated into your CMS
* Ships with a library of built-in templates that you can extend
* * All our templates feature responsive design out of the box and are mobile-friendly
* Contains multiple ready to use building blocks 
* * Such as galleries, system requirements, supported gaming platforms, social links, lead forms, presale options and more
* * Each building block (a 'section') can be additionally tweaked to your needs and taste
* * Sections support drag-n-drop and live edits


## [A good demo](https://ptah.super.com/editor/demo) is worth a thousand words

As you have seen [in the demo](https://ptah.super.com/editor/demo), Ptah is based on Vue.js components, created as editable sections with slot elements. You can use the editor to create templates, just like in the demo above, or export ready to deploy [PWA projects](https://developers.google.com/web/progressive-web-apps/).

## We built [our own landing page](https://ptah.super.com/) with Ptah

We created Ptah for internal use, and were able to open source it under a friendly and popular [Apache 2.0 license](LICENSE). If you like what you see, we do inspire you to try out Ptah and perhaps see [CONTRIBUTING.md](CONTRIBUTING.md), once you're ready to contribute.


# Getting Started
We've started working on [verbose docs for Ptah](docs/_index.md). So _Watch/Star_ the repo to return when we have more or _be brave, be bold_ and fork what we have today. Then fire up all [your questions as issues](/../../issues/new) so we have a motivation to finish the docs faster ;-) Obviously we'd also reply to you issue to our best ability.

### Feature Requests and support

If you have an idea of how to improve Ptah or have general feedback, you're welcome to submit a [feature request](/../../issues/new?labels=type%3A+feature+request&template=2-feature_request.md).

Chances are, you like what we have already but you may require a custom integration, a special license or something else big and specific to your needs that our community may not benefit from. We're generally open to such conversations.

If you have a question and can't find the answer yourself, you can [raise an issue](/../../issues/new) and describe what exactly you're trying to do. We'll do our best to reply in a meaningful time.

#### Dependencies: 
* Node.js v10+
* NPM v6+
* Redis v5+

#### Install and run
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

#### User Authorization
The user authorization process happens in an iframe. You will receive a postMessage from the iframe 
with the result of the authorization.
* Open an `/auth1/login` URL in an iframe to have the user log in
* The result is a postMessage with a json-serialized object with an auth token, expiration time and an error code if it occurs. 
** See the actual structure of the object in [backend/templates/auth1.postmessage.html.template](backend/templates/auth1.postmessage.html.template)
* The auth token shall be stored in the browser's local storage
* Pass the auth token as a bearer authorization header to all requests to the Ptah API.

To refresh a page you can send a GET request to `/auth1/refresh` to get a json response with an updated token. 

To logout you can send a refresh token as a "refresh" header and the access token as a bearer authorization in a GET request to 
`/auth1/logout`

#### Mailchimp linking

You can link your MailChip account to collect your visitor emails on on your landing page.

* Open an `/mailchimp/login` url in an iframe to have the user log in
* The result is a postMessage with a json-serialized object with success sign and an error code if it occurs. 
** See the actual structure of the object in [backend/templates/mailchimp.postmessage.html.template](backend/templates/auth1.postmessage.html.template)

---

Cross-browser testing provided by:

<a rel="nofollow" target="_blank" href="http://browserstack.com"><img width="150" height="32" src="https://github.com/ProtocolONE/ptah-editor/blob/develop/public/img/browserstack-logo.svg" alt="BrowserStack"></a>
