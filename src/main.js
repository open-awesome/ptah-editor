import 'es6-promise/auto'
import 'setimmediate'

import VueRouter from 'vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueScrollTo from 'vue-scrollto'

import '@components/_globals'

import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import AppView from './App.vue'

import en from '@assets/lang/en.json'
import ru from '@assets/lang/ru.json'

Vue.use(VueRouter)
Vue.use(Vuex)
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

new Vue(
  {
    router: router,
    store: store,
    data: {},
    render: h => h(AppView),
    i18n
  }
).$mount('#root')
