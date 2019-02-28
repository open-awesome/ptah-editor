<script>
export default {
  props: {
    radius: {
      type: [Number, String],
      require: true
    }
  },

  data () {
    return {
      elRadius: 0
    }
  },

  created () {
    this.elRadius = this.radius ? parseInt(this.radius) : 0
  },

  methods: {
    changeRadius () {
      if (this.elRadius > 0) {
        this.$emit('change', ['border-radius', `${this.elRadius}px`])
      }
    }
  }
}
</script>

<template>
  <div class="b-border-radius-control">
    <base-range-slider v-model="elRadius" label="Corner radius" step="1" min="0" max="100" @change="changeRadius">
      {{elRadius}} <span class="b-border-radius-control__px">px</span>
    </base-range-slider>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-border-radius-control
  margin-top: 2.2rem
  &__px
    color: $grey-middle
  /deep/
    .b-base-label
      color: $grey-middle
</style>
