import * as _ from 'lodash-es'

export default {
  state: {
    isExpanded: true,
    isSettingsExpanded: false, // 2nd level menu
    settingObjectType: '', // (Styler prop) section, button, text etc.
    settingObjectOptions: {},
    settingObjectSection: {}
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
    },
    setSection (state, section) {
      state.settingObjectSection = section
    }
  },

  actions: {
    toggleSidebar ({ state, commit }) {
      commit('isExpanded', !state.isExpanded)
    },

    setSettingObject ({ commit }, data) {
      commit('isSettingsExpanded', true)
      commit('setSettingObjectType', data.type)
      commit('setSettingObjectOptions', data.options)
    },

    clearSettingObject ({ commit }) {
      commit('isSettingsExpanded', false)
      commit('setSettingObjectType', '')
      commit('setSettingObjectOptions', {})
    },

    updateSettingOptions ({ commit, state }, options) {
      commit('setSettingObjectOptions', options)
      console.log('dddd', state.settingObjectSection)
      state.settingObjectSection.set('$sectionData.mainStyle', { styles: options.styles })
    },

    /**
     * Open section settings
     * @param dispatch
     * @param section
     */
    setSettingSection ({ dispatch, commit }, section) {
      let options = _.find(section.stylers, { name: '$sectionData.mainStyle' }).options
      options.sectionId = section.id
      options.sectionName = section.name

      commit('setSection', section)

      dispatch('setSettingObject', {
        type: 'section',
        options
      })
    }
  },

  namespaced: true
}
