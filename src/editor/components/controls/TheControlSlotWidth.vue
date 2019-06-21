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
import { mapState } from 'vuex'

export default {
  name: 'TheControlSlotWidth',

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectSection'
    ]),

    slot () {
      return this.settingObjectSection.get(this.sandbox.container) || {}
    },

    width: {
      get () {
        return this.slot.width
      },

      set (value) {
        this.settingObjectSection.set(this.sandbox.container, {
          ...this.slot, width: value
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-control
  border-bottom: 0.2rem dotted rgba(0, 0, 0, 0.15)
  padding-bottom: 2.5rem
  margin-bottom: 2.5rem
</style>
