export default {
  state: {
    groupData: {}
  },

  getters: {

  },

  mutations: {
    updateGroupData (state, group) {
      state.groupData[group.name] = group.data
    },

    clear (state) {
      state.groupData = {}
    }
  },

  actions: {
    updateGroupData ({ commit }, { name, data }) {
      commit('updateGroupData', { name, data })
    }
  },

  namespaced: true
}
