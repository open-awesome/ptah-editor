<template>
  <div class="b-image is-editable"
    @dragover.prevent
    @drop="onDrop"
    :data-href="link.href"
    :path="path"
    :style="[objVarsMedia, objVarsResize]"
    @mouseleave="mouseleave"
    @mouseover.stop="mouseover"
    :class="[
      {'js-element-link' : isSetUrlImage }
    ]"
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
      @resizing="$_onResize"
      @resizestop="$_onResizeStop"
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
import elementHover from '../mixins/elementHover'

export default {
  name: 'Pic',

  mixins: [
    elementMedia,
    elementResize,
    elementHover
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
</style>
