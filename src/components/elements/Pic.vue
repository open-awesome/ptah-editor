<template>
  <div class="b-image is-editable"
    @dragover.prevent
    @drop="onDrop"
    :data-href="link.href"
    :path="path"
    :class="{'js-element-link' : isSetUrlImage }"
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

    <span class="b-image__preview-video" v-if="link && link.type === 'video'">
      <icon-base name="video" color="#fff" width="64" height="64" />
    </span>
  </div>
</template>

<script>
import Uploader from '@editor/plugins/Uploader.vue'
import elementMedia from '../mixins/elementMedia'
import elementResize from '../mixins/elementResize'

export default {
  name: 'Pic',

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

.b-image
  $this: &
  position: relative
  display: block

  width: $size-step*8
  height: $size-step*5

  max-width: 100% !important
  max-height: 100% !important

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
  &__preview-video
    position: absolute
    top: 50%
    left: 50%

    margin: -$size-step 0 0 -2.4rem

    width: $size-step*2
    height: $size-step*2
  &:hover
    #{$this}__preview-video
      transition: all 200ms
      transform: rotate(360deg)
  .b-uploader
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
  .styler-active
    .is-mobile &,
    .is-tablet &
      border: .2rem dotted $dark-blue-krayola

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
