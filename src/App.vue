<template>
    <div id="app">
        <router-view v-if="!loading"></router-view>
        <vue-progress-bar></vue-progress-bar>
        <v-style>
          <template>
            {{ `@import url("https://fonts.googleapis.com/css?family=${fontsNameStr}&display=swap&subset=${fontsLanguages}")` }}
          </template>
        </v-style>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

export default {
  name: 'app',
  data () {
    return {
      section: 'Head',
      loading: true
    }
  },

  computed: {
    ...mapState(['isSaved']),
    ...mapState(['currentLanding']),

    fonts () {
      return this.currentLanding.settings.fonts || {}
    },

    fontsNameStr () {
      let str = ''

      for (let key in this.fonts) {
        str += `${key}:400,600|`
      }

      return str
    },

    fontsLanguages () {
      let langs = []

      for (let key in this.fonts) {
        if (this.fonts[key].subsets.length) {
          this.fonts[key].subsets.forEach(item => {
            langs = [
              ...langs,
              item
            ]
          })
        }
      }

      return langs.join(',')
    }
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
  },

  mounted () {
    const body = document.querySelector('body')

    body.classList.add('b-body_app')
  }
}
</script>

<style lang="sass">
@import 'assets/sass/app'
</style>
