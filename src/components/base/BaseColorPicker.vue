<script>
import { Sketch } from 'vue-color'

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
      default: '#000'
    },
    showTextValue: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    value (value) {
      this.pickerValue = {
        hex: value
      }
    },
    pickerValue (value) {
      this.$emit('change', value)
    }
  },

  data () {
    return {
      expanded: false,
      pickerValue: {
        hex: this.value
      }
    }
  }
}
</script>

<template>
  <div class="b-picker" :class="{ 'full': showTextValue }">
    <div class="b-picker__value-string" @click="expanded = !expanded">
      <div class="b-picker__circle" :style="{ 'background-color': pickerValue.hex }"></div>
      <div class="b-picker__text">
        {{pickerValue.hex || 'Choose color' }}
      </div>
      <div class="b-picker__arrow" :class="{ 'b-picker__arrow--turn': expanded}">
        <icon-base name="arrowDropDown" width="6" color="#888888" />
      </div>
    </div>

    <div class="b-picker__palette" v-show="expanded">
      <Sketch v-model="pickerValue"></Sketch>
    </div>
  </div>
</template>

<style lang="sass" scoped="">
  .b-picker
    font-size: 1.6rem
    padding: 0.5rem 0
    position: relative
    &__value-string
      display: flex
      align-items: center
      width: 100%
      justify-content: space-between
      cursor: pointer
    &__circle
      width: 1.8rem
      height: 1.8rem
      border-radius: 50%
      border: 2px solid #FFFFFF
      box-sizing: border-box
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)
    &__text
      display: none
      color: #272727
      text-transform: uppercase
      margin-left: .8rem
      flex-grow: 2
    &.full
      border-bottom: 1px solid rgba(136, 136, 136, .25)
      .b-picker__text
        display: block
    &__palette
      position: absolute
      top: 3.5rem
      left: -2.2rem
    &__arrow
      transition: .3s ease-out
      &--turn
        transform: rotate(180deg)
</style>
