import { throttle, last } from 'lodash-es'

const STACK_SIZE = 7

export default {
  state: {
    groupData: {}, // group text
    sectionData: {}, // saved section data,
    groups: [], // landings sections groups
    savedStates: [], // stack of saved states,
    textEditorActive: false,
    currentStateNumber: [],
    undoFlag: false
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
    },

    textEditor (state, value) {
      state.textEditorActive = value
    },

    currentStateNumber (state, value) {
      state.currentStateNumber = value
    },

    undoFlag (state, value) {
      state.undoFlag = value
    },

    clearStateStack (state) {
      state.savedStates = []
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

    saveState: throttle(({ dispatch, state, commit }, landing) => {
      if (state.undoFlag) {
        commit('undoFlag', false)
        return
      }

      if (last(state.savedStates) !== landing && localStorage.getItem('guest') === null) {
        dispatch('saveStateHandler', landing)
      }
    }, 3000),

    saveStateHandler ({ commit, dispatch, state }, landing) {
      commit('saveState', landing)
      commit('currentStateNumber', state.savedStates.length)
      dispatch('saveLanding', landing, { root: true })
    },

    setState ({ state, commit }, number) {
      if (state.savedStates[number]) {
        commit('currentStateNumber', number)
        commit('updateCurrentLanding', JSON.parse(state.savedStates[number]), { root: true })
        commit('undoFlag', true)
      } else {
        console.warn('Cannot load the specified state.', ` -- state: ${number}`)
      }
    }
  },

  namespaced: true
}
