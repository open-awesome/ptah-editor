export function initGalleryCarousel() {
  Array.from(document.querySelectorAll('.b-gallery-carousel-body'))
    .forEach(function (carouselBody) {
      const prevArrow = carouselBody.querySelector('.b-gallery-carousel-body__arrow-prev')
      const prevNext = carouselBody.querySelector('.b-gallery-carousel-body__arrow-next')

      prevArrow.addEventListener('click', function () {
        const items = carouselBody.querySelectorAll('.b-gallery-carousel-body-item')

        Array.from(items).forEach(function (item, index) {
          item.classList.remove('b-gallery-carousel-body-item_active')

          if (index === items.length - 1) {
            const itemsHolder = carouselBody.querySelector('.b-gallery-carousel-body__items')
            itemsHolder.insertBefore(item, itemsHolder.firstChild);
          }

          if (index === 0) {
            item.classList.add('b-gallery-carousel-body-item_active')
          }
        })
      })

      prevNext.addEventListener('click', function () {
        const items = carouselBody.querySelectorAll('.b-gallery-carousel-body-item')

        Array.from(items).forEach(function (item, index) {
          item.classList.remove('b-gallery-carousel-body-item_active')

          if (index === 0) {
            carouselBody.querySelector('.b-gallery-carousel-body__items').appendChild(item);
          }

          if (index === 2) {
            item.classList.add('b-gallery-carousel-body-item_active')
          }
        })

      })

    })
}

initGalleryCarousel()