<template>
<div class="b-iframe-control">
  <!-- IframeUrl -->
  <div class="b-iframe-control__control">
    <BaseTextField
      v-model="vUrl"
      label="URL"
      placeholder="https://www.url.com"
      :hasError="error.url"
      @input="validUrl(vUrl)"
    >
      <span slot="error">
        Invalid URL
      </span>
    </BaseTextField>
  </div>
</div>
</template>

<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import { isValidUrl } from '@editor/util'

export default {
  name: 'TheControlVideo',

  data () {
    return {
      vUrl: '',
      error: {
        url: false
      }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    settings () {
      return this.settingObjectOptions.settings
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    updateSettings (prop, value) {
      let settings = {}
      settings[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { settings }))
    },

    validUrl (url) {
      let v = true

      if (url !== '') {
        v = isValidUrl(url)
      }

      this.error.url = !v

      if (v === false) {
        return
      }

      this.updateSettings('url', url)
    }
  },

  mounted () {
    this.vUrl = this.settings.url
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-iframe-control
  &__header
    margin-bottom: .8rem

    display: flex
    align-items: center

    font-size: 2.2rem
    color: $dark-grey
    cursor: pointer
  &__title
    margin: 0
    font-weight: normal
    color: $dark-grey
  &__icon
    margin-left: .5rem
    margin-bottom: -.5rem

    transform: rotate(180deg)
    &.closed
      transform: rotate(0deg)

  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: $dark-grey
    display: flex
    align-items: center
    cursor: pointer
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
      & svg
        display: inline-block
        vertical-align: baseline
        margin-bottom: 0.2rem
  &__description
    padding: $size-step/8 0
    font-size: 1.2rem
    color: $dark-grey
  &__control
    margin-top: 2.2rem
</style>
