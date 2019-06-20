import smoothscroll from 'smoothscroll-polyfill'

try {
  smoothscroll.polyfill()
}
catch (error) {
  throw new Error(error)
}

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

  if (section && !target.classList.contains('ptah-d-video')) {
    let behavior = target.dataset.behavior
    try {
      closePopup()
    } catch (e) {}

    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior, block: 'start', inline: 'nearest' })
    })
  }


  function mainClassToggle() {
    let bl = document.getElementById('main')
    bl.classList.toggle("main_showPopup")
  }

  function closePopup() {
    const TARGET_POPUP = 'gallery-two-popup'
    const TARGET_POPUP_CONTENT = 'gallery-two-popup-content'

    var popup = document.querySelectorAll('[' + TARGET_POPUP + ']')[0]
    var popupC = document.querySelectorAll('[' + TARGET_POPUP_CONTENT + ']')[0]

    popupC.innerHTML = ""
    popup.style.display = "none"

    mainClassToggle()
  }
}

void initScrollIntoSection()
