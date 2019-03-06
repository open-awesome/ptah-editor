<template>
      <a class="b-button is-editable">
        <span v-html="t"></span>
        <vue-draggable-resizable
          class="b-button__resize"
          class-name-active="b-button__resize_active"
          class-name-handle="b-handle"
          :w="width"
          :h="height"
          @resizing="onResize"
          :draggable="false"
          :z="999"
          :lock-aspect-ratio="true"
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
      t: '',
      width: 0,
      height: 0
    }
  },

  props: {
    path: {
      type: String
    }
  },

  computed: {
    text () {
      return this.$section.get(`$sectionData.${this.path}.text`)
    },

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
    this.t = this.text
    this.width = parseInt(this.styles.width.split('px')[0])
    this.height = parseInt(this.styles.height.split('px')[0])
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
  &__resize
    border: none !important
    &_active
      top: -0.4rem !important
      right: -0.4rem !important
      bottom: -0.4rem !important
      left: -0.4rem !important

      border-radius: 0.5rem
      border: 0.2rem dotted $white !important

      width: auto !important
      height: auto !important
  & span
    display: block
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
    &-tl
      top: -$size-step/4
      left: -$size-step/4
      cursor: nw-resize
    &-tm
      top: -$size-step/4
      left: 50%
      margin-left: -$size-step/8
      cursor: n-resize
    &-tr
      top: -$size-step/4
      right: -$size-step/4
      cursor: ne-resize
    &-ml
      top: 50%
      margin-top: -$size-step/8
      left: -$size-step/4
      cursor: w-resize
    &-mr
      top: 50%
      margin-top: -$size-step/8
      right: -$size-step/4
      cursor: e-resize
    &-bl
      bottom: -$size-step/4
      left: -$size-step/4
      cursor: sw-resize
    &-bm
      bottom: -$size-step/4
      left: 50%
      margin-left: -$size-step/8
      cursor: s-resize
    &-br
      bottom: -$size-step/4
      right: -$size-step/4
      cursor: se-resize
    &-tl:hover,
    &-tr:hover,
    &-bl:hover,
    &-br:hover
      transform: scale(1.4)

</style>
