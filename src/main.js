import 'es6-promise/auto'
import 'setimmediate'

import VueRouter from 'vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueScrollTo from 'vue-scrollto'
import VueProgressBar from 'vue-progressbar'

import axios from 'axios'

import '@components/_globals'

import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import AppView from './App.vue'
import VueCircleSlider from 'vue-circle-slider'

import en from '@assets/lang/en.json'
import ru from '@assets/lang/ru.json'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCircleSlider)
Vue.use(VueI18n)

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

sync(store, router)

const messages = {
  en, ru
}
const i18n = new VueI18n({
  locale: 'en',
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
  if (error.code !== 401) {
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

new Vue(
  {
    router: router,
    store: store,
    data: {},
    render: h => h(AppView),
    i18n
  }
).$mount('#root')
