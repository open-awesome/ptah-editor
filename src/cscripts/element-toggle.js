;
export function initElementToggle() {
  if (!document.body) {
    return
  }

  let elementsToggle = document.querySelectorAll('[data-toggle-element]');

  [].forEach.call(elementsToggle, function (el, i) {
    let text = el.querySelectorAll('[data-toggle-element-text]')[0]
    let tr = text.getElementsByTagName('tr')[1]
    tr.style.display = 'none'
  });

  document.body.addEventListener('click', function(e) {
    let el = e.target.closest('.b-toggle-element')
    let text = null
    let tr = null

    if (!el) {
      return
    }

    text = el.querySelectorAll('[data-toggle-element-text]')[0]
    tr = text.getElementsByTagName('tr')[1]
    tr.style.display = tr.style.display === 'none' ? 'block' : 'none';

  }, false)
}

initElementToggle()
