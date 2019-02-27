import axios from 'axios'

export default {
  state: {
    access_token: '',
    isAuth: false
  },

  mutations: {
    setToken (state, token) {
      state.access_token = token
    },

    setAuth (state, value) {
      state.isAuth = value
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
          console.log(response)
          dispatch('setToken', response.data.accessToken)

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
      // TODO: go to login page
    }
  },

  namespaced: true
}
