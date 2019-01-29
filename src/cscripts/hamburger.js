import 'setimmediate'

export function initHamburger () {
  let buttons = document.querySelectorAll('.hamburger-button')
  document.body.addEventListener('click', closeHamburger, false)
  buttons.forEach(btn => btn.onclick = toggleHamburgerMenu)
}

function toggleHamburgerMenu ({ target }) {
  let container = target.closest('.js-hamburger')
  if (!container) {
    return
  }

  let content = container.querySelector('.hamburger-container')
  let button = container.querySelector('.hamburger-button')

  if (!content || !button) {
    return
  }

  content.classList.toggle('active')
  button.classList.toggle('active')
}

function closeHamburger ({ target }) {
  if (target.closest('.hamburger-button') || target.closest('.hamburger-container')) {
    return
  }
  let elements = [
    ...document.querySelectorAll('.hamburger-container.active'),
    ...document.querySelectorAll('.hamburger-button.active')
  ]
  elements.forEach(el => el.classList.remove('active'))
}

void initHamburger()
