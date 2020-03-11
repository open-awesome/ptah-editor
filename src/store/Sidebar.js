import * as _ from 'lodash-es'

export default {
  state: {
    isExpanded: false, // show/hide sidebar
    mainLeftMenu: { // left menu of all settings
      list: [
        { name: 'Sections', icon: 'hamburgerDot', panel: 'sectionsTree' },
        { name: 'Style', icon: 'editStyle', panel: 'visualSettings' },
        { name: 'Fonts', icon: 'fonts', panel: 'fonts' },
        { name: 'Code', icon: 'code', panel: 'addJsScrips' },
        { name: 'Seo', icon: 'seo', panel: 'seoSettings' },
        { name: 'Integration', icon: 'integration', panel: 'integrations' }
      ],
      expanded: false, // small/middle it
      name: ''
    },
    controlPanel: { // settings panels for sections & elements
      expanded: false, // show/hide it
      name: ''
    },
    isShowModal: false, // show/hide modal of elemets settings
    isAddSectionExpanded: false, // show/hide add section panel
    isSectionsTreeExpanded: false, // show/hide panel of sections tree
    isProgressPanelExpanded: false, // show/hide progress panel
    isResizeStop: false, // resize elements
    isDragStop: false, // drag elements in slots
    isGrouping: false, // section grouping interface
    settingObjectType: '', // (Styler prop) section, button, text etc.
    settingObjectLabel: '', // Styler slot label
    settingObjectOptions: {},
    stylesBuffer: {}, // buffer element { type, { options } }
    settingObjectElement: false,
    settingObjectSection: {},
    siteSettingsMenu: [
      {
        id: 'visualSettings',
        name: 'menu.visualSettings'
      },
      {
        id: 'fonts',
        name: 'menu.fonts'
      },
      {
        id: 'addJsScrips',
        name: 'menu.addJs'
      },
      {
        id: 'seoSettings',
        name: 'menu.seo'
      },
      {
        id: 'integrations',
        name: 'menu.integrations'
      }
      /*
      {
        id: 'cookiesSettings',
        name: 'menu.cookie'
      },
      {
        id: 'openGraph',
        name: 'menu.openGraph'
      },
      {
        id: 'addJsScrips',
        name: 'menu.addJs'
      },
      {
        id: 'addCss',
        name: 'menu.addCss'
      }
      */
    ],
    builderSections: [],
    builderGroups: [], // section layouts
    sectionsGroups: [],
    sandbox: {
      components: [], // sandbox current section's components
      styles: {} // sandbox current section's styles
    },
    device: 'is-desktop', // selected platform in platforms menu
    isMobile: false, // detect mobile mode
    mainGreenColor: '#00ADB6'
  },

  mutations: {
    isExpanded (state, value) {
      state.isExpanded = value
    },

    isAddSectionExpanded (state, value) {
      state.isAddSectionExpanded = value
    },
    isSectionsTreeExpanded (state, value) {
      state.isSectionsTreeExpanded = value
    },
    isProgressPanelExpanded (state, value) {
      state.isProgressPanelExpanded = value
    },
    setSettingObjectType (state, value) {
      state.settingObjectType = value
    },
    setSettingObjectLabel (state, value) {
      state.settingObjectLabel = value
    },
    setSettingObjectOptions (state, options) {
      state.settingObjectOptions = options
    },
    setStylesBuffer (state, element) {
      state.stylesBuffer = element
    },
    setSection (state, section) {
      state.settingObjectSection = section
    },
    setBuilderSections (state, array) {
      state.builderSections = array
    },
    setBuilderGroups (state, groups) {
      state.builderGroups = groups
    },
    setSectionsGroups (state, groups) {
      state.sectionsGroups = groups
    },
    isGrouping (state, value) {
      state.isGrouping = value
    },
    setSandboxPaths (state, paths) {
      state.sandbox = { ...state.sandbox, ...paths }
    },
    setElement (state, el) {
      state.settingObjectElement = el
    },
    controlPanel (state, data) {
      state.controlPanel = data
    },
    setResizeStop (state, value) {
      state.isResizeStop = value
    },
    setDragStop (state, value) {
      state.isDragStop = value
    },
    device (state, value) {
      state.device = value
    },
    isMobile (state, value) {
      state.isMobile = value
    },
    isShowModal (state, value) {
      state.isShowModal = value
    }
  },

  actions: {
    toggleSidebar ({ state, commit }, value) {
      commit('isExpanded', (typeof value !== 'undefined') ? value : !state.isExpanded)
    },

    toggleAddSectionMenu ({ state, commit }, value) {
      commit('isAddSectionExpanded', (typeof value !== 'undefined') ? value : !state.isAddSectionExpanded)
    },

    toggleSectionsTreeMenu ({ state, commit }, value) {
      commit('isSectionsTreeExpanded', (typeof value !== 'undefined') ? value : !state.isSectionsTreeExpanded)
    },

    toggleProgressPanelExpanded ({ state, commit }, value) {
      commit('isProgressPanelExpanded', (typeof value !== 'undefined') ? value : !state.isProgressPanelExpanded)
    },

    /**
     * Set current element options (from seeder)
     * @param commit
     * @param data
     */
    setSettingObject ({ commit, state }, data) {
      if (data.options.sectionId !== state.settingObjectOptions.sectionId ||
          data.options.name !== state.settingObjectOptions.name) {
        commit('setSettingObjectLabel', data.label)
        commit('setSettingObjectType', data.type)
        commit('setSettingObjectOptions', data.options)
      }
    },

    /**
     * Clear setting values
     * @param commit
     */
    clearSettingObject ({ commit }) {
      commit('setSettingObjectType', '')
      commit('setSettingObjectOptions', {})
      commit('isGrouping', false)
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
        ...section.data.mainStyle,
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

      // dispatch('setControlPanel', 'Section')
    },

    setSettingElement ({ dispatch, commit }, { type, name, label, options, section, element }) {
      let elementOptions = {
        ...options,
        name,
        sectionId: section.id,
        sectionName: section.name
      }

      commit('setSection', section)
      commit('setElement', element)

      dispatch('setSettingObject', {
        type,
        label,
        options: elementOptions
      })
    },

    updateBuilderSections ({ commit }, sectionsArray) {
      commit('setBuilderSections', sectionsArray)
    },

    updateBuilderGroups ({ commit }, groups) {
      commit('setBuilderGroups', groups)
    },

    setElement ({ commit }, element) {
      commit('setElement', element)
    },

    updateText ({ state, dispatch }) {
      if (state.settingObjectElement) {
        const el = state.settingObjectElement
        dispatch('updateSettingOptions', _.merge({}, state.settingObjectOptions, { text: el.innerHTML }))
      }
    },

    updateSectionGroups ({ commit }, groups) {
      commit('setSectionsGroups', groups)
    },

    toggleGrouping ({ commit, state }, value) {
      commit('isGrouping', (typeof value !== 'undefined') ? value : !state.isGrouping)
    },

    setControlPanel ({ commit, state, dispatch }, panel) {
      if (typeof panel === 'string') {
        commit('controlPanel', {
          expanded: true,
          name: panel
        })

        if (!state.isExpanded) {
          commit('isExpanded', true)
        }

        // close 'add section bar'
        commit('isAddSectionExpanded', false)
        commit('isSectionsTreeExpanded', false)
      } else {
        commit('controlPanel', {
          expanded: false,
          name: ''
        })

        dispatch('toggleGrouping', false)
      }
    },

    toggleResizeStop ({ commit, state }, value) {
      commit('setResizeStop', (typeof value !== 'undefined') ? value : false)
    },

    toggleDragStop ({ commit, state }, value) {
      commit('setDragStop', (typeof value !== 'undefined') ? value : false)
    },

    /**
    * save styles in buffer
    * @param commit
    * @param state
    * @param options
    */
    updateStylesBuffer ({ commit, state }, element) {
      commit('setStylesBuffer', element)
    },

    setDevice ({ state, commit }, value) {
      commit('device', (typeof value !== 'undefined') ? value : 'is-desktop')

      if (value === 'is-mobile') {
        commit('isMobile', true)
      } else {
        commit('isMobile', false)
      }
    },

    toggleModal ({ state, commit }, value) {
      commit('isShowModal', (typeof value !== 'undefined') ? value : !state.isShowModal)
    }
  },

  namespaced: true
}
