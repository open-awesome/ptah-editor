<template>
  <builder-modal-content-layout :noScroll="true">
    <div class="b-add-js-scripts">
      <base-heading level="2">Add Js Scripts</base-heading>
      <textarea class="b-add-js-scripts__textarea" placeholder="Add Js Scripts" v-model="script"/>
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

export default {
  name: 'BuilderSiteSettingsAddJsScripts',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      script: ''
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  mounted () {
    this.script = this.currentLanding.settings.script
  },

  methods: {
    ...mapActions(['storeSettings']),

    applySettings () {
      this.storeSettings({
        script: this.script
      })

      this.close()
    },

    close () {
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
  &__textarea
    width: 100%
    height: 100%
    padding: $size-step/2
</style>
