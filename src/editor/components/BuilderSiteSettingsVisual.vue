<template>
  <builder-modal-content-layout>
    <div class="b-builder-site-settings-visual">
      <base-heading level="2">Visual</base-heading>
    </div>

    <div slot="controls">
      <BaseButton color="gray" @click="$emit('requestClose')">Cancel</BaseButton>
      <BaseButton @click="applySettings">Save</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsVisual',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    }
  },

  mounted () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),
    updateSettings () {
      // const settings = this.currentLanding.settings
    },
    applySettings () {
      const data = {
      }

      this.storeSettings(data)
      this.$emit('requestClose')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-builder-site-settings-visual
</style>
