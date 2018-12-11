import * as _ from 'lodash-es'

export default {
  state: {
    isExpanded: true,
    isSettingsExpanded: false, // 2nd level menu
    isAddSectionExpanded: false, // add section menu
    expandedMenuItem: 'sections', // submenu item
    settingObjectType: '', // (Styler prop) section, button, text etc.
    settingObjectOptions: {},
    settingObjectSection: {},
    siteSettingsMenu: [
      {
        id: 'visualSettings',
        name: 'Visual settings'
      },
      {
        id: 'seoSettings',
        name: 'SEO settings'
      }
      // {
      //   id: 'versionHistory',
      //   name: 'Version history'
      // }
    ]
  },

  mutations: {
    isExpanded (state, value) {
      state.isExpanded = value
    },
    isSettingsExpanded (state, value) {
      state.isSettingsExpanded = value
      if (value) {
        state.isAddSectionExpanded = false
      }
    },
    isAddSectionExpanded (state, value) {
      state.isAddSectionExpanded = value
      if (value) {
        state.isSettingsExpanded = false
      }
    },
    setSettingObjectType (state, value) {
      state.settingObjectType = value
    },
    setSettingObjectOptions (state, options) {
      state.settingObjectOptions = options
    },
    setSection (state, section) {
      state.settingObjectSection = section
    },
    setExpandedMenuItem (state, item) {
      state.expandedMenuItem = item
    }
  },

  actions: {
    toggleSidebar ({ state, commit }) {
      commit('isExpanded', !state.isExpanded)
    },

    toggleAddSectionMenu ({ state, commit }, value) {
      commit('isAddSectionExpanded', value || !state.isAddSectionExpanded)
    },

    setMenuItem ({ commit }, value) {
      commit('setExpandedMenuItem', value)
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

    clearSettingObjectLight ({ commit }) {
      commit('setSettingObjectType', '')
      commit('setSettingObjectOptions', {})
    },

    /**
     * Update options & set new styles to section / element
     * @param commit
     * @param state
     * @param options
     */
    updateSettingOptions ({ commit, state }, options) {
      commit('setSettingObjectOptions', options)
      const path = state.settingObjectType === 'section' ? '$sectionData.mainStyle' : state.settingObjectOptions.name
      state.settingObjectSection.set(path, options)
    },

    /* Update section data prop */
    updateSectionData ({ state }, { prop, data }) {
      state.settingObjectSection.set(`$sectionData.${prop}`, data)
    },

    /**
     * Open and set section settings
     * @param dispatch
     * @param commit
     * @param section {Object} section from builder
     */
    setSettingSection ({ dispatch, commit }, section) {
      let options = {
        ..._.find(section.stylers, { name: '$sectionData.mainStyle' }).options,
        sectionId: section.id,
        sectionName: section.name
      }

      // restore styles
      if (section.data) {
        options.styles = section.data.mainStyle.styles
      }

      commit('setSection', section)

      dispatch('setSettingObject', {
        type: 'section',
        options
      })
    },

    setSettingElement ({ dispatch, commit }, { type, name, options, section, element }) {
      let elementOptions = {
        ...options,
        name,
        sectionId: section.id,
        sectionName: section.name,
        element
      }

      commit('setSection', section)

      dispatch('setSettingObject', {
        type,
        options: elementOptions
      })
    }
  },

  namespaced: true
}
