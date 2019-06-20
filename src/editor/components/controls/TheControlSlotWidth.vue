<template>
  <div class="control-width">
    <div class="b-control">
      <base-range-slider
        v-model="width"
        label="Slot width (columns)"
        step="1"
        min="2"
        max="12">
        {{ width }}
      </base-range-slider>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'TheControlSlotWidth',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectSection'
    ]),

    width: {
      get () {
        return this.settingObjectOptions.width
      },

      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          width: value
        }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ])
  }
}
</script>

<style lang="sass" scoped>
.b-control
  border-bottom: 0.2rem dotted rgba(0, 0, 0, 0.15)
  padding-bottom: 2.5rem
  margin-bottom: 2.5rem
</style>
