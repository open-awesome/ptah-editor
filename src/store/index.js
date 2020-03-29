import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash-es'
import api from '@store/api'
import Sidebar from './Sidebar'
import Landing from './Landing'
import User from './User'
import vOutsideEvents from 'vue-outside-events'
import PageTweaks from './PageTweaks/PageTweaks'
import Vuebar from 'vuebar'

Vue.use(Vuex)
Vue.use(vOutsideEvents)
Vue.use(Vuebar)

const demoLanding = 'https://s3.protocol.one/files/Demo-page-2020-v5.json'
const FONTS = {
  'Lato': {
    variants: ['regular'],
    subsets: ['latin', 'cyrillic']
  },
  'Montserrat': {
    variants: ['regular'],
    subsets: ['latin', 'cyrillic']
  }
}
const SETUP_FONTS = {
  'h1': 'Montserrat',
  // 'h2': 'Montserrat',
  // 'h3': 'Lato',
  'p': 'Lato',
  'btn': 'Montserrat'
}

const state = {
  storefrontPreview: false,
  landings: [],
  currentLanding: {
    settings: {
      fonts: FONTS,
      setupFonts: SETUP_FONTS,
      imageForPalette: null,
      palette: []
    }
  },
  isSaved: false,
  slug: '', // landing ID
  name: '',
  version: null // landing version
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
  fetchLandings ({ commit }) {
    return api.request({
      url: 'landings',
      method: 'get'
    }).then((response) => {
      commit('updateLandings', response.landings)
      return response.landings
    })
  },

  /**
   * Get current landing data
   * @param state
   * @param commit
   * @param slug
   */
  getLandingData ({ state, commit }, slug) {
    if (state.slug === slug) {
      return Promise.resolve(true)
    }

    commit('slug', slug)

    return api.request({
      url: `landings/${slug}`,
      method: 'get'
    })
      .then((data) => {
        let landing = data.landing
        let fonts = {}
        let setupFonts = {}

        if (typeof landing === 'string') {
          landing = JSON.parse(landing)
        }

        if (!landing.settings.fonts) {
          fonts = FONTS
        }

        if (!landing.settings.setupFonts) {
          setupFonts = SETUP_FONTS
        }

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
          },
          script: '',
          css: '',
          cookiesPolicy: {
            enabled: false,
            pdf: 'https://s3.protocol.one/src/o_1ohKcv.pdf'
          },
          mailchimpUrl: false,
          mailchimpList: false,
          name: data.name,
          fonts: fonts,
          setupFonts: setupFonts
        })
        commit('isSaved', false)
        commit('updateCurrentLanding', landing)
        commit('name', data.name)
        commit('version', data.currentVersion)

        return landing
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  /**
   * Returns the demo landing page for the guest user
   * @param dispatch
   * @param slug
   * @returns {Promise}
   */
  getLandingForUser ({ dispatch }, slug) {
    return localStorage.getItem('guest') !== null ?
      dispatch('fetchLandingFromFile', { slug, url: demoLanding }) : dispatch('getLandingData', slug)
  },

  /**
   * Get landing from url
   * @param commit
   * @param slug
   * @returns {Promise<Response>}
   */
  fetchLandingFromFile ({ state, commit }, { slug, url, name }) {
    let nameLanding = name || state.name

    return fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        data['slug'] = slug

        if (nameLanding === '') {
          nameLanding = data.name
        }

        commit('name', nameLanding)
        data.settings['name'] = nameLanding

        if (!data.settings.fonts) {
          data.settings['fonts'] = FONTS
        }

        if (!data.settings.setupFonts) {
          data.settings['setupFonts'] = SETUP_FONTS
        }

        commit('slug', slug)
        commit('isSaved', false)
        commit('version', 1)
        commit('updateCurrentLanding', data)

        return data
      })
  },

  /**
   * Create new landing
   * @param state
   * @param commit
   * @param name
   * @param sections
   */
  createLanding ({ state, commit }, { name, sections }) {
    return api.request({
      url: 'landings',
      method: 'post',
      params: {
        name,
        landing: {
          title: name,
          settings: {
            title: name
          },
          sections
        }
      }
    }).then((response) => {
      commit('name', name)

      return response
    })
  },

  /**
   * Delete landing by id
   * @param state
   * @param id
   */
  deleteLanding ({ state, commit }, id) {
    return api.request({
      url: `landings/${id}`,
      method: 'delete'
    }).then(() => {
      commit('updateLandings', _.filter(state.landings, (o) => o._id !== id))
    })
  },

  /**
   * Save landing data
   * @param state
   * @param commit
   * @param data - JSON representation of the builder
   */
  saveLanding: _.throttle(({ state, commit }, data) => {
    // @todo save all data in the store properyly
    const parsedData = JSON.parse(data)
    const mergedData = {
      ...parsedData,
      settings: state.currentLanding.settings
    }
    const resultDataString = JSON.stringify(mergedData)

    return api.request({
      url: `landings/${state.slug}`,
      method: 'patch',
      params: {
        name: state.name,
        baseVersion: state.version,
        landing: resultDataString
      }
    })
      .then((data) => {
        commit('version', data.currentVersion)
        return commit('isSaved', data.currentVersion)
      })
      .catch(() => {
        commit('isSaved', 'error')
      })
  }, 2800),

  /**
   * Copy
   * @param dispatch
   * @param ids {Array} array of lansing ids
   * @returns {*}
   */
  copyLanding ({ dispatch }, ids) {
    return api.request({
      url: `landings/copy`,
      method: 'POST',
      params: {
        ids
      }
    }).then(() => {
      dispatch('fetchLandings')
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
  },

  /**
   * Stores settings fonts
   *
   * @param {Object} fonts of settings data
   */
  storeSaveSettingsFonts ({ state, commit }, fontsList) {
    const landingData = _.merge({}, state.currentLanding.settings, {
      fonts: fontsList
    })

    commit('updateCurrentLandingSettings', landingData)
    commit('isSaved', false)
  },

  /**
   * Stores settings setup fonts
   *
   * @param {Object} setup fonts of settings data
   */
  storeSaveSettingsSetupFonts ({ state, commit }, setupFonts) {
    const landingData = _.merge({}, state.currentLanding.settings, {
      setupFonts: setupFonts
    })

    commit('updateCurrentLandingSettings', landingData)
    commit('isSaved', false)
  },

  /**
   * Stores settings palette for page
   *
   * @param {Array} colors
   */
  storeSaveSettingsPalette ({ state, commit }, { palette, image }) {
    const landingData = _.merge({}, state.currentLanding.settings, {
      imageForPalette: image
    })

    landingData.palette = palette

    commit('updateCurrentLandingSettings', landingData)
    commit('isSaved', false)
  },

  clearSlug ({ commit }) {
    commit('slug', '')
  },

  clearLandingData ({ commit, state }) {
    let lnd = state.currentLanding
    commit('updateCurrentLanding', {
      slug: lnd.slug,
      title: lnd.title,
      settings: lnd.settings,
      sections: []
    })
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

  updateCurrentLandingSettings (state, settings) {
    state.currentLanding.settings = settings
  },

  isSaved (state, value) {
    state.isSaved = value
  },

  slug (state, value) {
    state.slug = value
  },

  name (state, value) {
    state.name = value
  },

  version (state, value) {
    state.version = value
  }
}

const modules = {
  Sidebar,
  PageTweaks,
  Landing,
  User
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})
