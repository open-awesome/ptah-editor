[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/ProtocolOne/ptah-editor.svg?branch=master)](https://travis-ci.org/ProtocolOne/ptah-editor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/da503bb6111644f68a1266eea37309c7)](https://www.codacy.com/app/ProtocolOne/storefront)

# Ptah - Vue.js-based landing page builder
<p align="center">
<a href="https://ptah.super.com/" target="_blank"><img align="center" width="596" height="336" src="/docs/ptah-editor.gif"></a>
</p>

Ptah is a Vue.js-based open-source game-focused landing page builder framework that combines various ready-to-use templates. 
It is can be used as a separate product or as an editor inside a CMS to empower less technical users to create modern and fast landing pages for games or e-commerce.

* Free and open source under [Apache-2.0 license](LICENSE)
* Produces ready to deploy [PWA projects](https://developers.google.com/web/progressive-web-apps/)
* Ships with 2 production quality templates
* * All our templates feature responsive design out of the box and are mobile-friendly
* * You can modify our templates or add your own
* Contains multiple ready to use [building blocks](/src/components/sections) 
* * Each building block (a 'section') can be additionally tweaked to your needs and taste
* * Sections support drag-n-drop and live edits

## We built [our own landing page](https://ptah.super.com/) with Ptah

We created Ptah for internal use, and were able to open source it under a friendly and popular [Apache 2.0 license](LICENSE). If you're curious about the context, [here's a blog post at dev.to](https://dev.to/tooevangelist/how-to-open-source-the-company-s-internal-tech-bg0) just about what we're doing and why.

## A good demo is worth a thousand words

We're running a demo of Ptah on Amazon Cloud. [Check it out](https://ptah.super.com) by clicking the "Try demo editor" button. 

If you like what you see, we do inspire you to try out Ptah and perhaps see [CONTRIBUTING.md](CONTRIBUTING.md), once you're ready to contribute.

Ptah is based on Vue.js components, created as editable sections with slot elements. You can use the editor to create templates, just like in the demo above, or export ready to deploy [PWA projects](https://developers.google.com/web/progressive-web-apps/).


# Getting Started
We've started working on [verbose docs for Ptah](docs/_index.md), so _Watch/Star_ the repo to follow the progress. 

Or _be brave, be bold_ and fork what we have today. Then fire up all [your questions as issues](/../../issues/new) so we have a motivation to finish the docs faster ;-) Obviously we'd also reply to your issues to our best ability.

You can see the bigger picture [in the docs](docs/_index.md), but here's a quick start that gets you the Ptah editor running locally on your machine.

#### Install and run
* `yarn install`
* `yarn cjs`
* `gulp locale_sync`
* `gulp public-image`
* `yarn build`

#### Feature Requests and support

If you have an idea of how to improve Ptah or have general feedback, you're welcome to submit a [feature request](/../../issues/new?labels=type%3A+feature+request&template=2-feature_request.md).

Chances are, you like what we have already but you may require a custom integration, a special license or something else big and specific to your needs that our community may not benefit from. We're generally open to such conversations.

If you have a question and can't find the answer yourself, you can [raise an issue](/../../issues/new) and describe what exactly you're trying to do. We'll do our best to reply in a meaningful time.

---

Cross-browser testing provided by:

<a rel="nofollow" target="_blank" href="http://browserstack.com"><img width="150" height="32" src="https://github.com/ProtocolONE/ptah-editor/blob/develop/public/img/browserstack-logo.svg" alt="BrowserStack"></a>
