<template>
      <a class="b-button is-editable">
        <span :style="{ width: width + 'px', height: height + 'px' }" v-html="t"></span>
        <vue-draggable-resizable class="b-button__resize" :w="width" :h="height" @resizing="onResize" :draggable="false" :z="999"/>
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
  & span
    display: block
  &__resize
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
