<template>
    <div class="b-delimiter is-editable"
      :path="path"
      :style="[objVarsMedia, objVarsResize]"
      >
      <vue-draggable-resizable
      class="b-delimiter__resize"
      class-name-active="b-delimiter__resize_active"
      class-name-handle="b-handle"
      :w="width"
      :h="height"
      :min-width="32"
      :min-height="32"
      :max-height="320"
      @resizing="$_onResize"
      @resizestop="$_onResizeStop"
      :draggable="false"
      :z="999"
     />
     <!-- Keep aspect ratio using :lock-aspect-ratio="true" prop. -->
    </div>
</template>

<script>
import elementMedia from '../mixins/elementMedia'
import elementResize from '../mixins/elementResize'

export default {
  name: 'Delimiter',

  mixins: [
    elementMedia,
    elementResize
  ],

  props: {
    path: {
      type: String
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'
@import '../../assets/sass/element.sass'
@import '../../assets/sass/element-resize.sass'

.b-delimiter
  width: 4rem
  height: 4rem

  padding: 0

  position: relative

  display: flex
  align-items: center
  justify-content: center
  &.is-editable
    border: .1rem dashed rgba($dark-blue-krayola, 0.5) !important
  & span
    display: block
  &:hover
    filter: brightness(120%)
  &:active
    filter: brightness(50%)
  .is-mobile &,
  .is-tablet &
    margin: $size-step/2 auto
  @media only screen and (max-width: 768px)
    &
      margin: $size-step/2 auto
  @media only screen and (max-width: 768px) and (min-height: 700px)
    &
      margin: $size-step/2 auto

</style>
