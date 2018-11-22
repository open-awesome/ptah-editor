export default {
  state: {
    isExpanded: true,
    isSettingsExpanded: false, // 2nd level menu
    settingObjectType: '', // (Styler prop) section, button, text etc.
    settingObjectOptions: {}
  },

  mutations: {
    isExpanded (state, value) {
      state.isExpanded = value
    },
    isSettingsExpanded (state, value) {
      state.isSettingsExpanded = value
    },
    setSettingObjectType (state, value) {
      state.settingObjectType = value
    },
    setSettingObjectOptions (state, options) {
      state.settingObjectOptions = options
    }
  },

  actions: {
    toggleSidebar ({ state, commit }) {
      commit('isExpanded', !state.isExpanded)
    },

    setSettingObject ({ commit }, data) {
      console.log('ssset', data.type, data.options)
      commit('isSettingsExpanded', true)
      commit('setSettingObjectType', data.type)
      commit('setSettingObjectOptions', data.options)
    },

    clearSettingObject ({ commit }) {
      commit('isSettingsExpanded', false)
      commit('setSettingObjectType', '')
      commit('setSettingObjectOptions', {})
    }
  },

  namespaced: true
}
