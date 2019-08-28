<template>
    <div id="app">
        <router-view v-if="!loading"></router-view>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      section: 'Head',
      loading: true
    }
  },

  computed: {
    ...mapState(['isSaved'])
  },

  watch: {
    isSaved (value) {
      if (value === 'error') {
        this.$message.error('Save failed', {
          duration: 2500,
          dismissible: false
        })
      } else {
        this.$message.info('Saved', {
          duration: 500,
          dismissible: false
        })
      }
    }
  },

  created () {
    this.loading = false
  },

  methods: {
    ...mapActions('User', ['refreshToken'])
  }
}
</script>

<style lang="sass">
@import 'assets/sass/app'
</style>
