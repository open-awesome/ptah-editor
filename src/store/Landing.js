export default {
  state: {
    groupData: {}, // group text
    sectionData: {} // saved section data
  },

  mutations: {
    updateGroupData (state, group) {
      state.groupData[group.name] = group.data
    },

    updateSectionData (state, section) {
      state.sectionData[section.name] = section.data
    },

    clear (state) {
      state.groupData = {}
    }
  },

  actions: {
    updateGroupData ({ commit }, { name, data }) {
      commit('updateGroupData', { name, data })
    },

    updateSectionData ({ commit }, { name, data }) {
      commit('updateSectionData', { name, data })
    }
  },

  namespaced: true
}
