<template>
  <a class="b-button is-editable">
    <slot></slot>
    <vue-draggable-resizable
      class="b-button__resize"
      class-name-active="b-button__resize_active"
      class-name-handle="b-handle"
      :w="width"
      :h="height"
      :min-width="32"
      :max-width="maxWidth ? maxWidth : 320"
      :min-height="32"
      :max-height="320"
      @resizing="onResize"
      :draggable="false"
      :z="999"
      />
    <!-- Keep aspect ratio using :lock-aspect-ratio="true" prop. -->
  </a>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'Button',

  inject: ['$section'],

  components: {
    VueDraggableResizable
  },

  data: function () {
    return {
      width: 0,
      height: 0
    }
  },

  props: {
    path: {
      type: String
    },
    maxWidth: {
      type: Number
    }
  },

  computed: {
    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    }
  },

  methods: {
    onResize: function (x, y, width, height) {
      this.$section.set(`$sectionData.${this.path}.styles.width`, width + 'px')
      this.$section.set(`$sectionData.${this.path}.styles.height`, height + 'px')
    }
  },

  created () {
    this.width = parseInt(this.styles.width.split('px')[0]) || 320
    this.height = parseInt(this.styles.height.split('px')[0]) || 60
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
  text-decoration: none
  color: $black

  width: $size-step*5

  max-width: 100% !important
  max-height: 100% !important

  min-width: $size-step*2
  min-height: $size-step/2

  margin: $size-step/2 auto

  background-color: #a7a1a1

  display: flex
  text-align: center
  justify-content: center
  flex-direction: column

  user-select: none
  cursor: pointer
  transition: background-color 200ms
  &__resize
    display: none
    border: none !important

    top: -0.4rem !important
    right: -0.4rem !important
    bottom: -0.4rem !important
    left: -0.4rem !important

    border-radius: 0.5rem
    width: auto !important
    height: auto !important
    &_active
      border: 0.2rem dotted $white !important
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
  &.is-editable
    .b-button__resize
      display: block
  & span
    display: block
  &:hover
    filter: brightness(120%)
  &:active
    filter: brightness(50%)
  .is-mobile &,
  .is-tablet &
    max-width: 90% !important
    margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px)
    &
      max-width: 90% !important
      margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px) and (min-height: 700px)
    &
      max-width: 60% !important
      margin: $size-step/2 auto !important
/deep/
  .b-handle
    position: absolute !important

    background: $dark-blue-krayola !important
    border: 0.2rem solid $white !important
    box-sizing: border-box !important
    box-shadow: 0px 2px 2px rgba($black, 0.15) !important
    border-radius: 1px !important

    height: $size-step/4 !important
    width: $size-step/4 !important

    transition: all 300ms linear !important
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
    &-tl
      top: -$size-step/8
      left: -$size-step/8
      cursor: nw-resize
    &-tm
      top: -$size-step/8
      left: 50%
      margin-left: -$size-step/16
      cursor: n-resize
    &-tr
      top: -$size-step/8
      right: -$size-step/8
      cursor: ne-resize
    &-ml
      top: 50%
      margin-top: -$size-step/16
      left: -$size-step/8
      cursor: w-resize
    &-mr
      top: 50%
      margin-top: -$size-step/16
      right: -$size-step/8
      cursor: e-resize
    &-bl
      bottom: -$size-step/8
      left: -$size-step/8
      cursor: sw-resize
    &-bm
      bottom: -$size-step/8
      left: 50%
      margin-left: -$size-step/16
      cursor: s-resize
    &-br
      bottom: -$size-step/8
      right: -$size-step/8
      cursor: se-resize
    &-tl:hover,
    &-tr:hover,
    &-bl:hover,
    &-br:hover
      transform: scale(1.4)

</style>
