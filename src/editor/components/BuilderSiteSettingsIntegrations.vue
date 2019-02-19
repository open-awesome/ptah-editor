<template>
  <builder-modal-content-layout>
    <div class="b-integrations">
      <div class="b-integrations__item"
        v-if="!isIntegrationVisible"
        v-for="integration in integrations"
        :key="integration.name"
        @click="selectIntegration(integration.name)"
        >
        <div class="b-integrations__item-icon"
          :style="{'background-image': 'url(' + integration.icon + ')'}"
          >
        </div>
        <div class="b-integrations__item-label">
          {{ integration.label }}
        </div>
        <span class="b-integrations__item-settings">
          <icon-base name="settings" color="#2275D7"></icon-base>
        </span>
      </div>

      <div style="width: 100%"
        v-if="isIntegrationVisible"
        >
        <component
          :is="integrationComponent"
          @back="back"
          >
        </component>
      </div>

      <!-- Google -->
      <!--base-fieldset>
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
      </base-fieldset-->
    </div>
    <div slot="controls">
      <BaseButton color="gray" size="middle" :transparent="true" @click="$emit('requestClose')">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" size="middle" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import BuilderSiteSettingsIntegrationsGoogleTag from './BuilderSiteSettingsIntegrationsGoogleTag'
import BuilderSiteSettingsIntegrationsGoogleAnalitycs from './BuilderSiteSettingsIntegrationsGoogleAnalitycs'
import BuilderSiteSettingsIntegrationsMailchimp from './BuilderSiteSettingsIntegrationsMailchimp'

export default {
  name: 'BuilderSiteSettingsIntegrations',

  components: {
    BuilderModalContentLayout,
    BuilderSiteSettingsIntegrationsGoogleTag,
    BuilderSiteSettingsIntegrationsGoogleAnalitycs,
    BuilderSiteSettingsIntegrationsMailchimp
  },

  data () {
    return {
      integrations: [
        {
          name: 'googleTag',
          label: 'Add Google Tag',
          icon: 'https://gn926.cdn.stg.gamenet.ru/0/7m0Jd/o_kfsYQ.png'
        },
        {
          name: 'googleAnalitycs',
          label: 'Add Google Analitycs',
          icon: 'https://gn517.cdn.stg.gamenet.ru/0/7m0Iw/o_2Gb9Ul.png'
        },
        {
          name: 'mailchimp',
          label: 'Add Mailchimp',
          icon: 'https://gn831.cdn.stg.gamenet.ru/0/7m0JQ/o_CaMZ6.png'
        }
      ],
      gtmId: '',
      gtag: ''
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    ...mapState('BuilderModalContent', ['isIntegrationVisible', 'integrationID']),
    ...mapGetters('BuilderModalContent', ['integrationComponent'])
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
    ...mapActions('BuilderModalContent', {
      setIntegrationContent: 'setIntegration'
    }),

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
    },

    selectIntegration (integrationID) {
      this.setIntegrationContent(integrationID)
    },

    back () {
      console.log('setIntegrationContent')
      this.setIntegrationContent('')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-integrations
  height: $size-step*5

  display: flex
  &__item
    width: $size-step*6
    height: $size-step*5

    background-color: $ligth-grey
    background-position: center center
    border-radius: 0.4rem
    margin: $size-step/2

    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    position: relative

    cursor: pointer
    &:hover
      background-color: $grey
      transition: all .3s cubic-bezier(.2,.85,.4,1.275)
    &:first-child
      margin-left: 0
    &-last-child
      margin-right: 0
    &-icon
      display: inline-block
      width: $size-step*2
      height: $size-step*2
    &-label
      font-size: 1.6rem
      color: $dark-grey
    &-settings
      display: none
      position: absolute
      top: $size-step/2
      left: $size-step/2
    &:hover
      .b-integrations__item-settings
        display: block
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
