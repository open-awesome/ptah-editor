import Swiper from 'swiper'
import swiperOptions from '../editor/swiper'

const SWIPER_CONTAINERS = document.querySelectorAll(swiperOptions.container)

export function initGallery () {
  SWIPER_CONTAINERS.forEach(el => {
    try {
      el.querySelector('.swiper-button-disabled').classList.remove('swiper-button-disabled')
    } catch (e) {}

    let options = JSON.parse(el.dataset.options || '{}')
    new Swiper(el, Object.assign(options, {
      on: {
        transitionEnd () {
          // pause video after slide change
          if (!!el.querySelector('.ptah-yt-video')) {
            el
              .querySelector('.ptah-yt-video')
              .contentWindow
              .postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
          }
          if (!!el.querySelector('.ptah-video')) {
            el.querySelector('.ptah-video').pause()
          }
        }
      }
    }))
  })
}

void initGallery()
