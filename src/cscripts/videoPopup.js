;
export function videoPopup () {
  Array.from(document.querySelectorAll('.ptah-d-video')).forEach(function(element) {
    element.addEventListener('click', createVideoPopup);
  });

  function createVideoPopup(e) {
    console.log(e)
  }
}

videoPopup()
