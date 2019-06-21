<template>
  <div class="b-image is-editable"
    @dragover.prevent
    @drop="onDrop"
    >

    <i class="b-load pth-uploader" @click.stop="upload" ref="upload">
      <icon-base name="loadTo"></icon-base>
    </i>

    <uploader
      :diameter="40"
      :path="path"
      :file="file"
      :showProgress="true"
      @change="changeSrc"
    />

    <vue-draggable-resizable
      class="b-image__resize pth-resizer"
      class-name-active="b-image__resize_active"
      class-name-handle="b-handle"
      :w="width"
      :h="height"
      :min-width="32"
      :min-height="32"
      :max-height="640"
      @resizing="onResize"
      @resizestop="onResizeStop"
      :draggable="false"
      :z="999"
     />
     <!-- Keep aspect ratio using :lock-aspect-ratio="true" prop. -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Uploader from '@editor/plugins/Uploader.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'Pic',

  inject: ['$section'],

  components: {
    VueDraggableResizable,
    Uploader
  },

  data: function () {
    return {
      width: 0,
      height: 0,
      file: ''
    }
  },

  props: {
    path: {
      type: String
    }
  },

  computed: {
    alt () {
      return this.$section.get(`$sectionData.${this.path}.alt`)
    },

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    }
  },

  created () {
    this.a = this.alt
    this.file = this.styles['background-image']
    this.width = parseInt(this.styles.width.split('px')[0]) || 96
    this.height = parseInt(this.styles.height.split('px')[0]) || 96
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleShowStyler',
      'toggleResizeStop'
    ]),

    onResize (x, y, width, height) {
      this.$section.set(`$sectionData.${this.path}.styles.width`, width + 'px')
      this.$section.set(`$sectionData.${this.path}.styles.height`, height + 'px')

      this.toggleShowStyler(false)
    },

    onResizeStop (x, y, width, height) {
      this.toggleShowStyler(true)
      this.toggleResizeStop(true)
    },

    changeSrc (data) {
      this.$section.set(`$sectionData.${data.path}.styles['background-image']`, `url(${data.url})`)
    },

    onDrop (e) {
      let files = e.dataTransfer.files

      e.stopPropagation()
      e.preventDefault()

      if (!files || !files[0]) {
        return
      }

      if (!/^image\//.test(files[0].type)) {
        return
      }

      this.file = files[0]
    },

    upload (e) {
      e.stopPropagation()
      let input = this.$refs.upload.nextElementSibling.querySelectorAll('input')[1]
      input.click()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-image
  position: relative
  display: inline-block

  width: $size-step*8
  height: $size-step*5

  max-width: 100% !important
  max-height: 100% !important

  min-width: $size-step*2
  min-height: $size-step/2

  user-select: none
  transition: all 200ms

  &:hover .b-load
    display: flex

  &__resize
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
  & span
    display: block
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
.b-load
  position: absolute
  top: 0
  left: 0
  z-index: 1000

  display: none
  justify-content: center
  align-items: center
  width: 2.6rem
  height: 2.6rem

  cursor: pointer
  background: $white
  color: $dark-blue-krayola

  &:hover
    color: $white
    background: $dark-blue-krayola
</style>
