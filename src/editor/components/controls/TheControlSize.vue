<script>
export default {
  props: {
    width: {
      type: [Number, String],
      require: true
    },
    height: {
      type: [Number, String],
      require: true
    },
    radius: {
      type: [Number, String],
      require: true
    }
  },

  data () {
    return {
      controlOpen: false,
      elHeight: 0,
      elWidth: 0,
      elRadius: 0
    }
  },

  created () {
    this.elHeight = this.height ? parseInt(this.height) : 0
    this.elWidth = this.width ? parseInt(this.width) : 0
    this.elRadius = this.radius ? parseInt(this.radius) : 0
  },

  methods: {
    changeHeight () {
      if (this.elHeight > 0) {
        this.$emit('change', ['height', `${this.elHeight}px`])
      }
    },

    changeWidth () {
      if (this.elWidth > 0) {
        this.$emit('change', ['width', `${this.elWidth}px`])
      }
    },

    changeRadius () {
      if (this.elRadius > 0) {
        this.$emit('change', ['border-radius', `${this.elRadius}px`])
      }
    }
  }
}
</script>

<template>
  <div class="b-size-controls">
    <div class="b-size-controls__header" @click="controlOpen = !controlOpen">
      <span>Visual</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :class="{ 'open': controlOpen }">
      <div class="b-size-controls__control">
        <base-range-slider v-model="elHeight" label="Height" step="1" min="0" max="1280" @change="changeHeight">
          {{elHeight}} px
        </base-range-slider>
      </div>
      <div class="b-size-controls__control">
        <base-range-slider v-model="elWidth" label="Width" step="96" min="64" max="1120" @change="changeWidth">
          {{elWidth}} px
        </base-range-slider>
      </div>
      <div class="b-size-controls__control">
        <base-range-slider v-model="elRadius" label="Border radius" step="1" min="0" max="100" @change="changeRadius">
          {{elRadius}} px
        </base-range-slider>
      </div>
    </base-dropdown>
  </div>
</template>

<style lang="sass" scoped>
  .b-size-controls
    &__header
      font-size: 1.6rem
      height: 3.2rem
      color: #272727
      display: flex
      align-items: center
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__control
      margin-top: 2.2rem
</style>
