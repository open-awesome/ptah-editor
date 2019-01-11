export default {
  container: '.swiper-container',
  next: '.swiper-button-next',
  prev: '.swiper-button-prev',
  pagination: '.swiper-pagination',

  coreflow: {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    coverflowEffect: {
      rotate: 30,
      stretch: 50,
      depth: 100,
      modifier: 1,
      slideShadows : true
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
