<template>
  <div class="b-range-slider">
    <span class="b-range-slider__text">
      <slot></slot>
    </span>
    <range-slider
      class=""
      :min="min"
      :max="max"
      :step="step"
      v-model="sliderValue">
    </range-slider>
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
$slider-height: 1.3rem
$rail-height: 1px
$knob-size: 0.9rem

$rail-color: rgba(#888888, 0.25)
$rail-fill-color: #436FEE
$knob-color: #fff

$knob-border: 2px solid #436FEE
$knob-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)

.b-range-slider
  &__text
    font-size: 1.6rem
    line-height: 1.8rem
    color: #272727

  /deep/
    .range-slider
      box-sizing: border-box
      padding: 0 1px
      height: $slider-height
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
      transform: translateY(-50%)

    .range-slider-rail
      width: 100%
      background-color: $rail-color

    .range-slider-fill
      background-color: $rail-fill-color

    .range-slider-knob
      display: block
      position: absolute
      top: 50%
      left: 0
      box-sizing: border-box
      height: $knob-size
      width: $knob-size
      border: $knob-border
      border-radius: 50%
      background-color: $knob-color
      box-shadow: $knob-shadow
      transform: translate(-50%, -50%)
      cursor: pointer

    .range-slider-hidden
      display: none
</style>
