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
    console.log(111, localStorage.getItem('token'))
    if (localStorage.getItem('token') !== null) {
      console.log(11)
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
