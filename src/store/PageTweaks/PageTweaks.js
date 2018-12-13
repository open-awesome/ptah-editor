import scrollbarTools from './scrollbarTools'

export default {
  state: {
    isScrollbarVisible: true,
    scrollbarWidth: scrollbarTools.getScrollbarWidth()
  },

  getters: {
    fakeScrollbarWidth (state) {
      if (state.isScrollbarVisible) {
        return 0
      }
      return state.scrollbarWidth
    }
  },

  mutations: {
    isScrollbarVisible (state, value) {
      state.isScrollbarVisible = value
    }
  },

  actions: {
    setScrollbarVisible ({ state, commit }, isVisible) {
      commit('isScrollbarVisible', isVisible)
      if (isVisible) {
        scrollbarTools.showBodyScrollbar()
      } else {
        scrollbarTools.hideBodyScrollbar(state.scrollbarWidth)
      }
    }
  },

  namespaced: true
}
