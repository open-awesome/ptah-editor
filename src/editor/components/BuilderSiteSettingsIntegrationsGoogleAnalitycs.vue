<template>
  <builder-modal-content-layout
    class="b-integrations-google-analitycs"
    :noScroll="true"
    >
    <div class="b-integrations-google-analitycs__inner">
      <base-caption>Google Analitycs</base-caption>
      <BaseTextField label="Google site tag" v-model="gtag" placeholder="UA-XXXXXXXX-X" />
    </div>

    <div slot="controls" class="b-integrations-google-analitycs__controls">
      <BaseButton size="middle" color="gray" :transparent="true" @click="back()">{{ $t('nav.back') }}</BaseButton>
      <BaseButton size="middle" color="blue" @click="applySettings">{{ $t('nav.apply') }}</BaseButton>
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
      this.back()
    },

    back () {
      this.$router.push(`/editor/${this.$route.params.slug}/settings/integrations`)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-integrations-google-analitycs
  height: auto

  &__inner
    padding: 0 1.5rem 0 2.5rem
  &__controls
    justify-content: flex-start !important
    border-top: none !important

</style>
