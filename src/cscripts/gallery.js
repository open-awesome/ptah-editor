import Swiper from 'swiper'
import swiperOptions from '../editor/swiper'

const SWIPER_CONTAINERS = document.querySelectorAll(swiperOptions.container)

export function initGallery () {
  SWIPER_CONTAINERS.forEach(el => {
    el.querySelector('.swiper-button-prev').classList.remove('swiper-button-disabled')

    let options = JSON.parse(el.dataset.options || '{}')
    new Swiper(el, {
      ...options,
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
    })
  })
}

void initGallery()
