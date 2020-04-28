import * as types from './types'
import { isObject } from './util'
import * as _ from 'lodash-es'

const DEF_MARG_PADD = {
  'margin-top': 0,
  'margin-bottom': 0,
  'margin-left': 0,
  'margin-right': 0,
  'padding-top': 0,
  'padding-bottom': 0,
  'padding-left': 0,
  'padding-right': 0
}

const DEFAULT_OPTIONS = {
  text: '',
  classes: [],
  styles: _.merge({}, DEF_MARG_PADD),
  resizable: false,
  hasLink: false,
  belongsGallery: false,
  link: {
    href: '#',
    target: '_blank',
    behavior: 'auto',
    action: ''
  },
  textLinkStyles: false, // styling links in text
  removable: false,
  aligned: false,
  typography: false,
  colorize: false,
  box: false, // (align text or align flex justify-content)
  canCopy: false,
  background: false,
  shape: false, // border-radius prop
  pseudo: false, // can have a pseudo-class
  isHoverAnim: false, // hover anim for button/link
  video: false,
  copyStyles: true,

  // --- Background type
  // --- variants: 'default' (default css background), 'video' (video background)
  backgroundType: 'default',

  // --- background video
  backgroundVideo: null,

  absorb: 0,
  media: {
    'is-mobile': _.merge({}, DEF_MARG_PADD)
  }
}

/**
 * Deprecated types:
 * Logo, Avatar, Quote, Number, ClassList, Title
 * @type {Map}
 */
const data = new Map([
  [types.Text, () => (_.merge({}, DEFAULT_OPTIONS, {
    text: 'Enter your text',
    removable: true,
    aligned: true,
    typography: true,
    styles: {
      'font-size': '1.6rem',
      'line-height': '1.4',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'text-align': 'center',
      'color': '#9B9B9B',
      'justify-content': 'center',
      'margin-top': '8px',
      'margin-bottom': '8px',
      'margin-left': '0',
      'margin-right': '0'
    },
    editor: {
      tags: true,
      styles: true,
      link: true
    },
    textLinkStyles: {
      a: {
        'color': 'rgb(255, 109, 100)',
        'text-decoration': 'underline'
      },
      hover: {
        'color': 'rgb(255, 109, 100)',
        'text-decoration': 'none'
      },
      openNewWindow: true
    },
    media: {
      'is-mobile': {
        'font-size': '1.6rem',
        'margin-top': '4px',
        'margin-bottom': '4px',
        'margin-left': '8px',
        'margin-right': '8px'
      }
    }
  }))],
  [types.Image, () => (_.merge({}, DEFAULT_OPTIONS, {
    resizable: true,
    removable: true,
    alt: 'Default image',
    link: {
      href: '',
      target: '_blank',
      type: 'default',
      videoUrl: '',
      imageUrl: ''
    },
    background: true,
    styles: {
      'background-image': 'url(https://s3.protocol.one/src/o_OIgnu.png)',
      'background-position': '50% 50%',
      'background-repeat': 'no-repeat',
      'background-size': 'contain',
      'background-color': 'rgba(0, 0, 0, 0)',
      'width': '256px',
      'height': '160px'
    },
    media: {
      'is-mobile': {
        'width': '130px',
        'height': '80px',
        'margin-top': '4px',
        'margin-bottom': '4px',
        'margin-left': '8px',
        'margin-right': '8px'
      }
    }
  }))],
  [types.Logo, () => (_.merge({}, DEFAULT_OPTIONS, {
    resizable: true,
    removable: true,
    alt: 'Default logo',
    hasLink: false,
    link: {
      href: '',
      target: '_blank'
    },
    background: true,
    styles: {
      'background-image': 'url(https://s3.protocol.one/src/o_OIgnu.png)',
      'background-position': '50% 50%',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-color': 'rgba(0, 0, 0, 0)',
      'width': '256px',
      'height': '160px'
    },
    media: {
      'is-mobile': {
        'width': '130px',
        'height': '80px',
        'margin-top': '4px',
        'margin-bottom': '4px',
        'margin-left': '8px',
        'margin-right': '8px'
      }
    }
  }))],
  [types.StyleObject, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      resizable: true,
      removable: true,
      background: true,
      absorb: 0,
      styles: {
        'background-image': '',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-color': 'rgba(0,0,0,0)',
        'background-attachment': 'scroll',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center'
      },
      overlay: {
        color: 'rgba(0,0,0,1)',
        opacity: '0'
      },
      width: null,
      maxWidth: null,
      minWidth: null,
      grow: false,
      media: {
        'is-mobile': {
          'flex-direction': 'column'
        }
      },
      parallax: false
    })
  )],
  [types.Button, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      box: true,
      canCopy: true,
      hasLink: true,
      aligned: false,
      typography: true,
      background: true,
      shape: true,
      resizable: true,
      pseudo: {
        hover: {
          'background-color': '',
          'background-image': '',
          'background-position': '50% 50%',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'color': '',
          'border-color': '#fff',
          'border-width': '0px',
          'border-style': 'solid'
        }
      },
      text: 'Click Me!',
      isHoverAnim: true,
      animation: {
        value: ''
      },
      link: {
        href: '',
        target: '_blank'
      },
      removable: true,
      styles: {
        'background-image': '',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-color': '',
        'color': '#000',
        'font-size': '1.6rem',
        'line-height': '1.4',
        'border-radius': 0,
        'border-color': '#fff',
        'border-width': '0px',
        'border-style': 'solid',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'justify-content': 'center',
        'align-items': 'center',
        'text-align': 'center',
        'width': '256px',
        'height': '64px'
      },
      editor: {
        tags: false,
        styles: true,
        link: false
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'width': '160px',
          'height': '64px',
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px'
        }
      }
    })
  )],
  [types.IconWithText, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      aligned: true,
      removable: true,
      typography: true,
      styles: {
        'text-align': 'left',
        'font-size': '1.4rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'color': '#fff'
      },
      isIconWithText: true,
      colorFill: {
        color:  '#fff'
      },
      sizeIcons: {
        width: 14
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Default icon text',
        visible: true
      },
      editor: {
        tags: false,
        styles: true,
        link: false
      },
      media: {
        'is-mobile': {
          'font-size': '1.4rem',
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px'
        }
      }
    })
  )],
  [types.ToggleElement, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      box: false,
      aligned: true,
      typography: true,
      removable: true,
      styles: {
        'font-size': '1.2rem',
        'line-height': '1.4',
        'justify-content': 'flex-start',
        'margin-bottom': '16px',
        'text-align': 'left'
      },
      editor: {
        tags: true,
        styles: true,
        link: false
      },
      sizeIcons: {
        width: 14
      },
      el: {
        color:  '#fff',
        icon: {
          value: 'checkMark',
          name: 'checkMark'
        },
        isIconVisible: true,
        isTextVisible: false,
        content: `
          <table>
            <tr >
              <th>When will open game testing begin?</th>
            </tr>
            <tr>
              <td>
                <p>The start date of the open test will be announced later. Follow the news in the official communities to stay up to date!</p>
              </td>
            </tr>
          </table>
         `
      },
      media: {
        'is-mobile': {
          'font-size': '1.2rem',
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px'
        }
      }
    })
  )],
  [types.Gallery, () => (_.merge({}, DEFAULT_OPTIONS, {
    hasGallery: true,
    background: true,
    count: 3,
    styles: {
      'background-image': '',
      'background-position': '50% 50%',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-color':''
    },
    overlay: {
      color: 'rgba(0,0,0,1)',
      opacity: '0'
    },
    textStyles: {
      chapter: {
        'font-size': '3.6rem',
        'color': 'rgba(255, 255, 255, 1)'
      },
      text: {
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 1)'
      }
    },
    isChapter: false,
    isChapterStyle: false,
    isTextStyle: false,
    isLabelPreview: false,
    isLabel: false,
    isTop:  false,
    isTopPopup:  false,
    isBottom:  false,
    isBottomPopup:  false,
    media: {
      'is-mobile': {
        'textStyles': {
          'chapter': {
            'color': 'rgba(255, 255, 255, 1)',
            'font-size': '3.6rem'
          },
          'text': {
            'color': 'rgba(255, 255, 255, 1)',
            'font-size': '1.6rem'
          }
        }
      }
    }
  }))],
  [types.Columns, () => (_.merge({}, DEFAULT_OPTIONS, {
    background: true,
    count: 2,
    styles: {
      'background-image': '',
      'background-position': '50% 50%',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-color':'',
      'align-items': 'flex-start'
    },
    overlay: {
      color: 'rgba(0,0,0,1)',
      opacity: '0'
    }
  }))],
  [types.Delimiter, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      resizable: true,
      removable: true,
      styles: {
        'width': '',
        'height': ''
      },
      media: {
        'is-mobile': {
          'width': '32px',
          'height': '32px'
        }
      }
    })
  )],
  [types.VideoElement, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      background: false,
      hasVideo: true,
      removable: true,
      resizable: true,
      shape: false,
      settings: {
        loop: false,
        autoplay: false,
        rel: false,
        controls: true,
        url: 'https://www.youtube.com/watch?v=Xv1JzYDKoc8'
      },
      styles: {
        'width': '',
        'height': ''
      },
      media: {
        'is-mobile': {
          'width': '278px',
          'height': '152px'
        }
      }
    })
  )],
  [types.IframeElement, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      removable: true,
      resizable: true,
      settings: {
        url: 'https://ptah.super.com/'
      },
      styles: {
        'width': '278px',
        'height': '152px'
      },
      media: {
        'is-mobile': {
          'width': '278px',
          'height': '152px'
        }
      }
    })
  )],
  [types.Form, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      resizable: false,
      removable: false,
      form: true,
      placeholder: 'Placeholder',
      buttonText: 'Submit',
      styles: {
        'color': '#000',
        'border-radius': '2px',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-size': '1.6rem',
        'line-height': '1.4',
        'text-decoration': 'none'
      },
      formStyles: {
        'inputBgColor': '#fff',
        'button-color': '#f76a67',
        'buttonHoverColor': '#f76a67',
        'buttonTextColor': '#000',
        'buttonHoverTextColor': '#000',
        'height': 48,
        'border-radius': '3'
      },
      editor: {
        tags: false,
        styles: true,
        link: false
      },
      media: {
        'is-mobile': {
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px',
          formStyles: {
            'height': 48,
          }
        }
      }
    })
  )],
  /* === Custom sections === */
  [types.ProductSection, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      box: true,
      resizable: true,
      removable: true,
      background: true,
      hasProducts: true,
      products: {
        'Standart': { visible: true },
        'Full': { visible: true },
        'Deluxe': { visible: true },
        'Ultimate': { visible: true }
      },
      selectProduct: {
        name: 'Standart'
      },
      overlay: {
        color: 'rgba(0,0,0,1)',
        opacity: '0'
      },
      itemHoverColor: '#fff'
    })
  )],
  [types.GallerySlider, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      resizable: true,
      removable: true,
      background: true,
      hasMultipleImages: true,
      hasHeader: true,
      galleryImages: [],
      header: 'This is a short header',
      overlay: {
        color: 'rgba(0,0,0,1)',
        opacity: '0'
      },
      // --- swiper options
      swiper: {
        init: true,
        loop: true,
        frameWidth: 12,
        simulateTouch: true,
        pagination: {
          type: 'bullets',
          clickable: true
        },
        showNavigation: true,
        showPagination: true,
        navSize: '20px'
      }
    })
  )],
  [types.BannerSection, () => (_.merge({}, DEFAULT_OPTIONS,
      {
        resizable: true,
        removable: true,
        background: true,
        bannerSection: true,
        hasHeader: true,
        overlay: {
          color: 'rgba(0,0,0,1)',
          opacity: '0'
        },
        count: 3,
        // --- swiper options
        swiper: {
          init: true,
          loop: true,
          simulateTouch: true,
          pagination: {
            type: 'bullets',
            clickable: true
          },
          showNavigation: true,
          showPagination: true,
          navSize: '8px'
        }
      })
  )],
  [types.AvailablePlatforms, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      removable: true,
      background: true,
      styles: {
        'background-image': '',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-color': ''
      },
      hasPlatforms: true,
      availablePlatforms: {
        'windows': {
          name: 'Windows',
          visible: true
        },
        'apple': {
          name: 'Apple',
          visible: true
        },
        'linuxfull': {
          name: 'Linux',
          visible: true
        },
        'steam': {
          name: 'Steam',
          visible: true
        },
        'gog': {
          name: 'GOG Galaxy',
          visible: true
        }
      },
      colorFill: {
        color:  '#fff'
      },
      sizeIcons: {
        width: 24
      },
      media: {
        'is-mobile': {
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px',
          sizeIcons: {
            width: 24
          }
        }
      }
    })
  )],
  [types.AgeRestrictions, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      removable: true,
      background: true,
      styles: {
        'background-image': '',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-color': ''
      },
      hasRestrictions: true,
      ageRestrictions: {
        'age': {
          name: 'Age',
          visible: true,
          selected: { name: '0+', img: 'https://s3.protocol.one/src/o_20S5qo.svg' },
          options: [
            { name: '0+', img: 'https://s3.protocol.one/src/o_20S5qo.svg' },
            { name: '6+', img: 'https://s3.protocol.one/src/o_1KX2IR.svg' },
            { name: '12+', img: 'https://s3.protocol.one/src/o_DNNg8.svg' },
            { name: '18+', img: 'https://s3.protocol.one/src/o_1AgXj1.svg' },
            { name: '21+', img: 'https://s3.protocol.one/src/o_299afp.svg' }
          ]
        },
        'pegi': {
          name: 'Pegi',
          visible: false,
          selected: { name: '3', img: 'https://s3.protocol.one/src/o_13iwpA.svg' },
          options: [
            { name: '3', img: 'https://s3.protocol.one/src/o_13iwpA.svg' },
            { name: '7', img: 'https://s3.protocol.one/src/o_vuop.svg' },
            { name: '12', img: 'https://s3.protocol.one/src/o_1S1h6M.svg' },
            { name: '16', img: 'https://s3.protocol.one/src/o_ANYUX.svg' },
            { name: '18', img: 'https://s3.protocol.one/src/o_Xqb9n.svg' }
          ]
        },
        'usk': {
          name: 'USK',
          visible: false,
          selected: { name: '0', img: 'https://s3.protocol.one/src/o_1g38pS.svg' },
          options: [
            { name: '0', img: 'https://s3.protocol.one/src/o_1g38pS.svg' },
            { name: '6', img: 'https://s3.protocol.one/src/o_25hRrV.svg' },
            { name: '12', img: 'https://s3.protocol.one/src/o_amDyU.svg' },
            { name: '16', img: 'https://s3.protocol.one/src/o_amDyU.svg' },
            { name: '18', img: 'https://s3.protocol.one/src/o_x4V42.svg' }
          ]
        },
        'cero': {
          name: 'CERO',
          visible: false,
          selected: { name: 'All ages', img: 'https://s3.protocol.one/src/o_sazoN.svg' },
          options: [
            { name: 'All ages', img: 'https://s3.protocol.one/src/o_sazoN.svg' },
            { name: 'Ages 12 and up only', img: 'https://s3.protocol.one/src/o_zwWo0.svg' },
            { name: 'Ages 15 and up only', img: 'https://s3.protocol.one/src/o_qfcL4.svg' },
            { name: 'Ages 17 and up only', img: 'https://s3.protocol.one/src/o_FHJmm.svg' },
            { name: 'Ages 18 and up only', img: 'https://s3.protocol.one/src/o_4FtnT.svg' },
            { name: 'Education/Database', img: 'https://s3.protocol.one/src/o_18ADS5.svg' },
            { name: 'Rating pending', img: 'https://s3.protocol.one/src/o_1b7UOI.svg' }
          ]
        }
      },
      sizeIcons: {
        width: 48
      },
      media: {
        'is-mobile': {
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px',
          sizeIcons: {
            width: 32
          }
        }
      }
    })
  )],
  [types.SocialNetworks, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      removable: true,
      settings: {
        target : '_blank'
      },
      background: true,
      styles: {
        'background-image': '',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-color': ''
      },
      hasNetworks: true,
      socialNetworks: {
        'facebook': {
          name: 'Facebook',
          expand: false,
          visible: true,
          url: ''
        },
        'instagram': {
          name: 'Instagram',
          expand: false,
          visible: true,
          url: ''
        },
        'vk': {
          name: 'Vk',
          expand: false,
          visible: false,
          url: ''
        },
        'twitter': {
          name: 'Twitter',
          expand: false,
          visible: false,
          url: ''
        },
        'youtube': {
          name: 'Youtube',
          expand: false,
          visible: true,
          url: ''
        },
        'discord': {
          name: 'Discord',
          expand: false,
          visible: false,
          url: ''
        },
        'kickstarter': {
          name: 'Kickstarter',
          expand: false,
          visible: false,
          url: ''
        },
        'wechat': {
          name: 'Wechat',
          expand: false,
          visible: false,
          url: ''
        }
      },
      colorFill: {
        color:  '#fff'
      },
      sizeIcons: {
        width: 24
      },
      media: {
        'is-mobile': {
          'margin-top': '4px',
          'margin-bottom': '4px',
          'margin-left': '8px',
          'margin-right': '8px',
          sizeIcons: {
            width: 24
          }
        }
      }
    })
  )],
  [types.Slogan, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      resizable: true,
      removable: true,
      background: true,
      text: 'Enter game slogan',
      aligned: true,
      typography: true,
      styles: {
        'font-size':  '4.8rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'text-align': 'center',
        'color': '#fff',
        'background-image': 'url(https://s3.protocol.one/src/o_1PRuEc.png)',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'background-color': 'rgba(0, 0, 0, 0)',
        'justify-content': 'center',
        'width': 320,
        'height': 64,
        'border-radius': 0
      }
    })
  )],
  [types.SystemRequirements, () => (_.merge({}, DEFAULT_OPTIONS,
    {
      name: 'System Requirements',
      removable: true,
      background: true,
      hasSystemRequirements: true,
      systemRequirements: {
        'windows': {
          visible: true,
          hideTextTitle: false
        },
        'apple': {
          visible: true,
          hideTextTitle: false
        },
        'linux': {
          visible: false,
          hideTextTitle: false
        }
      },
      rowsRequirements: {
        'OS': { visible: true },
        'Processor': { visible: true },
        'Memory': { visible: true },
        'Graphics': { visible: true },
        'Direct X': { visible: true },
        'Storage': { visible: true },
        'Sound Card': { visible: false }
      },
      selectPlatform: {
        name: 'apple'
      },
      colorIcons: {
        default:  '#000',
        active:  '#fff'
      },
      sizeIcons: {
        width: 32
      },
      table: {
        head: {
          'font-size': '1.4rem',
          'line-height': '1.4',
          'font-weight': 'normal',
          'font-style': 'normal',
          'text-decoration': 'none',
          'color': 'rgba(0, 0, 0, 0.26)',
          'background-color': '#C4EDCD'
        },
        body: {
          'font-size': '1.4rem',
          'line-height': '1.4',
          'font-weight': 'normal',
          'font-style': 'normal',
          'text-decoration': 'none',
          'color': 'rgba(0, 0, 0, 0.5)',
          'background-color': '#fff'
        }
      },
      typography: false,
      styles: {
        'background-image': '',
        'background-position': '50% 50%',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-color':'',
        'font-size':  '1.6rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'text-align': 'center',
        'color': '#fff'
      },
      overlay: {
        color: 'rgba(0,0,0,1)',
        opacity: '0'
      },
      media: {
        'is-mobile': {
          sizeIcons: {
            width: 24
          },
          table: {
            head: {},
            body: {}
          }
        }
      }
    })
  )],
  [types.TextInherit, () => (_.merge({}, DEFAULT_OPTIONS, {
    text: 'Enter your text'
  }))],
  [types.Timer, () => (_.merge({}, DEFAULT_OPTIONS, {
    removable: true,
    timer: {
      // --- timer timestamp
      timestamp: null,
      // --- current UTC offset
      UTC: new Date().getTimezoneOffset() / 60 * (-1),
      // --- labels options
      labels: {
        // --- show labels
        show: true,
        // --- labels translation
        language: 'en',
        // --- labels position
        position: 'bottom'
      },
      colorTile: 'rgba(0, 0, 0, 0)'
    },
    typography: true,
    styles: {
      'background-color':'rgba(0, 0, 0, 0)',
      'font-size':  '3.2rem',
      'line-height': '1.4',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'text-align': 'center',
      'color': '#fff',
      'margin-top': '16px',
      'margin-bottom': '32px'
    },
    media: {
      'is-mobile': {
        'margin-top': '4px',
        'margin-bottom': '16px',
        'margin-left': '8px',
        'margin-right': '8px',
        'font-size': '2.4rem'
      }
    }
  }))]
])

export default class Seeder {
  // Seeds values using a schema.
  static seed(schema) {
    if (isObject(schema)) {
      return Object.keys(schema).reduce((values, key) => {
        values[key] = Seeder.seed(schema[key])
        return values
      }, {})
    } else if (Array.isArray(schema)) {
      return schema.map(s => {
        return Seeder.seed(s)
      })
    }

    let value = data.get(schema)

    if (value === undefined) {
      value = schema
    }
    return typeof value === 'function' ? value() : value
  }
};
