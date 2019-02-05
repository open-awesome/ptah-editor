const contentComponentMap = {
  visualSettings: 'BuilderSiteSettingsVisual',
  seoSettings: 'BuilderSiteSettingsSeo',
  cookiesSettings: 'BuilderSiteSettingsCookies',
  versionHistory: 'BuilderSiteSettingsVersionHistory',
  integrationsSettings: 'BuilderSiteSettingsIntegrations'
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
     * Based on ID content component name is defined
     * Also toggles the content layer visibility
     */
    setContent ({ commit }, contentID) {
      commit('contentID', contentID)
      commit('isContentVisible', !!contentID)
    }
  },

  namespaced: true
}
