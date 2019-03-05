<template>
  <a class="b-button is-editable" :style="{ width: width + 'px', height: height + 'px' }">
    <vue-draggable-resizable @resizing="onResize" :draggable="false" axis="x" :parent="true" :z="999">
      <slot></slot>
    </vue-draggable-resizable>
  </a>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'Button',

  components: {
    VueDraggableResizable
  },

  data: function () {
    return {
      width: 0,
      height: 0
    }
  },

  methods: {
    onResize: function (x, y, width, height) {
      this.width = width
      this.height = height
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-button
  position: relative
  font-size: 3rem
  font-family: 'Lato'
  line-height: 1.4
  width: 100%
  height: 100%
  color: $black
  background-color: #a7a1a1
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  user-select: none
  cursor: pointer
  transition: background-color 200ms
  text-decoration: none
  &:hover
    filter: brightness(120%)
  &:active
    filter: brightness(50%)
  .is-mobile &,
  .is-tablet &
    width: 90% !important
    margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px)
    &
      width: 90% !important
      margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px) and (min-height: 700px)
      &
        width: 60% !important
        margin: $size-step/2 auto !important
</style>
