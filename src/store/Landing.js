const STACK_SIZE = 5

export default {
  state: {
    groupData: {}, // group text
    sectionData: {}, // saved section data,
    groups: [], // landings sections groups
    savedStates: [] // stack of saved states
  },

  mutations: {
    updateGroupData (state, group) {
      state.groupData[group.name] = group.data
    },

    updateSectionData (state, section) {
      state.sectionData[section.name] = section.data
    },

    updateGroups (state, groups) {
      state.groups = groups
    },

    clear (state) {
      state.groupData = {}
    },

    saveState (state, landing) {
      state.savedStates.push(landing)

      if (state.savedStates.length > STACK_SIZE) {
        state.savedStates.shift()
      }
    }
  },

  actions: {
    updateGroupData ({ commit }, { name, data }) {
      commit('updateGroupData', { name, data })
    },

    updateSectionData ({ commit, dispatch }, { name, data }) {
      commit('updateSectionData', { name, data })
    },

    updateGroups ({ commit }, groups) {
      commit('updateGroups', groups)
    },

    saveState ({ commit, dispatch }, landing) {
      commit('saveState', landing)
      dispatch('saveLanding', landing, { root: true })
    }
  },

  namespaced: true
}
