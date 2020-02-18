import axios from 'axios'
import router from '@src/router'
import api from './api'

export default {
  state: {
    access_token: '',
    isAuth: false,
    mcLists: [], // user mailchimp lists,
    user: null,
    guest: false
  },

  mutations: {
    setToken (state, token) {
      state.access_token = token
    },

    setAuth (state, value) {
      state.isAuth = value
    },

    setLists (state, value) {
      state.mcLists = value
    },

    setUser (state, value) {
      state.user = value
    },

    setGuestUser (state, value) {
      state.guest = value
      if (value) {
        localStorage.setItem('guest', value)
      } else {
        localStorage.removeItem('guest')
      }
    }
  },

  actions: {
    /**
     * Set new access token to store and localeStorage
     * @param commit
     * @param token
     */
    setToken ({ commit }, token) {
      localStorage.setItem('token', token)
      commit('setGuestUser', false)
      commit('setAuth', true)
      commit('setToken', token)
    },

    /**
     * Refresh expired token
     * @param commit
     * @param state
     * @param dispatch
     * @returns {Promise.<T>|Promise<any>|Promise}
     */
    refreshToken ({ state, dispatch }) {
      return axios.get(`${process.env.VUE_APP_DOMAIN}/auth1/refresh`, {
        // this method requires only cookies for authrization
        withCredentials: true
      })
        .then((response) => {
          dispatch('setToken', response.data.access_token)

          return response
        })
        .catch((error) => {
          console.warn(error)
          dispatch('logout')
        })
    },

    logout ({ commit }) {
      axios.get(`${process.env.VUE_APP_DOMAIN}/auth1/logout`, {
        withCredentials: true
      })
      localStorage.removeItem('token')
      commit('setAuth', false)
      commit('setToken', '')
      router.push({ path: `/login` })
    },

    /**
     * Get user info
     * @param commit
     * @returns {userId, mailchimpIntegration}
     */
    getUser ({ commit }) {
      return api.request({
        url: `user`,
        method: 'get'
      })
        .then(data => {
          commit('setUser', data)
        })
    },

    /**
     * Get user mailchimp lists
     * @param commit
     */
    mailchimpLists ({ commit }) {
      return api.request({
        url: `mailchimp/maillists`,
        method: 'get'
      })
        .then((lists) => {
          commit('setLists', lists)
          return lists
        })
    }
  },

  namespaced: true
}
