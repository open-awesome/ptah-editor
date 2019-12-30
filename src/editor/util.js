import * as _ from 'lodash-es'
import * as types from './types'

export function isValidUrl(url) {
  let pattern = new RegExp(/(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?/i)

  if (pattern.test(url)) {
    return true
  } else {
    return false
  }
}

export function isObject(obj) {
  return obj && typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

export function isParentTo(target, parent) {
  let currentNode = target
  while (currentNode !== null) {
    if (currentNode === parent) return true
    currentNode = currentNode.parentNode
  }
  return false
}

export function composedPath (el) {

  var path = [];

  while (el) {

    path.push(el);

    if (el.tagName === 'HTML') {

      path.push(document);
      path.push(window);

      return path;
    }

    el = el.parentElement;
  }
}

/**
 *
 * @param {String} target
 * @param {Object} schema
 */
export function getTypeFromSchema(target, schema) {
  const tempTarget = target.split('.')
  tempTarget.shift()
  const value = _.get(schema, tempTarget.join('.'))

  if (value === types.Text) return 'text'
  if (value === types.Slogan) return 'text'
  if (value === types.Button) return 'button'
  if (value === types.ClassList) return 'section'
  if (value === types.StyleObject) return 'section'
  if (value === types.Delimiter) return 'delimiter'
  if (value === types.SystemRequirements) return 'section'
  if (value === types.TextInherit) return 'inline'
  if (value === types.IconWithText) return 'iconWithText'
  if (value === types.VideoElement) return 'video'

  return null
}

export function getImageBlob(URL) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', URL)
    xhr.responseType = 'blob'

    xhr.onload = function () {
      const imageBlob = this.response
      const fileType = this.response.type.split('/')[1].split('+')[0]
      const randomNumber = new Date().getUTCMilliseconds()
      const filename = `image-${randomNumber}.${fileType}`
      resolve({ blob: imageBlob, name: filename })
    }
    xhr.send(null)
  })
}

export function getTypeFromTagName(tagName) {
  tagName = tagName.toUpperCase()
  switch (tagName) {
    case 'H1':
      return 'inline'
    case 'H2':
      return 'inline'
    case 'H3':
      return 'inline'
    case 'H4':
      return 'inline'
    case 'H5':
      return 'inline'
    case 'H6':
      return 'inline'
    case 'P':
      return 'inline'
    case 'B':
      return 'inline'
    case 'SPAN':
      return 'inline'
    case 'BUTTON':
      return 'button'
    case 'A':
      return 'button'
    case 'SECTION':
      return 'section'
    case 'HEADER':
      return 'section'
    default:
      break
  }
}

export function cleanDOM(artboard) {
  const classes = ['is-editable', 'is-mobile', 'is-tablet', 'is-desktop']

  const nodes = `
    .b-uploader-item,
    .b-uploader,
    .styler,
    .b-section-menu,
    .ptah-control,
    .pth-resizer,
    .pth-uploader,
    .b-button__resize,
    .b-delimiter__resize,
    .b-video__resize,
    .b-slot__settings,
    .b-section-menu__controls
  `

  classes.forEach((className) => {
    let editables = Array.from(artboard.querySelectorAll('.' + className))

    if (editables.length > 0) {
      editables.forEach((el) => {
        el.contentEditable = 'inherit'
        el.classList.remove(className)
      })
    }
  })

  Array.from(artboard.querySelectorAll(nodes)).forEach(el => el.remove())
}

export function randomPoneId() {
  return `pone${Math.random().toString().substring(2, 7)}`
}

/**
 * Return template of scoped style for el
 * @param poneId
 * @param data {Object} Like:
 *  {
 *    'hover': {
 *      'background-color': '#f2f3f6',
 *      'color': '#000000'
 *    }
 *  }
 * @returns {string}
 */
export function getPseudoTemplate (poneId, data) {
  let content = ''
  _.forEach(data, (styles, pseudo) => {
    let acc = ''
    _.forEach(styles, (value, style) => {
      acc += `${style}: ${value};`
    })
    content += `[data-pone="${poneId}"]:${pseudo} {
      ${acc}
    }`
  })

  return `<style type="text/css" id="${poneId}">${content}</style>`
}

/**
 * Return template of text links
 * @param poneId
 * @param data
 * @returns {string}
 */
export function getLinkStyles (poneId, data) {
  let content = ''
  let a = ''
  let hover = ''
  _.forEach(data.a, (value, style) => {
    a += `${style}: ${value};`
  })

  content += `[data-pone="${poneId}"] a {
      ${a}
  }`

  _.forEach(data.hover, (value, style) => {
    hover += `${style}: ${value};`
  })

  content += `[data-pone="${poneId}"] a:hover {
      ${hover}
  }`

  return `<style type="text/css" id="${poneId}-link">${content}</style>`
}

/**
 * Return Google site tag template
 * @param tag
 */
export function gtagSetup(tag) {
  if (tag === '') return tag
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${tag}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${tag}');
          </script>
          `
}

/**
 * Swap array elements
 * @param _arr
 * @param _param {Array} - [index, newIndex]
 */
export function correctArray (_arr, _param) {
  _arr[_param[1]] = _arr.splice(_param[0], 1, _arr[_param[1]])[0]
}

/**
 * Retrives youtubeId from youtube video url
 * Example: https://www.youtube.com/watch?v=Xv1JzYDKoc8 -> Xv1JzYDKoc8
 *
 * @param {String} url
 * @return {String}
 */
export function getYoutubeVideoIdFromUrl (url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

export function placeCaretAtEnd (el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
    && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

/**
 * Set cookie
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options -> { path, domain, secure }
 *
 * path -> path for cookie
 * domain -> domain for cookie
 * secure -> secure policy
 */
export function setCookie (name, value, options = {}) {
  let expires = options.expires

  if (expires && typeof expires === 'number' && expires instanceof Number) {
    let date = new Date()
    date.setTime(date.getTime() + expires * 1000)
    expires = options.expires = date
    if (expires.toUTCString) {
      options.expires = expires.toUTCString()
    }
  }

  let updatedCookie = `${name}=${encodeURIComponent(value)}`

  for (let propName in options) {
    updatedCookie += `; ${propName}`
    let propValue = options[propName]
    if (propValue !== true) {
      updatedCookie += `=${propValue}`
    }
  }

  document.cookie = updatedCookie
}

/**
 * Get cookie
 *
 * @param {String} name
 */
export function getCookie (name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : null
}

/**
 * Delete cookie
 *
 * @param {String} name
 */
export function deleteCookie (name) {
  void setCookie(name, '', { expires: -1 })
}

export function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function resetIndents () {
  setTimeout(() => {
    let frame = document.getElementById('artboard')
    let sections = Array.from(frame.children)

    sections.forEach((section) => {
      section.style.top = '0px'
      section.style.marginBottom = '0px'
      section.style.paddingBottom = '0px'
    })
  }, 200)
}

export function elemtentList () {
  return {
    button: {
      name: 'Button',
      element: types.Button,
      type: 'button',
      label: 'button'
    },
    text: {
      name: 'TextElement',
      element: types.Text,
      type: 'text',
      label: 'text'
    },
    pic: {
      name: 'Pic',
      element: types.Image,
      type: 'image',
      label: 'pic'
    },
    logo: {
      name: 'Logo',
      element: types.Logo,
      type: 'image',
      label: 'logo'
    },
    delimiter: {
      name: 'Delimiter',
      element: types.Delimiter,
      type: 'delimiter',
      label: 'delimiter'
    },
    platforms: {
      name: 'AvailablePlatforms',
      element: types.AvailablePlatforms,
      type: 'available',
      label: 'available platforms'
    },
    restrictions: {
      name: 'AgeRestrictions',
      element: types.AgeRestrictions,
      type: 'restrictions',
      label: 'age restrictions'
    },
    social: {
      name: 'SocialNetworks',
      element: types.SocialNetworks,
      type: 'networks',
      label: 'social networks'
    },
    slogan: {
      name: 'Slogan',
      element: types.Slogan,
      type: 'slogan',
      label: 'slogan'
    },
    icontext: {
      name: 'IconWithText',
      element: types.IconWithText,
      type: 'iconWithText',
      label: 'icon with text'
    },
    video: {
      name: 'VideoElement',
      element: types.VideoElement,
      type: 'video',
      label: 'video'
    },
    timer: {
      name: 'Timer',
      element: types.Timer,
      type: 'timer',
      label: 'timer'
    }
  }
}

export const FONT_SIZES_LIST = [
  { name: '12px', value: '1.2rem' },
  { name: '14px', value: '1.4rem' },
  { name: '16px', value: '1.6rem' },
  { name: '18px', value: '1.8rem' },
  { name: '20px', value: '2rem' },
  { name: '24px', value: '2.4rem' },
  { name: '28px', value: '2.8rem' },
  { name: '30px', value: '3rem' },
  { name: '32px', value: '3.2rem' },
  { name: '36px', value: '3.6rem' },
  { name: '40px', value: '4rem' },
  { name: '44px', value: '4.4rem' },
  { name: '48px', value: '4.8rem' },
  { name: '52px', value: '5.2rem' },
  { name: '56px', value: '5.6rem' },
  { name: '64px', value: '6.4rem' },
  { name: '72px', value: '7.2rem' }
]

export const LINES_HEIGHT_LIST = [
  { name: '1', value: '1' },
  { name: '1.1', value: '1.1' },
  { name: '1.2', value: '1.2' },
  { name: '1.3', value: '1.3' },
  { name: '1.4', value: '1.4' },
  { name: '1.5', value: '1.5' },
  { name: '1.6', value: '1.6' },
  { name: '1.7', value: '1.7' },
  { name: '1.9', value: '1.9' },
  { name: '1.8', value: '1.8' },
  { name: '2', value: '2' },
  { name: '2.4', value: '2.4' },
  { name: '2.8', value: '2.8' },
  { name: '3', value: '3' }
]

export const FONTS_LIST = [
  'Lato',
  'Montserrat',
  'Heebo',
  'PT Serif',
  'Roboto',
  'Cinzel',
  'IBM Plex Sans',
  'IBM Plex Mono'
]

