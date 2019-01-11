import Swiper from 'swiper'
import swiperOptions from '../editor/swiper'

const SWIPER_CONTAINERS = document.querySelectorAll(swiperOptions.container)

export function initGallery () {
  SWIPER_CONTAINERS.forEach(el => {
    let options = JSON.parse(el.dataset.options || '{}')
    console.log(options)
    new Swiper(el, options)
  })
}

void initGallery()
