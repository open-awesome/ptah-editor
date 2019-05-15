<script>
import { mapState, mapActions } from 'vuex'
import { merge } from 'lodash-es'

export default {
  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    elRadius: {
      get () {
        return parseInt(this.styles['border-radius']) || 0
      },

      set (radius) {
        let styles = {
          'border-radius': `${radius}px`
        }
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { styles }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', ['updateSettingOptions'])
  }
}
</script>

<template>
  <div class="b-border-radius-control">
    <base-range-slider v-model="elRadius" label="Corner radius" step="1" min="0" max="100" @change="changeRadius">
      {{ elRadius }} <span class="b-border-radius-control__px">px</span>
    </base-range-slider>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-border-radius-control
  margin-top: 2.2rem
  &__px
    color: $grey-middle
</style>
