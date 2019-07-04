<template>
  <figure class="b-uploader-item">

    <div class="b-uploader-item__preview" @click="onClick">
      <radial-progress-bar
        v-show="progress !== 100"
        :diameter="16"
        :completed-steps="progress"
        :total-steps="totalSteps"
        :strokeWidth="2"
        :startColor="`#55D287`"
        :stopColor="`#2275D7`"
        :innerStrokeColor="`#E4E4E4`"
      >
      </radial-progress-bar>

      <template v-if="progress === 100">
        <!-- one file -->
        <div class="b-uploader-item__preview--img"
             @dragover.prevent
             @drop="onDrop"
             :style="style"
             v-if="hasPreview">
          <div v-if="type === 'video'">
            <icon-base name="video" width="18" height="18" />
          </div>

          <input
            @change="uploadFile($event.target.files[0])"
            type="file"
            ref="input"
            hidden>
        </div>

        <!-- multiple (carousel) -->
        <div class="b-uploader-item__preview--plus"
             @dragover.prevent
             @drop="onDrop"
             :style="style"
             v-else>
          <IconBase name="plus" width="16" height="16" color="#2275D7" />

          <input
            :multiple="multiple"
            @click="$event.target.value = ''"
            @change="uploadFiles($event.target.files)"
            type="file"
            ref="input"
            hidden>
        </div>
      </template>

    </div>

    <div class="b-uploader-item__controls">
      <div class="b-uploader-item__label"
           :class="{ 'b-uploader-item__label--empty': !hasPreview }"
           v-if="label">
        <template v-if="!hasPreview && progress === 100">
          Upload images or enter url
        </template>
        <template v-else>
          {{ label }}
        </template>
      </div>
      <div class="b-uploader-item__text">
        <base-text-field
          :value="path"
          :hasError="error"
          errorText="Invalid image url"
          @input="onInput"
        />
      </div>
      <div class="b-uploader-item__remove"
           tooltip="Remove"
           @click="$emit('remove')"
           v-if="hasPreview">
        <icon-base name="close" width="12" height="12"></icon-base>
      </div>
    </div>

  </figure>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import * as _ from 'lodash-es'

function getFormData (file) {
  let formData = new FormData()
  formData.append('file[]', file)
  formData.append('method', 'storefront.upload')
  formData.append('format', 'json')
  return formData
}

export default {
  name: 'BaseUploaderItem',

  components: {
    RadialProgressBar
  },

  props: {
    item: Object,
    multiple: Boolean,
    src: String,
    type: String,
    label: String
  },

  data () {
    return {
      progress: 100,
      totalSteps: 100,
      error: false
    }
  },

  computed: {
    hasPreview () {
      return this.item || this.src
    },

    pattern () {
      return new RegExp(`^${this.type}`)
    },

    style () {
      let { item, src, type } = this
      if ((!item && !src) || type === 'video') {
        return null
      }
      return {
        background: `url(${src || item.path}) no-repeat center`
      }
    },

    path () {
      return _.get(this.item, 'path') ? this.item.path : this.src
    }
  },

  methods: {
    async getFileData (file) {
      this.progress = 0
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.upload.onprogress = this.loadingProgress // --- uploading progress
        xhr.open('POST', '//images.stg.gamenet.ru/restapi')
        xhr.send(getFormData(file))

        xhr.onload = xhr.onerror = () => {
          if (xhr.status === 200) {
            try {
              let { response } = JSON.parse(xhr.response)
              let { name, src: path } = response.data[0]
              this.clearProgress(path)
              resolve({ name, path })
            } catch (error) {
              reject(error)
            }
          } else {
            let error = { status: xhr.status, statusText: xhr.statusText }
            reject(error)
          }
        }
      })
    },

    clearProgress (path) {
      if (this.type === 'image') {
        let image = new Image()
        image.src = path
        image.onload = () => requestAnimationFrame(() => { this.progress = 100 })
        return
      }
      requestAnimationFrame(() => { this.progress = 100 })
    },

    loadingProgress ({ loaded, total }) {
      this.progress = (loaded === total) ? 99 : parseInt((loaded / total * 100))

      if (this.progress === 99) {
        this.$emit('labelProgress', '')
      } else {
        this.$emit('labelProgress', `${this.progress}% Loading...`)
      }
    },

    async uploadFiles (fileList) {
      let pattern = this.pattern
      let files = [...fileList].filter(({ type }) => type.match(pattern))
      for (let file of files) {
        this.$emit('add', await this.getFileData(file))
      }
    },

    async uploadFile (file) {
      if (!(file && file.type.match(this.pattern))) {
        return
      }
      this.$emit('replace', await this.getFileData(file))
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

      this.uploadFile(files[0])
    },

    onClick () {
      this.$refs.input.click()
    },

    onInput (value) {
      this.debouncedInput(value, this)
    },

    debouncedInput: _.debounce((value, self) => {
      if (value === '') {
        self.$emit('remove')
      }

      // validate image url
      if (self.type === 'image') {
        let image = new Image()
        image.onload = () => {
          self.error = false
          self.inputDone(value)
        }
        image.onerror = () => {
          self.error = true
        }
        image.src = value
      } else {
        self.inputDone(value)
      }
    }, 300, { trailing: true }),

    inputDone (value) {
      if (value !== '' && this.hasPreview) {
        this.$emit('replace', { name: 'file', path: value })
      } else {
        this.$emit('add', { name: 'file', path: value })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-uploader-item
  display: flex
  justify-content: space-between
  align-items: flex-start

  margin: 0 0 $size-step/2
  padding: 0

  &__preview
    display: flex
    align-items: center
    justify-content: center

    width: $size-step*1.5
    height: $size-step
    margin: 0 $size-step/2 0 0

    position: relative

    &>div
      cursor: pointer
      &:hover
        border-color: $dark-blue-krayola

    &--img
      width: 100%
      height: 100%
      border-radius: 0.2rem
      border: 0.2rem solid $ligth-grey
      background-color: $white
      background-size: contain !important
      background-position: center center !important
      background-repeat: no-repeat !important

    &--plus
      display: flex
      align-items: center
      justify-content: center
      width: 3rem
      height: 3rem

      border: 0.2rem solid $ligth-grey
      border-radius: 50%

  &__controls
    position: relative
    flex-grow: 1

    margin-top: .5rem

    font-size: 1.4rem
    line-height: 1.7rem
    letter-spacing: -0.01em

  &__label
    color: $black
    &--empty
      color: #999

  &__text
    margin-top: .5rem
    /deep/
      .b-base-text-field__input
        font-size: 1.4rem

  &__remove
    position: absolute
    top: 1px
    right: 0
    color: $grey-middle
    cursor: pointer
</style>
