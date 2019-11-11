# Ptah editor documentation

#### This is just a start. Proper docs will appear here with time.
Please report all your [questions as issues](/../../issues/new) for now, so we have a clearer idea on what kind of docs to focus on and how verbose our docs need to be.

## Ptah - Vue.js-based landing page builder
![ptah vue.js website builder](/docs/ptah-editor.gif)
Ptah enables marketing experts and designers to produce landing pages without any programmer assitance. We’ve developed Ptah to be an intuitive tool for creating landing pages where customers can buy and pre-order digital goods and provide leads.

We created Ptah for internal use, and we were able to open source it under a friendly and popular [Apache-2.0 license](/../develop/LICENSE). If you're curious about the context, [here's a blog post at dev.to](https://dev.to/tooevangelist/how-to-open-source-the-company-s-internal-tech-bg0) just about what we're doing and why.

#### Ptah overview:
* Built with Vue.js
* Try out a [demo of Ptah editor](https://ptah.super.com/) that runs on Amazon Cloud
* Check out [a landing page built with Ptah](https://ptah.super.com/) for demo purposes
* Ptah is free and open source under [Apache-2.0 license](/../develop/LICENSE)
* Produces ready to deploy [PWA projects](https://developers.google.com/web/progressive-web-apps/)
* * There's an 'Export' button on the top right corner of our demo to see the exported PWA
* Can be used as a standalone tool or intergrated into your CMS
* Ships with a library of built-in templates that you can extend
* * All our templates feature responsive design out of the box and are mobile-friendly
* Contains multiple ready to use [building blocks](/src/components/sections) 
* * Each building block (a 'section') can be additionally tweaked to your needs and taste
* * Sections support drag-n-drop and live edits

# Getting Started

Ptah can be used as a separate product or as an editor inside a CMS to empower less technical users to create modern and fast landing pages for games or e-commerce.

#### As a first step you're welcome to build Ptah and see what's possible. 

## Install and run
* `yarn install`
* `yarn cjs`
* `gulp locale_sync`
* `gulp public-image`
* `yarn build`

At this point you have a functional Ptah editor that allow you to edit a template and do most things Ptah can do. Very similar to [our provided demo](https://ptah.super.com/), but on your local machine.

However, you cannot export a PWA yet, since you're not logged in. You need to set up a [thin backend](/develop/backend) and this may require quite a bit of setting up. We have a dedicated document to [Ptah backend](backend.md) for your convenience.

## Next steps

Now that you have Ptah up and running, perhaps do see [CONTRIBUTING.md](/CONTRIBUTING.md) and consider contributing. All questions, support and feature requests can be [submitted as an issue]/../../issues/new).

A good excersise to get yourself familiar with Ptah code is to add a new section. Start by copying one of the [existing sections](/src/components/sections) and then follow the code in [vuse.js](/src/editor/vuse.js) to see what's happening


---
