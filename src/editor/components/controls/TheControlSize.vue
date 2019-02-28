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
    }
  },

  data () {
    return {
      elHeight: 0,
      elWidth: 0
    }
  },

  created () {
    this.elHeight = this.height ? parseInt(this.height) : 0
    this.elWidth = this.width ? parseInt(this.width) : 0
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
    }
  }
}
</script>

<template>
  <div class="b-size-controls">
    <div class="b-size-controls__control">
      <base-range-slider v-model="elHeight" label="Height" step="8" min="20" max="320" @change="changeHeight">
        {{elHeight}} px
      </base-range-slider>
    </div>
    <div class="b-size-controls__control">
      <base-range-slider v-model="elWidth" label="Width" step="8" min="64" max="320" @change="changeWidth">
        {{elWidth}} px
      </base-range-slider>
    </div>
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
      cursor: pointer
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__control
      margin-top: 2.2rem
</style>
