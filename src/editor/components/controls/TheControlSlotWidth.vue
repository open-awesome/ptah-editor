<template>
  <div class="b-panel__control">
    <div class="b-panel__row _v-center">
      <base-label>
        Width
      </base-label>
      <div class="b-panel__col">
        <base-range-slider
          v-model="width"
          label=""
          step="1"
          :min="minWidth"
          :max="maxWidth"
          @change="setWidth"
        >
          <base-number-input
            :value="widthValue"
            :maximum="maxWidth"
            @input="setWidthValue"
          />
        </base-range-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { find } from 'lodash-es'

export default {
  name: 'TheControlSlotWidth',

  data () {
    return {
      widthValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectSection'
    ]),

    slot () {
      return this.settingObjectSection.get(this.sandbox.container) || {}
    },

    minWidth () {
      return this.slot.minWidth || 2
    },

    maxWidth () {
      return this.slot.maxWidth || 12
    },

    width: {
      get () {
        return parseInt(this.slot.width)
      },

      set (value) {
        let diff = value - this.width

        this.settingObjectSection.set(this.sandbox.container, {
          ...this.slot, width: value
        })

        if (this.slot.grow) {
          this.changeAdjacentSlots(diff)
        }
      }
    }
  },

  methods: {
    changeAdjacentSlots (diff) {
      let columnsWidth = this.columns().map(slot => slot.width)
      let name
      let adjacentSlot
      let width

      if (diff > 0) {
        name = find(this.columns(), slot => slot.width === Math.max.apply(null, columnsWidth)).name
        adjacentSlot = this.settingObjectSection.get(name)
      } else {
        name = find(this.columns(), slot => slot.width === Math.min.apply(null, columnsWidth)).name
        adjacentSlot = this.settingObjectSection.get(name)
      }

      width = adjacentSlot.width + (diff * -1)

      this.settingObjectSection.set(adjacentSlot.selfName, {
        ...adjacentSlot, width
      })
    },

    columns () {
      return this.slot.grow.map(path => this.settingObjectSection.get(path)).map(slot => {
        return { width: slot.width, name: slot.selfName || slot.name }
      })
    },

    setWidth (value) {
      this.widthValue = value
    },

    setWidthValue (value) {
      this.width = value
    }
  },

  mounted () {
    this.widthValue = this.width
  }
}
</script>
