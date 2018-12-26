import 'es6-promise/auto'
import 'setimmediate'

import VueRouter from 'vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import VueScrollTo from 'vue-scrollto'

import '@components/_globals'

import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import AppView from './App.vue'
import VueCircleSlider from 'vue-circle-slider'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCircleSlider)

Vue.use(VueScrollTo, {
  container: 'body',
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

new Vue(
  {
    router: router,
    store: store,
    data: {},
    render: h => h(AppView)
  }
).$mount('#root')
