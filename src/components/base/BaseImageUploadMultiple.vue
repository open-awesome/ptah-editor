<template>
  <div>
    <base-label v-if="label || $slots.label">
      {{label}}
      <slot name="label"></slot>
    </base-label>
    <div class="image-container position-relative text-center" v-if="!images.length">
      <div class="image-center position-absolute display-flex flex-column justify-content-center align-items-center">
        <div>
          <svg class="image-icon-drag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M383.6 229l-.5 1.5.7 1.7c-.2-1.1-.2-2.2-.2-3.2zm-119.7-5.4l-.3 1.4.6 1.3c-.2-.8-.3-1.8-.3-2.7zm62.4 3.8l-.2 1 .5 1.1-.3-2.1z"></path><path d="M483 326.2l-43.5-100.5c-3.6-8.4-10.3-14.9-18.7-18.4-8.5-3.6-17.8-3.5-26.1.1L391 209c-3.3 1.4-6.1 3.6-8.4 6.3-3.6-8.2-10.2-14.6-18.6-18-8.5-3.4-17.7-3.3-26.1.3-6.1 2.7-10.9 6.8-13.9 12-3.7-8-10.2-14.3-18.4-17.6-8.5-3.4-17.8-3.3-26.1.3l-3.7 1.6c-6.3 2.7-11.2 7.1-14.3 12.4l-20.3-46.9c-4.2-9.8-10.7-16.8-18.7-20.2-8.1-3.5-17.2-3.2-26.5.8l-3.7 1.6c-8 3.5-13.3 9.3-15.5 16.9-2.1 7.3-1 16.2 3.1 25.6l83.4 188.2-64.7-39.8c-11.2-6.8-25.7-4.7-34.4 5.1-11.3 12.5-10.3 31.9 2 43.3l55.8 51.5 50.8 43.4c17.6 16.7 38.2 28.1 59.6 32.9 7.7 1.7 15.5 2.5 23.2 2.5 14.9 0 29.7-3.1 44.2-9.4l27.9-12.1c31.2-13.5 52.8-37.1 62.6-68.4 9.2-29.2 6.6-63-7.3-95.1zM383.6 229c0 1 .1 2.1.2 3.1l-.7-1.7.5-1.4zM281.7 466.6c-.2-.2-.5-.5-.7-.6l-50.4-43.1-55.6-51.5c-7.3-6.7-7.9-18.2-1.2-25.6 4.7-5.3 12.5-6.4 18.5-2.6l65.6 40.2c4.7 2.9 10.4 2.4 14.5-1.3 4.1-3.6 5.3-9.2 3.2-14.2l-83.7-189c-3.2-7.4-3.9-13.4-2.1-18.1 1.7-4.3 5.2-6.5 7.9-7.7l3.7-1.6c12.3-5.3 22.8-.6 28.6 12.9L310.2 350c1.4 3.2 5.1 4.6 8.3 3.3 3.2-1.4 4.7-5.1 3.3-8.3l-48.7-112.5c-2.2-5.2-3-10.8-2-15.4 1.1-5.4 4.5-9.3 9.9-11.7l3.7-1.6c5.3-2.3 11.1-2.3 16.4-.2 5.3 2.2 9.5 6.3 11.8 11.6l43.9 101.5c.7 1.6 1.9 2.7 3.5 3.4 1.6.6 3.3.6 4.8-.1 3.2-1.4 4.7-5.1 3.3-8.3l-32.8-75.9c-8.2-18.9 4.8-25.6 7.5-26.8 10.8-4.7 23.5.4 28.2 11.3l28.9 66.7c1.4 3.2 5.1 4.7 8.3 3.3 3.2-1.4 4.7-5.1 3.3-8.3l-19.4-44.8c-1.3-3-4.9-13.2 3.8-16.9l3.7-1.6c5.2-2.3 11.1-2.3 16.4 0 5.3 2.3 9.6 6.4 11.9 11.8L471.7 331c12.7 29.3 15.1 59.9 6.8 86.3-8.7 27.6-27.9 48.5-55.6 60.5L395 489.9c-38.9 16.9-80.1 8.4-113.3-23.3zm44.6-239.2l.3 2.1-.5-1.1.2-1zm-62.4-3.8l.3 2.7-.6-1.3.3-1.4zM31 217c3.2 0 6-2.6 6-5.7v-40c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.2 2.8 5.7 6 5.7zm0-66.3c3.2 0 6-2.6 6-5.7v-40c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.1 2.8 5.7 6 5.7zM148 296h-40c-3.2 0-5.7 2.3-5.7 5.5s2.6 5.5 5.7 5.5h40c3.2 0 5.7-2.3 5.7-5.5s-2.6-5.5-5.7-5.5zM37 237.6c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-40zM31 84.4c3.2 0 6-2.6 6-5.7v-40c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.1 2.8 5.7 6 5.7zM81.6 296H49.1c-1.7 0-3.4-.6-5-1.3-2.9-1.3-6.3-.1-7.5 2.8-1.3 2.9 0 6.3 2.9 7.5 3 1.3 6.3 2 9.6 2h32.5c3.2 0 5.7-2.3 5.7-5.5s-2.5-5.5-5.7-5.5zm60.6-281c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6h-40c-3.2 0-5.7 2.8-5.7 6s2.6 6 5.7 6h40z"></path><path d="M323 122.4c-3.2 0-6 2.6-6 5.7v39.2c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-39.2c0-3.1-2.8-5.7-6-5.7zm6-60.6c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-40zM301.2 15h3.6c6.8 0 12.2 5.6 12.2 12.4v8.1c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-8.1C329 14.3 317.9 3 304.8 3h-3.6c-3.2 0-5.7 2.8-5.7 6s2.5 6 5.7 6zm-66.3 0h40c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6h-40c-3.2 0-5.7 2.8-5.7 6s2.5 6 5.7 6zm-60.6 292h40c3.2 0 5.7-2.3 5.7-5.5s-2.6-5.5-5.7-5.5h-40c-3.2 0-5.7 2.3-5.7 5.5s2.5 5.5 5.7 5.5zm-5.8-292h40c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6h-40c-3.2 0-5.7 2.8-5.7 6s2.6 6 5.7 6zM37.1 19.8c1.4 0 2.7-.6 3.8-1.5 2.3-2 5.2-3.2 8.2-3.2h26.8c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6H49.1c-5.9 0-11.5 2.5-15.9 6.5-2.3 2.1-2.5 5.9-.4 8.2 1.1 1.2 2.7 2 4.3 2z"></path></svg>
        </div>
        <div class="text-center">
          <label class="drag-text">{{selectText}}</label>
        </div>
        <div class="image-input position-absolute full-width full-height">
          <label for="image-upload" class="full-width full-height cursor-pointer">
          </label>
        </div>
      </div>
    </div>

    <div class="add-images-button position-relative cursor-pointer display-flex justify-content-center align-items-center" v-if="images.length && images.length < maxImage">
      Add images&nbsp;
      <IconBase name="plus" width="12" height="12" />
      <div class="input-add-image position-absolute full-width full-height">
        <label for="image-upload" class="display-block full-width full-height cursor-pointer">
        </label>
      </div>
    </div>
    <div class="image-list-container display-flex flex-wrap" v-if="images.length && multiple">
      <draggable v-model="images">
        <div class="display-flex align-items-center" v-for="(image, index) in images" :key="index">
          <div class="image-list-item position-relative cursor-pointer" :class="image.highlight && 'image-highlight'" @click="changeHighlight(index)">
            <div class="img-responsive" :style="{backgroundImage: `url(${image.path})`}">
            </div>
          </div>
          <div class="display-flex">
            <a class="image-delete display-flex cursor-pointer" @click.prevent="deleteImage(index)">
              <IconBase name="close" width="12" height="12" />
            </a>
          </div>
        </div>
      </draggable>
    </div>
    <div>
      <input id="image-upload" @change="uploadFieldChange" name="images" :multiple="multiple" :accept="accept" type="file">
    </div>
  </div>
</template>

<script>
import { forEach, findIndex, cloneDeep } from 'lodash-es'
import Draggable from 'vuedraggable'
import api from '@store/api'

export default {
  name: 'BaseImageUploadMultiple',

  components: {
    Draggable
  },

  props: {
    label: {
      type: String,
      default: ''
    },
    selectText: {
      type: String,
      default: 'Select images (multiple)'
    },
    accept: {
      type: String,
      default: 'image/gif,image/jpeg,image/png,image/bmp,image/jpg'
    },
    dataImages: {
      type: Array,
      default: () => {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    maxImage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      currentIndexImage: 0,
      images: cloneDeep(this.dataImages)
    }
  },
  computed: {
    imagePreview () {
      let index = findIndex(this.images, { highlight: 1 })
      if (index > -1) {
        return this.images[index].path
      } else {
        return this.images.length ? this.images[0].path : ''
      }
    },
    imageDefault () {
      if (this.images[this.currentIndexImage]) {
        return this.images[this.currentIndexImage].default
      }
    }
  },
  watch: {
    dataImages: {
      handler (value) {
        this.images = value
      },
      deep: true
    },
    images: {
      handler (value) {
        this.$emit('change', value)
      },
      deep: true
    }
  },
  methods: {
    createImage (file) {
      api.uploadFileByFile(file)
        .then(fileData => {
          if (fileData.src) {
            if (!this.images.length) {
              this.images.push({ name: file.name, path: fileData.src, highlight: 1, default: 1 })
              this.currentIndexImage = 0
            } else {
              this.images.push({ name: file.name, path: fileData.src, highlight: 0, default: 0 })
            }
          }
        })
    },
    uploadFieldChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return false
      }
      forEach(files, (value, index) => {
        this.createImage(value)
      })
      if (document.getElementById('image-upload')) {
        document.getElementById('image-upload').value = []
      }
    },
    changeHighlight (currentIndex) {
      this.currentIndexImage = currentIndex
      this.images.map((item, index) => {
        if (currentIndex === index) {
          item.highlight = 1
        } else {
          item.highlight = 0
        }
        return item
      })
    },
    deleteImage (currentIndex) {
      if (this.images[currentIndex].default === 1) {
        this.images[0].default = 1
      }
      this.images.splice(currentIndex, 1)
      this.currentIndexImage = 0
      if (this.images.length) {
        this.images[0].highlight = 1
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.text-small
  font-size: 11px

.position-relative
  position: relative

.position-absolute
  position: absolute

.text-center
  text-align: center

.text-primary
  color: #2fa3e6

.display-flex
  display: flex

.flex-column
  flex-direction: column

.flex-wrap
  flex-wrap: wrap

.justify-content-center
  justify-content: center

.justify-content-between
  justify-content: space-between

.justify-content-end
  justify-content: flex-end

.align-items-center
  align-items: center

.full-width
  width: 100%

.full-height
  height: 100%

.cursor-pointer
  cursor: pointer

.centered
  left: 50%
  transform: translate(-50%, -50%)
  top: 50%
  position: absolute
  display: block

.image-container
  height: 120px
  border: 1px dashed #d6d6d6
  border-radius: 4px
  background-color: #fff

.image-center
  width: 100%
  height: 100%

.image-icon-drag
  fill: #c9c8c8
  height: 50px
  width: 50px

.drag-text
  padding-top: 5px
  color: #777
  font-weight: 400
  line-height: 1.5

.browse-text
  font-size: 86%
  color: #206ec5
  text-decoration: none

.image-input
  overflow: hidden
  opacity: 0
  top: 0
  left: 0
  bottom: 0

.image-input label
  display: block

#image-upload
  display: none

#image-edit
  display: none

/* list images*/
.image-list
  border: 1px solid #d6d6d6

.show-img
  max-height: 100px
  max-width: 140px
  display: block
  vertical-align: middle

/*image bottom*/
.image-bottom
  height: 40px
  padding: 5px 10px
  box-sizing: border-box

.image-primary
  border-radius: 4px
  background-color: #e3edf7
  padding: 3px 7px
  font-size: 11px
  margin-right: 5px

.image-icon-primary
  width: 10px
  height: 10px
  margin-right: 2px

.image-icon-delete
  height: 14px
  width: 14px
  fill: #222

.image-edit
  margin-right: 10px

.image-icon-edit
  height: 14px
  width: 14px
  fill: #222

.image-list-container
  max-width: 190px
  min-height: 50px
  margin-top: 10px

.image-list-container .image-list-item
  height: 40px
  width: 150px
  border-radius: 4px
  border: 1px solid #d6d6d6
  overflow: hidden

.image-list-container .image-list-item:not(:last-child)
  margin-right: 5px
  margin-bottom: 5px

.image-list-container .image-list-item .show-img
  max-width: 100%
  max-height: 100%

.image-list-container .image-highlight
  border: 1px solid #2fa3e7

.img-responsive
  display: block
  height: 100%
  width: 100%
  background-size: cover
  background-position: center
  background-repeat: no-repeat

.input-add-image
  overflow: hidden
  opacity: 0
  top: 0
  left: 0
  bottom: 0
  z-index: 11

.input-add-image label
  display: block

.add-images-button
  border-radius: 4px
  border: 1px solid #d6d6d6
  padding: 0.8rem
  color: #000

.image-delete
  margin-top: -5px
  margin-left: 3px

</style>
