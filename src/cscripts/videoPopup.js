;
export function videoPopup () {
  Array.from(document.querySelectorAll('.ptah-d-video')).forEach(function(element) {
    element.addEventListener('click', createVideoPopup);
  });

  function createVideoPopup(e) {
    e.preventDefault()
    let videoId = e.target.dataset.video
    let container = document.createElement('div')
    container.classList.add('b-video-popup')
    container.innerHTML = popupTemplate(videoId)
    document.body.appendChild(container)

    document.querySelector('.b-video-popup__close').addEventListener('click', destroy)
  }

  function popupTemplate(videoId) {
    return `
      <div class="b-video-popup__container">
        <div class="b-video-popup__inner">
          <div class="b-video-popup__close">&times;</div>
          <iframe id="existing-iframe-example"
            width="640" height="360"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1"
            frameborder="0"
            style="border: none"
            ></iframe>
        </div>
      </div>
    `
  }

  function destroy() {
    document.querySelector('.b-video-popup__close').removeEventListener('click', destroy)
    document.querySelector('.b-video-popup').remove()
  }
}

videoPopup()
