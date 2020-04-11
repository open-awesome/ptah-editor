<template>
    <div class="b-delimiter is-editable"
      :path="path"
      :style="[objVarsMedia, objVarsResize]"
      @mouseleave="mouseleave"
      @mouseover.stop="mouseover"
      :class="[
        { '_hover' : hoverBy === 'element' }
      ]"
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
import elementHover from '../mixins/elementHover'

export default {
  name: 'Delimiter',

  mixins: [
    elementMedia,
    elementResize,
    elementHover
  ],

  props: {
    path: {
      type: String
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
