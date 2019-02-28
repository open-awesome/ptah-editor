<template>
    <div id="app">
        <router-view v-if="!loading"></router-view>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      section: 'Head',
      loading: true
    }
  },

  created () {
    if (localStorage.getItem('token') !== null) {
      this.refreshToken().then(() => {
        this.loading = false
      })
    } else {
      this.loading = false
    }
  },

  methods: {
    ...mapActions('User', ['refreshToken'])
  }
}
</script>

<style lang="sass">
@import 'assets/sass/app'
</style>
