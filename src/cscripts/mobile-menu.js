const habmurger = document.getElementById('js-hamburger')
let menu = null

export function initMobileMenu () {
  if (!habmurger) {
    return
  }
  habmurger.addEventListener('click', toggleMobileMenu, false)
  document.body.addEventListener('click', closeMobileMenu, false)
}

function toggleMobileMenu (e) {
  menu = document.querySelector(this.dataset.target)

  if (!menu) {
    return
  }

  this.classList.toggle('is-active')
  menu.classList.toggle('is-active')
}

function closeMobileMenu ({ target }) {
  if (target.closest('#js-hamburger') || target.closest('[id^="mobile-menu"]')) {
    return
  }
  if (menu) {
    menu.classList.remove('is-active')
  }
  habmurger.classList.remove('is-active')
}

void initMobileMenu()
