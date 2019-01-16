export default {
  container: '.swiper-container',
  next: '.swiper-button-next',
  prev: '.swiper-button-prev',
  pagination: '.swiper-pagination',

  coreflow: {
    effect: 'coverflow',
    centeredSlides: true,
    simulateTouch: false,
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      type: 'bullets',
      clickable: true
    },
    coverflowEffect: {
      rotate: 30,
      stretch: 50,
      depth: 100,
      modifier: 1,
      slideShadows: false
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  },

  autoplay: {
    loop: true,
    simulateTouch: false,
    autoplay: {
      disableOnInteraction: false,
      waitForTransition: false,
      delay: 2000
    },
    pagination: {
      type: 'bullets',
      clickable: true
    }
  }
}
