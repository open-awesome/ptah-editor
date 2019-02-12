<template>
  <builder-modal-content-layout>
    <div class="b-add-js-scripts">
      <base-heading level="2">Add Js Scripts</base-heading>
      <textarea class="b-add-js-scripts__textarea" placeholder="Add Js Scripts" v-model="script"/>
    </div>
    <div slot="controls">
      <BaseButton color="gray" :transparent="true" @click="$emit('requestClose')">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
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

  watch: {
    currentLanding () {
      this.updateScript()
    }
  },

  mounted () {
    this.updateScript()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),

    updateScript () {
      const sScript = this.currentLanding.settings.script
      this.script = sScript
    },

    applySettings () {
      const data = {
        script: this.script
      }

      this.storeSettings(data)
      this.$emit('requestClose')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-add-js-scripts
  height: 30rem
  &__textarea
    width: 100%
    height: 100%
</style>
