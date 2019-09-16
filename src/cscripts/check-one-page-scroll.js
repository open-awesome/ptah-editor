export function checkOnePageScroll () {
  let container = document.getElementById('main')

  if (!container) {
    return
  }

  if (container.classList.contains('onepage-wrapper')) {
    let headers = container.querySelectorAll('header')
    let sections = container.querySelectorAll('section')
    let countSections = container.querySelectorAll('section:not(.ptah-g-child').length
    let lastSection = sections[countSections - 1]
    let headerHeight = 0
    let footerHeight = 0
    let posY = 0
    let footers = container.querySelectorAll('footer:not(.ptah-g-child)')

    console.log(countSections)

    if (headers[0] && sections[0]) {
      headerHeight = headers[0].offsetHeight
      sections[0].style.top = headerHeight + 'px';
    }
    if (footers[0] && lastSection) {
      footerHeight = footers[0].offsetHeight
      posY = (container.offsetHeight * countSections) - footerHeight - headerHeight

      lastSection.style.height = 'calc(100% -' + footerHeight + 'px';
      footers[0].style.transform = 'translateY(' + posY + 'px)'
      footers[0].style.zIndex = '9999'
    }
  } else {
    if (headers[0] && sections[0]) {
      sections[0].style.top = '0';
    }
    if (footers[0] && lastSection) {
      lastSection.style.height = '100%';
      footers[0].style.transform = 'none'
      footers[0].style.zIndex = '1'
    }
  }
}

window.onresize = function(event) {
  checkOnePageScroll()
}

checkOnePageScroll()
