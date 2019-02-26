<template>
  <builder-modal-content-layout
    class="b-integrations-google-analitycs"
    >
    <div>
      <base-heading level="2">Google Analitycs</base-heading>
      <base-fieldset-row width="short">
        <BaseTextField label="Google site tag" v-model="gtag" placeholder="UA-XXXXXXXX-X" />
      </base-fieldset-row>
    </div>

    <div slot="controls" class="b-integrations-google-analitycs__controls">
      <BaseButton size="middle" color="gray" :transparent="true" @click="$emit('back')">{{ $t('nav.back') }}</BaseButton>
      <BaseButton size="middle" color="gray" @click="applySettings">{{ $t('nav.apply') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsIntegrationsGoogleAnalitycs',

  components: {
    BuilderModalContentLayout
  },
          
  data () {
    return {
      gtag: ''
    }
  },
  
  computed: {
    ...mapState(['currentLanding'])
  },

  watch: {
    currentLanding () {
      this.updateGoogleTag()
    }
  },

  mounted () {
    this.updateGoogleTag()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),

    updateGoogleTag () {
      const settings = this.currentLanding.settings

      this.gtag = settings.gtag
    },

    applySettings () {
      const data = {
        gtag: this.gtag
      }

      this.storeSettings(data)
      this.$emit('back')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-integrations-google-analitycs
  height: auto
  &__controls
    justify-content: flex-start !important
    border-top: none !important

</style>
