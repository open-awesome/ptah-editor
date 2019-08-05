<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement'
    ]),

    width: {
      get () {
        return this.getStyleNumberValue('width')
      },

      set (value) {
        this.update('width', value)
      }
    },

    height: {
      get () {
        return this.getStyleNumberValue('height')
      },

      set (value) {
        this.update('height', value)
      }
    },

    maxProps () {
      let parents = {}
      let max = {}

      parents['width'] = this.settingObjectElement.closest('.b-draggable-slot')
      parents['height'] = this.settingObjectElement.closest('section')

      max['width'] = parents['width'].offsetWidth
      max['height'] = parseInt(parents['height'].offsetHeight / 2)

      return max
    }

  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    getStyleNumberValue (prop) {
      let s = _.get(this.settingObjectOptions, `styles[${prop}]`)

      if (s === undefined) {
        // get values from node
        let style = window.getComputedStyle(this.settingObjectElement)
        s = style[prop]
      }

      return parseInt(s)
    },

    update (prop, value) {
      let styles = {}

      if (value === '') value = 0

      styles[prop] = value + 'px'
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    }
  }
}
</script>

<template>
  <div class="b-size">
    <base-label>
      Size
    </base-label>
    <div class="b-size-controls">
      <div class="b-size-controls__control">
        <base-number-field :maximum="maxProps['width']" v-model="width" label="Width" class=""></base-number-field>
      </div>
      <div class="b-size-controls__control">
        <base-number-field :maximum="maxProps['height']" v-model="height" label="Height" class=""></base-number-field>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-size
  margin-top: $size-step/2
  &-controls
    display: flex
    justify-content: stretch
    align-items: flex-start
    &__control
      width: 50%
      margin-right: $size-step/4

</style>
