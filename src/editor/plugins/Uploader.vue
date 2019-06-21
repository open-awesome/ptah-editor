<template>
  <div class="b-uploader"
    @dragover.prevent
    @drop="onDrop"
    >
      <radial-progress-bar
        v-show="progress !== 100 && showProgress"
        :diameter="40"
        :completed-steps="progress"
        :total-steps="totalSteps"
        :strokeWidth="3"
        :startColor="`#55D287`"
        :stopColor="`#2275D7`"
        :innerStrokeColor="`#E4E4E4`"
      >
        <span class="b-uploader__progress">{{progress}}%</span>
      </radial-progress-bar>

      <form>
        <input
          class="b-uploader__input"
          type="file"
          ref="uploader"
          @change="getFileData"
          v-if="$builder.isEditing && mode === 'input'"
          />

        <input class="b-upload--alternative" type="file" hidden @change="uploadFile($event.target.files[0])">
      </form>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
const VALID_TYPES = ['image', 'video']

function getFormData (file) {
  let formData = new FormData()
  formData.append('file[]', file)
  formData.append('method', 'storefront.upload')
  formData.append('format', 'json')
  return formData
}

export default {

  name: 'Uploader',

  inject: ['$builder', '$section'],

  components: {
    RadialProgressBar
  },

  props: {
    path: {
      type: String,
      required: true
    },
    mode: {
      default: 'input',
      type: String
    },
    file: [String, File],
    type: {
      type: String,
      default: VALID_TYPES[0],
      validator: value => VALID_TYPES.includes(value)
    },
    showProgress: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      progress: 100,
      totalSteps: 100
    }
  },

  watch: {
    file (value) {
      this.uploadFile(value)
    }
  },

  computed: {
    props () {
      return this.$section.get(`$sectionData.${this.path}`)
    },

    pattern () {
      return new RegExp(`^${this.type}`)
    }
  },

  methods: {
    getFileData (file) {
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

    async uploadFile (file) {
      if (file === undefined) {
        return
      }

      let data = {}
      if (!(typeof file !== 'string' && file && file.type.match(this.pattern))) {
        if (file !== '') this.$emit('change', { url: file, path: this.path })
        return
      }
      data = await this.getFileData(file)

      if (data.path) {
        this.$emit('change', { url: data.path, path: this.path })
      }
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

    loadingProgress ({ loaded, total }) {
      this.progress = (loaded === total) ? 99 : parseInt((loaded / total * 100))
    },

    clearProgress (path) {
      if (this.type === 'image') {
        let image = new Image()
        image.src = path
        image.onload = () => requestAnimationFrame(() => { this.progress = 100 })
        return
      }
      requestAnimationFrame(() => { this.progress = 100 })
    }
  }
}
</script>

<style lang="sass">
.b-uploader
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 900
  background: transparent
  display: flex
  align-items: center
  justify-content: center

  &__input
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 1000

    width: 100%
    opacity: 0
    cursor: pointer

  &__progress
    font-size: 1.2rem
</style>
