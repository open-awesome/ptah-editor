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
      return axios({
        url: `${process.env.DOMAIN}/refresh/`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.access_token}`
        }
      })
        .then((response) => {
          dispatch('setToken', response.access_token)

          return response
        })
        .catch((error) => {
          console.warn(error)
          dispatch('logout')
        })
    },

    logout ({ commit }) {
      localStorage.removeItem('token')
      commit('setAuth', false)
      commit('setToken', '')
      // TODO: go to login page
    }
  },

  namespaced: true
}
