import Swiper from 'swiper'
import swiperOptions from '../editor/swiper'

const SWIPER_CONTAINERS = document.querySelectorAll(swiperOptions.container)

export function initGallery () {
  console.log(SWIPER_CONTAINERS)
  SWIPER_CONTAINERS.forEach(el => {
    let options = JSON.parse(el.dataset.options || '{}')
    new Swiper(el, options)
  })
}

void initGallery()
