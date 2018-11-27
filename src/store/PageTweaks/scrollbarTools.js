import extend from 'lodash/extend'

export default {
  /**
   * Calculating scrollbars width in current conditions
   *
   * @return {number}
   */
  getScrollbarWidth () {
    // Элемент, у котого мы будем проверять размеры скроллбара
    const scrollTester = document.createElement('div')
    extend(scrollTester.style, {
      width: '50px',
      height: '50px',
      overflowY: 'scroll'
    })
    document.body.appendChild(scrollTester)

    // Вычисляем разница между внутренней и внешней шириной элемента
    const result = scrollTester.offsetWidth - scrollTester.clientWidth

    scrollTester.parentNode.removeChild(scrollTester)

    return result
  },

  hideBodyScrollbar (scrollBarWidth) {
    if (!this.isPageScrollbarPresent()) {
      return
    }

    document.body.style.overflow = 'hidden'
    document.body.style.marginRight = `${scrollBarWidth}px`
  },

  /**
   * Check if page scrollbar present
   *
   * @return {boolean}
   */
  isPageScrollbarPresent () {
    const hasHtmlScroll = document.body.parentNode.scrollHeight > document.body.parentNode.clientHeight
    const hasBodyScroll = document.body.scrollHeight > document.body.clientHeight

    const htmlOverflowY = window.getComputedStyle(document.body.parentNode).getPropertyValue('overflow-y')
    const bodyOverflowY = window.getComputedStyle(document.body).getPropertyValue('overflow-y')

    if (!hasHtmlScroll && !hasBodyScroll && htmlOverflowY !== 'scroll' && bodyOverflowY !== 'scroll') {
      return false
    }

    return true
  },

  showBodyScrollbar () {
    document.body.style.overflow = ''
    document.body.style.marginRight = ''
  }
}
