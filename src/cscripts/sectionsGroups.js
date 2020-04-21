import { throttle } from 'lodash-es'

export function sectionsGroups () {
  let groups = []

  function getGroups () {
    const CONTAINER = !!document.getElementById('artboard') ?
      document.getElementById('artboard') : document.querySelector('.main')

    if (CONTAINER === null) {
      return false
    }

    const SECTIONS = Array.from(CONTAINER.children)
    groups = []

    SECTIONS.forEach((section, index) => {
      if (section.classList.contains('ptah-g-main')) {
        let group = {}
        group.main = section
        group.children = SECTIONS.slice(index + 1, index + parseInt(section.dataset.absorb, 10) + 1)

        groups.push(group)
      }
    })

    calculate(groups)
  }

  function calculate (groups) {
    groups.forEach((group) => {
      let padding = group.children.reduce((sum, el) => sum + el.offsetHeight, 0)
      group.main.style.paddingBottom = padding + 'px'

      let offset = group.main.offsetHeight + group.main.offsetTop - padding

      group.children.forEach((el, i) => {
        let height = el.offsetHeight
        let style = el.style

        style.position = 'absolute'
        style.top = `${offset}px`

        offset = offset + height
      })
    })
  }

  window.addEventListener('resize', throttle(getGroups, 300))

  getGroups()
}


sectionsGroups()
