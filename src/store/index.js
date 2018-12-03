import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import api from '@store/api'
import Sidebar from './Sidebar'
import vOutsideEvents from 'vue-outside-events'
import BuilderModalContent from './BuilderModalContent'
import PageTweaks from './PageTweaks/PageTweaks'

Vue.use(Vuex)
Vue.use(vOutsideEvents)

const state = {
  storefrontPreview: false,
  landings: [],
  currentLanding: {
    settings: {}
  },
  isSaved: false
}

const getters = {
  storefrontPreview: (state) => {
    return state.storefrontPreview
  }
}

const actions = {
  /**
   * Get a list of saved landings
   * @param state
   * @param commit
   * @returns {*}
   */
  fetchLandings ({ state, commit }) {
    return api.getLandingsList()
      .then((presets) => {
        commit('updateLandings', presets)
        return presets
      })
  },

  /**
   * Get current landing data
   * @param state
   * @param commit
   * @param slug
   */
  getLandingData ({ state, commit }, slug) {
    return api.getLanding(slug)
      .then((data) => {
        const landing = data || {}
        landing.settings = _.defaultsDeep(landing.settings, {
          ogTags: [],
          video: '',
          videoPosition: '',
          title: '',
          fullPageScroll: 'no',
          gtmId: '',
          gtag: '',
          favicon: 'https://protocol.one/wp-content/uploads/2018/09/03.png',
          styles: {
            backgroundImage: '',
            backgroundColor: '',
            backgroundPositionX: '',
            backgroundPositionY: '',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        })
        commit('isSaved', false)
        commit('updateCurrentLanding', landing)
        return landing
      })
  },

  /**
   * Save landing data
   * @param state
   * @param commit
   * @param data - JSON representation of the builder
   */
  saveLanding ({ state, commit }, data) {
    // @todo save all data in the store properyly
    const parsedData = JSON.parse(data)
    const mergedData = {
      ...parsedData,
      settings: state.currentLanding.settings
    }
    const resultDataString = JSON.stringify(mergedData)

    return api.saveLanding(state.currentLanding.slug, resultDataString)
      .then(() => {
        return commit('isSaved', true)
      })
  },

  /**
   * Stores settings data
   *
   * @param {Object} settingsPart some fields of settings data
   */
  storeSettings ({ state, commit }, settingsPart) {
    const landingData = _.merge({}, state.currentLanding, {
      settings: settingsPart
    })

    commit('updateCurrentLanding', landingData)
    commit('isSaved', false)
  }
}

const mutations = {
  storefrontPreview (state, status) {
    state.storefrontPreview = status
  },

  updateLandings (state, data) {
    state.landings = data
  },

  updateCurrentLanding (state, data) {
    state.currentLanding = data
  },

  isSaved (state, value) {
    state.isSaved = value
  }
}

const modules = {
  Sidebar,
  BuilderModalContent,
  PageTweaks
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})
