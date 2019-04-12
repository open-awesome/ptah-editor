<template>
  <builder-modal-content-layout
    class="b-integrations-google-analitycs"
    >
    <div>
      <base-heading level="2">Mailchimp</base-heading>
    </div>

    <div slot="controls" class="b-integrations-google-analitycs__controls">
      <BaseButton size="middle" color="gray" :transparent="true" @click="back()">{{ $t('nav.back') }}</BaseButton>
      <BaseButton size="middle" color="gray" @click="applySettings">{{ $t('nav.apply') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsIntegrationsMailchimp',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
    }
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),

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
