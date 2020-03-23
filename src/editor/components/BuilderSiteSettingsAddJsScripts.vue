<template>
  <builder-modal-content-layout :noScroll="true">
    <div class="b-add-js-scripts">
      <base-caption>Add JS Scripts</base-caption>
      <textarea class="b-add-js-scripts__textarea" placeholder="Add Js Scripts" v-model="script"/>
    </div>
    <div class="b-add-js-scripts">
      <base-caption>Add custom CSS</base-caption>
      <textarea class="b-add-js-scripts__textarea" placeholder="Add custom CSS" v-model="css"/>
    </div>
    <div slot="controls">
      <BaseButton color="gray" size="middle" :transparent="true" @click="close()">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" size="middle" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import BaseCaption from '../../components/base/BaseCaption'

export default {
  name: 'BuilderSiteSettingsAddJsScripts',

  components: {
    BaseCaption,
    BuilderModalContentLayout
  },

  data () {
    return {
      script: '',
      css: ''
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  mounted () {
    this.script = this.currentLanding.settings.script
    this.css = this.currentLanding.settings.css
  },

  methods: {
    ...mapActions(['storeSettings']),
    ...mapActions('Sidebar', ['toggleSidebar']),

    applySettings () {
      this.storeSettings({
        script: this.script,
        css: this.css
      })

      this.close()
    },

    close () {
      this.toggleSidebar(false)
      this.$router.push(`/editor/${this.$route.params.slug}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-add-js-scripts
  height: 80%
  padding: 0 .5rem 0 1.5rem

  & + &
    margin-top: 2.5rem
  &__textarea
    border: 1px solid rgba(162, 165, 165, 0.5)
    box-sizing: border-box
    border-radius: 5px
    width: 100%
    height: 24rem
    padding: 2rem 2.2rem
    &:focus
      border: 2px solid $main-green
      outline: none
</style>
