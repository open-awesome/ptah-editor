<template>
    <div class="b-uploader"
      @dragover.prevent
      @drop="onDrop"
      >
        <form>
          <input
            class="b-uploader__input"
            type="file"
            ref="uploader"
            @change="getFileData"
            v-if="$builder.isEditing && mode === 'input'"
            />
        </form>
    </div>
</template>

<script>
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
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        // xhr.upload.onprogress = this.loadingProgress // --- uploading progress
        xhr.open('POST', '//images.stg.gamenet.ru/restapi')
        xhr.send(getFormData(file))

        xhr.onload = xhr.onerror = () => {
          if (xhr.status === 200) {
            try {
              let { response } = JSON.parse(xhr.response)
              let { name, src: path } = response.data[0]
              // this.clearProgress(path)
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
  z-index: 1000

  background: #000

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
</style>
