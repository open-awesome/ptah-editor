export function formsSender () {
  Array.from(document.querySelectorAll('.ptah-form')).forEach(function(element) {
    element.addEventListener('submit', (e) => {
      e.preventDefault()
      submitForm(element)
    })
  })

  function submitForm (form) {
    let data = new FormData(form)
    let req = new XMLHttpRequest()

    req.send(data)
    req.onreadystatechange = function () {
      if (this.status === 200) {
        let button = form.getElementsByClassName('ptah-submit')[0]
        button.classList.add('submited')
      }
    }
  }
}

formsSender()
