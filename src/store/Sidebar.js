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

    /**
     * Set current element options (from seeder)
     * @param commit
     * @param data
     */
    setSettingObject ({ commit }, data) {
      commit('isSettingsExpanded', true)
      commit('setSettingObjectType', data.type)
      commit('setSettingObjectOptions', data.options)
    },

    /**
     * Clear setting values
     * @param commit
     */
    clearSettingObject ({ commit }) {
      commit('isSettingsExpanded', false)
      commit('setSettingObjectType', '')
      commit('setSettingObjectOptions', {})
    },

    /**
     * Update options & set new styles to section
     * @param commit
     * @param state
     * @param options
     */
    updateSettingOptions ({ commit, state }, options) {
      commit('setSettingObjectOptions', options)
      let path = '$sectionData.mainStyle' // TODO: need path to any elements
      state.settingObjectSection.set(path, { styles: options.styles })
    },

    /**
     * Open and set section settings
     * @param dispatch
     * @param commit
     * @param section {Object} section from builder
     */
    setSettingSection ({ dispatch, commit }, section) {
      let options = _.find(section.stylers, { name: '$sectionData.mainStyle' }).options

      // restore styles
      if (section.data) {
        options.styles = section.data.mainStyle.styles
      }

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
