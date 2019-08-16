let menu = null

export function initMobileMenu () {
  const habmurger = document.getElementById('js-hamburger')

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
  const habmurger = document.getElementById('js-hamburger')
  const hasMenuLink = target.closest('.js-element-link') ? true : false
  const hasPopupLink = target.closest('.ptah-d-video') ? true : false
  const hasHamburger = target.closest('#js-hamburger') ? true : false
  const hasMobileMenu = target.closest('[id^="mobile-menu"]') ? true : false

  if (!hasMenuLink && !hasPopupLink && (hasHamburger || hasMobileMenu)) {
    return
  }

  if (menu) {
    menu.classList.remove('is-active')
  }
  if (habmurger) {
    habmurger.classList.remove('is-active')
  }
  document.body.style.overflow = ''
}

function calculateViewportHeight () {
  let vh = (window.innerHeight * 0.01)
  document.documentElement.style.setProperty('--vh', `${ vh }px`)
}

void initMobileMenu()
void calculateViewportHeight()
