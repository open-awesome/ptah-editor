<script>
import { Sketch } from 'vue-color'
const DEFAULT_COLOR = 'rgba(0,0,0,1)'
export default {
  name: 'BaseColorPicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    Sketch
  },
  props: {
    value: {
      default: DEFAULT_COLOR
    },
    label: {
      type: String
    }
  },
  watch: {
    value (value) {
      this.pickerValue = this.getPreparedValue(this.value)
    }
  },
  data () {
    return {
      expanded: false,
      pickerValue: this.getPreparedValue(this.value)
    }
  },
  methods: {
    getPreparedValue (value) {
      if (typeof value === 'object' && !!value.rgba) {
        const color = Object.values(value.rgba).toString()
        return `rgba(${color})`
      }
      return value
    },
    changeColor (color) {
      this.$emit('change', color)
    }
  }
}
</script>

<template>
  <div class="b-picker">
    <div class="b-picker__row">
      <BaseDropdownMenu
        class="b-picker__palette"
        positionDropdown="left"
        >
        <div class="b-picker__preview"
          :style="{ 'background-color': pickerValue.rgba || pickerValue }"
          :title="pickerValue.rgba || pickerValue || 'Choose color'"
          >
        </div>
        <div slot="list">
          <Sketch :value="pickerValue" @input="changeColor"></Sketch>
        </div>
      </BaseDropdownMenu>
      <div
        class="b-picker__label"
        v-if="label !== ''"
       >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped="">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-picker
  position: relative
  width: 100%
  &__row
    display: flex
    align-items: center

    width: 100%
    cursor: pointer
  &__preview
    width: $size-step*1.5
    height: $size-step

    border-radius: 0.2rem
    background-color: $white
    border: 2px solid $ligth-grey
    &:hover
      border-color: $dark-blue-krayola
  &__label
    color: $dark-grey
    margin-left: $size-step/2
    &:first-letter
      text-transform: uppercase
  &__palette
    margin-top: .5rem

/deep/
  .b-pth-base-dropdown-menu__dropdown
    width: $size-step*8.5 !important
    max-height: none !important
    box-shadow: 0px 0 8rem rgba($black, 0.15) !important
    &_left
      left: -1.5rem !important
      padding: 0 0 1rem 0 !important

  .vc-sketch
    border: .1rem solid rgba(0, 0, 0, .15)
    box-shadow: none

    margin: 1.6rem

    background: $white none
    border: none

    transform: scale(1.155)
    border-radius: 0.2rem !important
  .vc-sketch *
    border-radius: 0.2rem !important
  .vc-sketch-field
    .vc-input__input
      font-size: 1.4rem
      box-shadow: none !important
      border-bottom: 1px solid rgba($black, 0.15)
      padding: $size-step/4 0
    .vc-input__label
      color: $grey-middle
      text-align: left
  .vc-sketch-presets
    border-top: none
  .vc-sketch-color-wrap
    display: none

</style>
