<template>
  <div class="b-logo is-editable"
    @dragover.prevent
    @drop="onDrop"
    :data-href="link.href"
    :class="{'js-element-link' : isSetUrlImage }"
    :path="path"
    :style="[objVarsMedia, objVarsResize]"
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
      class="b-logo__resize pth-resizer"
      class-name-active="b-logo__resize_active"
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
import Uploader from '@editor/plugins/Uploader.vue'
import elementMedia from '../mixins/elementMedia'
import elementResize from '../mixins/elementResize'

export default {
  name: 'Logo',

  mixins: [
    elementMedia,
    elementResize
  ],

  components: {
    Uploader
  },

  data: function () {
    return {
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

    link () {
      return this.$section.get(`$sectionData.${this.path}.link`)
    },

    belongsGallery () {
      return this.$section.get(`$sectionData.${this.path}.belongsGallery`)
    },

    isSetUrlImage () {
      return !this.belongsGallery && this.link.href !== ''
    }
  },

  created () {
    this.a = this.alt
    this.file = this.styles['background-image']
  },

  methods: {
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
@import '../../assets/sass/element.sass'
@import '../../assets/sass/element-resize.sass'

.b-logo
  $this: &

  position: relative
  display: block

  width: $size-step*3
  height: $size-step*3
  background-position: center center

  max-width: 100%
  max-height: 100%

  min-width: $size-step
  min-height: $size-step

  user-select: none
  transition: all 200ms

  &:hover .b-load
    display: flex

  & span
    display: block
  .is-tablet &
    margin: $size-step/2 auto
  @media only screen and (max-width: 768px)
    &
      margin: $size-step/2 auto
  @media only screen and (max-width: 768px) and (min-height: 700px)
    &
      margin: $size-step/2 auto
  &.js-element-link
    cursor: pointer
  .b-uploader
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none

.b-load
  position: absolute
  top: 0
  right: 0
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
