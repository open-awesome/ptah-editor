export function galleryPopup () {
  const popUpTemplate = `
  <div class="l-popup" gallery-two-popup="">
    <div gallery-two-popup-padd="" class="l-popup__padd">
      <div gallery-two-popup-close="" class="l-popup__close">
        <svg viewBox="0 0 8 8" width="14" height="14" fill="#fff">
          <g>
            <path d="M6.82118 0.202253C7.09085 -0.0674173 7.52808 -0.0674171 7.79775 0.202253C8.06742 0.471924 8.06742 0.909146 7.79775 1.17882L1.17882 7.79775C0.909146 8.06742 0.471923 8.06742 0.202253 7.79775C-0.0674175 7.52808 -0.0674177 7.09085 0.202253 6.82118L6.82118 0.202253Z"/>
            <path d="M7.79775 6.82118C8.06742 7.09085 8.06742 7.52808 7.79775 7.79775C7.52808 8.06742 7.09085 8.06742 6.82118 7.79775L0.202254 1.17882C-0.0674168 0.909146 -0.0674165 0.471923 0.202254 0.202253C0.471925 -0.0674177 0.909147 -0.0674176 1.17882 0.202253L7.79775 6.82118Z"/>
          </g>
        </svg>
      </div>

      <div id="layoutContent" class="l-popup__content">
        <div id="content" class="l-popup__content-block" gallery-two-popup-content="">
        </div>
        <div gallery-two-popup-prev="" class="l-popup__arr l-popup__arr_prev">
          <svg data-v-05947b34="" data-v-96cc3888="" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="" width="8" height="14" aria-labelledby="arrowRight" role="presentation"><path d="M1 1L7 7L1 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        <div gallery-two-popup-next="" class="l-popup__arr l-popup__arr_next">
          <svg data-v-05947b34="" data-v-96cc3888="" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="" width="8" height="14" aria-labelledby="arrowRight" role="presentation"><path d="M1 1L7 7L1 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </div>

      <span class="l-popup__count" />
    </div>
  </div>
  `

  const node = document.createElement('div')
  node.innerHTML = popUpTemplate
  document.querySelector('body').appendChild(node)

  const [popup, prev, next, defUrl, popupP, popupC, popupX] = [
    document.querySelectorAll('[gallery-two-popup]')[0], // popup window node
    document.querySelectorAll('[gallery-two-popup-prev]')[0], // prev arrow
    document.querySelectorAll('[gallery-two-popup-next]')[0],  // next arrow
    'https://gn652.cdn.gamenet.ru/TY0Xv2riHu/772iV/o_cDot3.png',
    document.querySelectorAll('[gallery-two-popup-padd]')[0],
    document.querySelectorAll('[gallery-two-popup-content]')[0],
    document.querySelectorAll('[gallery-two-popup-close]')[0]
  ]

  let currentGal = null
  let currentIndex = null

  /**
   * make galleries
   * @type {{node: Node, id: number}[]}
   */
  const galleries = Array
    .from(document.querySelectorAll('.b-gallery-popup'))
    .map((node, id) => { return { node, id } })

  galleries.forEach((gallery) => {
    gallery.items = setGalleryItems(gallery)
  })

  /**
   * Set items to gallery
   * @param gallery - object of gallery
   * @returns {*}
   */
  function setGalleryItems (gallery) {
    let items = Array
      .from(gallery.node.querySelectorAll('[gallery-two-popup-link]'))
      .map((node, id) => {
        return {
          node,
          id,
          image: node.getAttribute('gallery-two-popup-image-url'),
          video: node.getAttribute('gallery-two-popup-video-url'),
          type: node.getAttribute('gallery-two-popup-type-content')
        }
      })

    items.forEach((item) => {
      addEvent(item, gallery)
    })

    return items
  }

  function addEvent (item, gallery) {
    item.node.addEventListener('click', function (e) {
      e.preventDefault()
      popUp(item, gallery)
    })
  }

  function popUp(item, gallery) {
    let url = ''
    let contentPopup = ''
    let youtubeVideoUrl = false

    currentGal = gallery.id
    currentIndex = item.id

    if (item.image !== '' && item.image !== null && item.type === 'default') {
      url = item.image
    } else if (item.video !== '') {
      url = item.video
    } else {
      url = defUrl
    }

    youtubeVideoUrl = matchYoutubeUrl(url)

    if (item.type === 'default') {
      contentPopup = '<img style="max-width: 100%; max-height: 100%;" id="content" src="' + url + '"></img>'
    } else {
      if (youtubeVideoUrl) {
        contentPopup = '<iframe allow="autoplay" id="popupIframeVideo" width="100%" height="100%" src="https://www.youtube.com/embed/' + youtubeVideoUrl + '?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;enablejsapi=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
      } else {
        contentPopup = '<video autoplay="autoplay" style="width: 100%; height: 100%;" id="popupVideo" controls="controls" src="' + item.video + '" loop="loop" type="video/mp4"></video>'
      }
    }

    popupP.style.width = "100%"
    popupP.style.height = "100%"
    popupP.style.margin = "0 auto"
    popupC.innerHTML = contentPopup

    setTimeout(opepPopup(item.id, gallery.items.length), 500)
  }

  function opepPopup(index, length) {
    popup.style.display = "flex"

    if (index === 0) {
      prev.style.display = "none"
      next.style.display = "flex"
    } else if (index === length - 1) {
      prev.style.display = "flex"
      next.style.display = "none"
    } else {
      prev.style.display = "flex"
      next.style.display = "flex"
    }

    mainClassToggle(true)
  }

  function closePopup() {
    let c = document.getElementById('layoutContent');

    popupC.innerHTML = ''
    c.style.width = ''
    c.style.height = ''
    popup.style.display = "none"

    mainClassToggle(false)
  }

  function mainClassToggle(value) {
    let bl = document.getElementById('main')

    if (value) {
      bl.classList.add("main_showPopup")
    } else if (bl.classList.contains("main_showPopup")) {
      bl.classList.remove("main_showPopup")
    }
  }

  function matchYoutubeUrl(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    let matches = url.match(p)
    if (matches) {
      return matches[1]
    }
    return false
  }

  // events
  if (popupX) {
    popupX.addEventListener('click', closePopup)
  }

  if (prev) {
    prev.addEventListener('click', function () {
      let index = currentIndex - 1
      let item = galleries[currentGal].items[index]
      popUp(item, galleries[currentGal])
    })
  }

  if (next) {
    next.addEventListener('click', function () {
      let index = currentIndex + 1
      let item = galleries[currentGal].items[index]
      popUp(item, galleries[currentGal])
    })
  }
}

galleryPopup()
