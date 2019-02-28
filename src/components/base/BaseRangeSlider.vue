<template>
  <div class="b-range-slider">
    <base-label v-if="label">
      {{label}}
    </base-label>
    <div class="b-range-slider__row">
      <div class="b-range-slider__text">
        <slot></slot>
      </div>
      <range-slider
        class=""
        :min="min"
        :max="max"
        :step="step"
        v-model="sliderValue">
      </range-slider>
    </div>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  components: {
    RangeSlider
  },

  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    step: {
      type: [String, Number],
      default: undefined
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    }
  },

  data () {
    return {
      sliderValue: this.value
    }
  },

  watch: {
    sliderValue (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

$rail-height: 1px
$rail-color: rgba($black, 0.15)
$rail-fill-color: $blue

$knob-color: $blue
$knob-size: 1.2rem
$knob-shadow: 0px 2px 8px rgba($cornflower-blue, 0.2)

.b-range-slider
  &__row
    display: flex
  &__text
    width: $size-step*2

    font-size: 1.6rem
    line-height: $size-step
    color: $dark-grey

    white-space: nowrap
  /deep/
    .range-slider
      box-sizing: border-box
      padding: 0 0.6rem
      width: $size-step*5.5
      height: $size-step
      display: block

    .range-slider.disabled
      opacity: 0.5

    .range-slider-inner
      display: inline-block
      position: relative
      height: 100%
      width: 100%

    .range-slider-rail,
    .range-slider-fill
      display: block
      position: absolute
      top: 50%
      left: 0
      height: $rail-height
      border-radius: $rail-height / 2

    .range-slider-rail
      width: 100%
      background-color: $rail-color

    .range-slider-fill
      background-color: $rail-fill-color

    .range-slider-knob
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      top: 50%
      left: 0
      box-sizing: border-box
      width: 2.5rem
      height: 2.5rem
      transform: translate(-50%, -50%)
      cursor: pointer

      &:before
        content: ''
        height: $knob-size
        width: $knob-size
        border-radius: 50%

        background-color: $knob-color
        box-shadow: $knob-shadow

        position: relative
        z-index: 0
      &:after
        content: ''
        height: $knob-size/3
        width: $knob-size/3
        border-radius: 50%

        background-color: $white

        position: absolute
        z-index: 0
    .range-slider-hidden
      display: none
</style>
