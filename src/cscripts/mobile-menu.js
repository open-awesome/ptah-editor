const habmurger = document.getElementById('js-hamburger')
let menu = null

export function initMobileMenu () {
  if (!habmurger) {
    return
  }

  habmurger.addEventListener('click', toggleMobileMenu, false)
  document.body.addEventListener('click', closeMobileMenu, false)
  window.addEventListener('resize', calculateViewportHeight, false)
}

function toggleMobileMenu () {
  menu = document.querySelector(this.dataset.target)

  if (!menu) {
    return
  }

  this.classList.toggle('is-active')
  menu.classList.toggle('is-active')
  document.body.style.overflow = (this.classList.contains('is-active')) ? 'hidden' : ''
}

function closeMobileMenu ({ target }) {
  if (!target.closest('.js-element-link') && (target.closest('#js-hamburger') || target.closest('[id^="mobile-menu"]'))) {
    return
  }
  if (menu) {
    menu.classList.remove('is-active')
  }
  habmurger.classList.remove('is-active')
  document.body.style.overflow = ''
}

function calculateViewportHeight () {
  let vh = (window.innerHeight * 0.01)
  document.documentElement.style.setProperty('--vh', `${ vh }px`)
}

void initMobileMenu()
void calculateViewportHeight()
