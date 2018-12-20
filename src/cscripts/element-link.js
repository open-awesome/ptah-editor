;
export function initElementLink() {
  if (!document.body) {
    return
  }

  document.body.addEventListener('click', function(e) {
    let link = e.target.closest('.js-element-link')
    if (!link) {
      return
    }

    let url = link.getAttribute('href')
    if (!url) {
      return
    }

    window.open(url, link.getAttribute('target') || '_self')
    e.stopImmediatePropagation()
  }, false)
}

initElementLink()
