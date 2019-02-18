<template>
  <builder-modal-content-layout>
    <div class="b-integrations">
      <!-- Google -->
      <base-fieldset>
        <base-heading level="2">Google</base-heading>
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

       <base-fieldset-row width="short">
          <BaseTextField label="Google site tag" v-model="gtag" placeholder="UA-XXXXXXXX-X" />
        </base-fieldset-row>
      </base-fieldset>
    </div>
    <div slot="controls">
      <BaseButton color="gray" size="middle" :transparent="true" @click="$emit('requestClose')">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" size="middle" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsIntegrations',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      gtmId: '',
      gtag: ''
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  watch: {
    currentLanding () {
      this.updateIntegrations()
    }
  },

  mounted () {
    this.updateIntegrations()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),

    updateIntegrations () {
      const settings = this.currentLanding.settings

      this.gtmId = settings.gtmId
      this.gtag = settings.gtag
    },

    applySettings () {
      const data = {
        gtmId: this.gtmId,
        gtag: this.gtag
      }

      this.storeSettings(data)
      this.$emit('requestClose')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-integrations
  height: $size-step*5
  &__textarea
    width: 100%
    height: 100%
  &__help
    margin-left: 1rem
    & svg
      fill: $grey
    &:hover
      & svg
        fill: $dark-blue-krayola
</style>
