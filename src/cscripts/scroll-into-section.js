export function initScrollIntoSection () {
  let links = document.querySelectorAll('a[href^="#section_"]')
  links.forEach(link => {
    link.addEventListener('click', scrollIntoSection, false)
  })
}

export function scrollIntoSection (e) {
  e.preventDefault()

  let target = e.target.closest('a')
  let section = document.querySelector(target && target.getAttribute('href'))

  if (section) {
    section.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
}

void initScrollIntoSection()
