;
export function initElementLink() {
  if (!document.body) {
    return
  }

  let elems = document.getElementsByTagName('*');

  [].forEach.call(elems, function (el, i) {
      if (el.classList.contains('js-element-link') || el.tagName === 'A' || el.tagName === 'LINK') {
        return
      } else  {
        let href = el.getAttribute('href')
        let target = el.getAttribute('target')

        if (href) el.removeAttribute('href')
        if (target) el.removeAttribute('target')
      }
  });

  document.body.addEventListener('click', function(e) {
    let link = e.target.closest('.js-element-link')
    let bl = document.getElementById('main')

    if (!link) {
      return
    }

    let url = link.getAttribute('href')
    if (!url || url === "javascript:void(0)") {
      return
    }

    window.open(url, link.getAttribute('target') || '_self')
    e.stopImmediatePropagation()


    if (bl.classList.contains("main_showPopup")) {
      const TARGET_POPUP = 'gallery-two-popup'
      const TARGET_POPUP_IFRAME = 'iframe'
      const TARGET_POPUP_VIDEO = 'video'

      var popup = document.querySelectorAll('[' + TARGET_POPUP + ']')[0]
      var popupI = popup.getElementsByTagName(TARGET_POPUP_IFRAME)[0]
      var popupV = popup.getElementsByTagName(TARGET_POPUP_VIDEO)[0]

      if (popupI) {
        popupI.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }

      if (popupV) {
        popupV.pause()
      }
    }

  }, false)
}

initElementLink()
