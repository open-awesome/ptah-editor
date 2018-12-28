<template>
<figure :style="style" class="b-uploader-item">

  <progress v-show="progress !== 100" :value="progress" :max="100"></progress>

  <figcaption v-show="progress === 100" class="b-uploader-item__caption">

    <template v-if="hasPreview">
      <label>
        <span
          class="
              b-pth-base-button
              b-pth-base-button_orange
              b-pth-base-button_middle
              b-uploader-item__button
              b-uploader-item__button--span
              b-uploader-item__button--link
            ">
          Replace {{ type }}
        </span>
        <input
          @change="uploadFile($event.target.files[0])"
          type="file"
          hidden>
      </label>
      <base-button
          v-text="`Remove ${ type }`"
          @click="$emit('remove')"
          size="middle"
          color="orange"
          class="b-uploader-item__button b-uploader-item__button--link"/>
    </template>

    <label v-else>
      <span
          class="
            b-pth-base-button
            b-pth-base-button_orange
            b-pth-base-button_middle
            b-uploader-item__button
            b-uploader-item__button--span
          ">
        Add {{ type }}
      </span>
      <input
          :multiple="multiple"
          @change="uploadFiles($event.target.files)"
          type="file"
          hidden>
    </label>

  </figcaption>

</figure>
</template>

<script>
function getFormData (file) {
  let formData = new FormData()
  formData.append('file[]', file)
  formData.append('method', 'storefront.upload')
  formData.append('format', 'json')
  return formData
}

export default {
  name: 'BaseUploaderItem',

  props: {
    item: Object,
    multiple: Boolean,
    src: String,
    type: String
  },

  data () {
    return {
      progress: 100
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
    }
  },

  methods: {
    async getFileData (file) {
      this.progress = 0
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.upload.onprogress = this.loadingProgress // --- uploading progress
        xhr.open('POST', 'http://images.stg.gamenet.ru/restapi')
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
      this.progress = (loaded === total) ? 99 : (loaded / total * 100)
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
    }
  }
}
</script>

<style lang="sass" scoped>
.b-uploader-item
  display: inline-flex
  align-items: center
  justify-content: center

  width: calc(100% - 1rem)
  height: 10rem
  margin: .5rem

  border: .1rem solid $gray-dark
  border-radius: .4rem

  background-color: $white
  background-size: cover !important

  &__caption
    display: inline-flex
    flex-direction: column

  &__button
    &--link
      background-color: rgba(255, 255, 255, .5)
      color: $black
    &--span
      display: inline-block
      text-align: center
      line-height: 2.4
    &:not(:last-of-type)
      margin-bottom: 0

  .b-pth-base-button
    font-size: 1.3rem

  span.b-pth-base-button
    font-size: 1.4rem

  &:not(:last-child)
    margin-right: 0
    margin-bottom: 0
</style>
