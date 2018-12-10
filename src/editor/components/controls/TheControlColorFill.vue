<script>
export default {
  props: {
    fillColor: {
      type: String,
      required: true
    },
    expand: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      size: {},
      color: '',
      styles: []
    }
  },

  created () {
    this.color = this.fillColor
  },

  watch: {
    expand () {
      this.controlOpen = this.expand
    }
  },

  methods: {
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.$emit('change', ['fill', color])
    },

    onClickTitle () {
      this.$emit('open', ['fillColor', !this.controlOpen])
    }
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Fill icon</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-text-controls__control">
        <base-color-picker label="Color fill" v-model="color" @change="changeColor"></base-color-picker>
      </div>
    </base-dropdown>
  </div>
</template>

<style lang="sass" scoped>
  .b-text-controls
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
