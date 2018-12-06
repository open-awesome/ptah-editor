;
export function handleVideoSection() {
  const tag = document.createElement('script')

  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  const youtubePlayers = []

  window.onYouTubeIframeAPIReady = function () {
    youtubePlayers.forEach(function (item) {
      item()
    })
  }

  Array.from(document.querySelectorAll('.b-video-section'))
    .forEach(function (videoSection) {
      const videoTag = videoSection.querySelector('video')
      const iframeTag = videoSection.querySelector('iframe')
      if (videoTag) {
        handleVideoTag(videoSection, videoTag)
      }
      if (iframeTag) {
        handleYoutubeVideo(videoSection, iframeTag)
      }
    })

  function handleVideoTag(videoSection, videoTag) {
    videoTag.addEventListener('play', function () {
      videoSection.classList.add('b-video-section_playing')
    })
    videoTag.addEventListener('pause', function () {
      videoSection.classList.remove('b-video-section_playing')
    })
    videoTag.addEventListener('ended', function () {
      videoSection.classList.remove('b-video-section_playing')
    })
  }

  function handleYoutubeVideo(videoSection, iframeTag) {
    youtubePlayers.push(function () {
      new window.YT.Player(iframeTag, {
        events: {
          onStateChange: function (event) {
            if (event.data === 1 || event.data === 3) {
              videoSection.classList.add('b-video-section_playing')
            }
            if (event.data === 0 || event.data === 2) {
              videoSection.classList.remove('b-video-section_playing')
            }
          }
        }
      });
    })
  }
}

handleVideoSection();