<template>
  <builder-modal-content-layout
    class="b-integrations-google-analitycs"
    >
    <div>
      <base-heading level="2">Google Tag Manager</base-heading>
        <base-fieldset-row width="short">
          <base-text-field
            v-model="gtmId"
            placeholder="GTM-XXXXXX">
            <template slot="label">
              GTM container ID
              <base-help
                :hasLink="true"
                link="https://developers.google.com/tag-manager/quickstart"
                >
              </base-help>
            </template>
          </base-text-field>
       </base-fieldset-row>
    </div>

    <div slot="controls" class="b-integrations-google-analitycs__controls">
      <BaseButton size="middle" color="gray" :transparent="true" @click="back()">{{ $t('nav.back') }}</BaseButton>
      <BaseButton size="middle" color="gray" @click="applySettings">{{ $t('nav.apply') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsIntegrationsGoogleTag',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      gtmId: ''
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

      this.gtmId = settings.gtmId
    },

    applySettings () {
      const data = {
        gtmId: this.gtmId
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
  &__controls
    justify-content: flex-start !important
    border-top: none !important

</style>
