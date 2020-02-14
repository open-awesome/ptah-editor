import JSZip from 'jszip'
import saveAs from 'save-as'
import {
  getImageBlob,
  cleanDOM,
  gtagSetup,
  getFontsNameStr,
  getFontsLanguages,
  getFontsSetup,
  getScrollSetup,
  getParallaxSetup,
  getJquerySetup,
} from '../util'

/**
 * Adds a service worker that caches the static assets.
 */
function createSW (output, { images = [] } = {}) {
  output.file('sw.js', `
    const staticCacheName = 'bbuilder-static-v1';

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
          return cache.addAll([
            '/',
            '/assets/js/main.js',
            ${images.map(i => "'/public/image/" + i.name + "'").join(',').trim(',')}
          ]);
        })
      );
    });

    function serveAsset(request) {
      return caches.open(staticCacheName).then(function(cache) {
        return cache.match(request).then(function(response) {
          if (response) return response;

          return fetch(request).then(function(networkResponse) {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      });
    }

    self.addEventListener('fetch', function(event) {
      const requestUrl = new URL(event.request.url);

      if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
          event.respondWith(caches.match('/'));
          return;
        }
        if (requestUrl.pathname.startsWith('/public/')) {
          event.respondWith(serveAsset(event.request));
          return;
        }
      }

      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });
  `)

  const scripts = output.folder('assets/js')
  scripts.file('main.js', `
    function registerSW () {
      if (!navigator.serviceWorker) return;
      if (location.protocol !== 'http:' || location.protocol !== 'https:') return;
      navigator.serviceWorker.register('/sw.js').then(function (reg) {
        console.log('SW registered!');
      });
    }

    registerSW();
  `)
}

/**
 * Adds some PWA features.
 */
function createPWA (output, payload) {
  createSW(output, payload)
}

function getFile(path) {
  return new Promise((resolve) => {
    const assetsClient = new XMLHttpRequest()
    assetsClient.open('GET', path)
    assetsClient.onload = function () {
      resolve(this.response)
    }
    assetsClient.send(null)
  })
}

function download (assets) {
  const frag = this.outputFragment()
  const artboard = frag.querySelector('#artboard')
  const title = this.settings.title
  const zip = new JSZip()
  const output = zip.folder('project')
  const [jsFolder, cssFolder] = [output.folder('js/'), output.folder('css/')]
  const manifest = this.getManifest()
  const urls = [assets.css, assets.js]

  Promise.all(urls.map(getFile))
    .then((content) => {
      cssFolder.file('styles.css', content[0])
      jsFolder.file('cjs.js', content[1])
      return content
    })
    .then(() => {
      return output.file('manifest.json', manifest)
    })
    .then(() => {
      cleanDOM(frag)
      let bodyStyles = this.getBodyStyles()
      let video = this.settings.video ? this.getVideoBg(this.settings.video) : ''
      let og = this.settings.ogTags ? this.getOgMetaTags(this.settings.ogTags) : ''
      let icon = this.settings.favicon
      let scrollSetup = getScrollSetup(this.settings.fullPageScroll)
      let customCss = this.getCustomCss()
      let gtm = this.gtmSetup(this.settings.gtmId)
      let gtag = gtagSetup(this.settings.gtag)
      let script = this.settings.script ? this.settings.script : ''
      let fontsNameStr = getFontsNameStr(this.settings.fonts)
      let fontsLanguages = getFontsLanguages(this.settings.fonts)
      let fontsSetup = getFontsSetup(this.settings.setupFonts)
      let getJquery = getJquerySetup(getParallaxSetup(this.sections), this.settings.fullPageScroll)
      let parallaxSetup = getParallaxSetup(this.sections)

      output.file('index.html',
        `<!DOCTYPE html>
          <html>
          <head>
            ${gtm.head}
            ${gtag}
            <title>${title}</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="shortcut icon" href="${icon}"/>
            <link rel="manifest" href="/manifest.json">
            <link rel="stylesheet" href="css/styles.css"> 
            <link href="https://fonts.googleapis.com/css?family=${fontsNameStr}&display=swap&subset=${fontsLanguages}" rel="stylesheet">
            ${scrollSetup.style}
            ${og}
            <style>
              ${customCss}
            </style>
          </head>
          <body class="b-body_export" style="${bodyStyles}">
            ${gtm.body}
            <div id="main" class="main" style="${fontsSetup}">
              ${artboard.innerHTML}
            </div>
            ${video}
            ${this.getCookiesPreview()}
          ${getJquery}
          ${scrollSetup.setup}
          ${parallaxSetup}
          <script>
            ${script}
          </script>
          <script src="js/cjs.js"></script>
          </body>
        </html>`)

      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${this.settings.name}.zip`)
      })
    })
}

export default function install ({ builder }) {
  builder.download = download
};
