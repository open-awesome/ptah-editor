<template>
<div class="b-iframe"
  :path="path"
  :style="[objVarsMedia, objVarsResize]"
  @mouseleave="mouseleave"
  @mouseover.stop="mouseover"
>
  <div class="b-iframe__padd">
    <iframe
      frameborder="0"
      :src="vUrl"
    >
    </iframe>
    <div class="b-iframe__help" contenteditable="false">You can Drag and Resize</div>
  </div>

  <vue-draggable-resizable
      class="b-iframe__resize"
      class-name-active="b-iframe__resize_active"
      class-name-handle="b-handle"
      :w="width"
      :h="height"
      :min-width="32"
      :min-height="32"
      :max-height="640"
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
  name: 'IframeElement',

  mixins: [
    elementMedia,
    elementResize,
    elementHover
  ],

  props: {
    path: {
      type: String
    }
  },

  data () {
    return {
      vUrl: ''
    }
  },

  computed: {
    settings () {
      return this.$section.get(`$sectionData.${this.path}.settings`)
    }
  },

  watch: {
    settings (value) {
      this.vUrl = value.url
    }
  },

  created () {
    this.vUrl = this.settings.url
  }
}
</script>

<style lang="sass" scoped>
</style>
