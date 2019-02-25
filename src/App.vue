<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      section: 'Head'
    }
  },

  created () {
    if (localStorage.getItem('token') !== null) {
      this.refreshToken()
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
