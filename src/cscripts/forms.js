export function formsSender () {
  Array.from(document.querySelectorAll('.ptah-form')).forEach(function(element) {
    element.addEventListener('submit', (e) => {
      e.preventDefault()
      submitForm(element)
    })
  })

  function submitForm (form) {
    let url = form.dataset.action
    let email = form.querySelector('.ptah-input').value
    let control = [form.querySelector('.ptah-valid').value, form.querySelector('.ptah-valid').getAttribute('name')]
    let body = `EMAIL=${encodeURIComponent(email)}&${control[1]}=${control[0]}`

    let req = new XMLHttpRequest()
    req.open('POST', url, true)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    req.onreadystatechange = function () {
      let button = form.getElementsByClassName('ptah-submit')[0]
      button.classList.add('submited')

      setTimeout(() => {
        button.classList.remove('submited')
      }, 1000)
    }

    req.send(body)
  }
}

formsSender()
