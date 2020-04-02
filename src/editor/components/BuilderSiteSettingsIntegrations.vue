<template>
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
          <icon-base name="settings" color="#00ADB6"></icon-base>
        </span>
    </div>

    <div class="b-integrations__component"
         v-if="isIntegrationVisible"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { last } from 'lodash-es'

export default {
  name: 'BuilderSiteSettingsIntegrations',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      integrations: [
        {
          name: 'googleTag',
          label: 'Google Tag',
          icon: 'https://s3.protocol.one/src/o_kfsYQ.png'
        },
        {
          name: 'googleAnalitycs',
          label: 'Google Analitycs',
          icon: 'https://s3.protocol.one/src/o_2Gb9Ul.png'
        },
        {
          name: 'mailchimp',
          label: 'Mailchimp',
          icon: 'https://s3.protocol.one/src/o_CaMZ6.png'
        }
      ],
      gtmId: '',
      gtag: ''
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    isIntegrationVisible () {
      return last(this.$route.path.split('/')) !== 'integrations'
    }
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
      this.close()
    },

    selectIntegration (integrationID) {
      this.$router.push(`/editor/${this.$route.params.slug}/settings/integrations/${integrationID}`)
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

.b-integrations
  display: flex
  flex-direction: column
  align-items: center
  height: 100%
  &__item
    width: 28rem
    height: $size-step*5
    background-position: center center
    border: 2px solid #A2A5A5
    box-sizing: border-box
    border-radius: 10px
    margin: $size-step/2 0

    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    position: relative

    cursor: pointer
    &:hover
      // background-color: $grey
      border: 2px solid $main-green
      transition: all .3s cubic-bezier(.2,.85,.4,1.275)
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
      .b-integrations__item-label
        color: $main-green
  &__textarea
    width: 100%
    height: 100%
  &__component
    width: 100%
    height: 100%
  &__help
    margin-left: 1rem
    & svg
      fill: $grey
    &:hover
      & svg
        fill: $main-green
</style>
