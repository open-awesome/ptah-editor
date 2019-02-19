const contentComponentMap = {
  visualSettings: 'BuilderSiteSettingsVisual',
  seoSettings: 'BuilderSiteSettingsSeo',
  cookiesSettings: 'BuilderSiteSettingsCookies',
  versionHistory: 'BuilderSiteSettingsVersionHistory',
  addJsScrips: 'BuilderSiteSettingsAddJsScripts',
  integrations: 'BuilderSiteSettingsIntegrations',
  openGraph: 'BuilderSiteSettingsOpenGraph'
}

const componentsIntegrations = {
  googleTag: 'BuilderSiteSettingsIntegrationsGoogleTag',
  googleAnalitycs: 'BuilderSiteSettingsIntegrationsGoogleAnalitycs',
  mailchimp: 'BuilderSiteSettingsIntegrationsMailchimp'
}

export default {
  state: {
    isContentVisible: false,
    contentID: '',
    isIntegrationVisible: false,
    integrationID: ''
  },

  getters: {
    contentComponent ({ contentID }) {
      return contentComponentMap[contentID]
    },
    integrationComponent ({ integrationID }) {
      return componentsIntegrations[integrationID]
    }
  },

  mutations: {
    isContentVisible (state, value) {
      state.isContentVisible = value
    },
    contentID (state, value) {
      state.contentID = value
    },
    isIntegrationVisible (state, value) {
      state.isIntegrationVisible = value
    },
    integrationID (state, value) {
      state.integrationID = value
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
    },
    /**
     * Based on ID integration component name is defined
     * Also toggles the content layer visibility
     */
    setIntegration ({ commit }, integrationID) {
      commit('integrationID', integrationID)
      commit('isIntegrationVisible', !!integrationID)
    }
  },

  namespaced: true
}
