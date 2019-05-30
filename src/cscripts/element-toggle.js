;
export function initElementToggle() {
  if (!document.body) {
    return
  }

  let elementsToggle = document.querySelectorAll('[data-toggle-element]');

  [].forEach.call(elementsToggle, function (el, i) {
    let text = el.querySelectorAll('[data-toggle-element-text]')[0]
    text.style.display = 'none'
  });

  document.body.addEventListener('click', function(e) {
    let el = e.target.closest('.b-toggle-element')
    let text = null

    if (!el) {
      return
    }

    text = el.querySelectorAll('[data-toggle-element-text]')[0]
    text.style.display = text.style.display === 'none' ? 'flex' : 'none';

  }, false)
}

initElementToggle()
