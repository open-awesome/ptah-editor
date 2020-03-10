import 'es6-promise/auto'
import 'setimmediate'

import VueRouter from 'vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueScrollTo from 'vue-scrollto'
import VueProgressBar from 'vue-progressbar'
import vClickOutside from 'v-click-outside'
import messageService from 'vue-update-message'

import axios from 'axios'

import '@components/_globals'

import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import AppView from './App.vue'
import VueGtag from 'vue-gtag'

import en from '@assets/lang/en.json'
import ru from '@assets/lang/ru.json'

import { truncate } from '@src/filters/truncate'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(vClickOutside)
Vue.use(messageService, {
  placement: 'bottom-right',
  mode: 'single'
})

Vue.use(VueScrollTo, {
  container: '.b-builder-layout-content__main .vb-content',
  duration: 500,
  easing: 'ease',
  offset: -80,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

if (process.env.VUE_APP_GTAG !== undefined) {
  Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_GTAG }
  })
}
if (process.env.NODE_ENV === 'production') {
  Raven
    .config(process.env.PUBLIC_HOST === 'http://ptah.super.com/' ? process.env.VUE_APP_SENTRY : process.env.VUE_APP_SENTRYTST,
      {
        debug: true
      })
    .addPlugin(RavenVue, Vue)
    .install()
}

sync(store, router)

const [messages, locale] = [
  { en, ru },
  localStorage.getItem('locale') !== null ? localStorage.getItem('locale') : 'en'
]
const i18n = new VueI18n({
  locale: locale,
  messages,
  fallbackLocale: 'en'
})

Vue.use(VueProgressBar, {
  color: 'rgb(34, 117, 215, .86)',
  failedColor: 'red',
  height: '3px'
})

// request interceptor
const createSetAuthInterceptor = options => config => {
  if (localStorage.getItem('token') !== null) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
}

const setAuthCb = createSetAuthInterceptor(localStorage.getItem('token'))
axios.interceptors.request.use(setAuthCb)

// response interceptor
let refreshTokenPromise

const createUpdateAuthInterceptor = (store, http) => async error => {
  if (error.response.status === 500 &&
    (error.response.config.url.indexOf('refresh') > -1 || error.response.config.url.indexOf('logout'))) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  if (error.response.data.error.code !== 401) {
    return Promise.reject(error)
  }

  if (!refreshTokenPromise) {
    refreshTokenPromise = store.dispatch('User/refreshToken')
  }

  await refreshTokenPromise
  refreshTokenPromise = null

  return http(error.config)
}

const updateAuthCb = createUpdateAuthInterceptor(store, axios)
axios.interceptors.response.use(null, updateAuthCb)

Vue.filter('truncate', truncate)

new Vue(
  {
    router: router,
    store: store,
    data: {},
    render: h => h(AppView),
    i18n
  }
).$mount('#root')
