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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-size-controls
  &__control
    display: flex
    justify-content: stretch
    align-iten: flex-start

    width: 100%
    margin-top: $size-step/2

</style>
