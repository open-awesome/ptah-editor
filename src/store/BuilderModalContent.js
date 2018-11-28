const contentComponentMap = {
  visualSettings: 'BuilderSiteSettingsVisual',
  seoSettings: 'BuilderSiteSettingsSeo',
  versionHistory: 'BuilderSiteSettingsVersionHistory'
}

export default {
  state: {
    isContentVisible: false,
    contentID: ''
  },

  getters: {
    contentComponent ({ contentID }) {
      return contentComponentMap[contentID]
    }
  },

  mutations: {
    isContentVisible (state, value) {
      state.isContentVisible = value
    },
    contentID (state, value) {
      state.contentID = value
    }
  },

  actions: {
    /**
     * Toggles the content layer visibility
     */
    setContentVisible ({ commit }, isVisible) {
      commit('isContentVisible', isVisible)
    },

    /**
     * Based on ID content component name is defined
     */
    setContentID ({ commit }, contentID) {
      commit('contentID', contentID)
    }
  },

  namespaced: true
}
