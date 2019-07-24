<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {

  data () {
    return {
      error: {
        width: {
          value: false,
          text: 'Error'
        },
        height: {
          value: false,
          text: 'Error'
        }
      },
      max: {
        width: 0,
        height: 0
      }
    }
  },

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
      let parent = this.settingObjectElement.closest('.b-draggable-slot')

      this.max[prop] = parent[`offset${_.upperFirst(prop)}`]

      if (value > this.max[prop]) {
        this.error[prop].value = true
        this.error[prop].text = `Max ${prop} ${this.max[prop]}`

        value = this.max[prop]
      } else {
        this.error[prop].value = false
      }

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
        <base-number-field v-model="width" label="Width" :hasError="error.width.value" :errorText="error.width.text" class=""></base-number-field>
      </div>
      <div class="b-size-controls__control">
        <base-number-field v-model="height" label="Height" :hasError="error.height.value" :errorText="error.height.text" class=""></base-number-field>
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
