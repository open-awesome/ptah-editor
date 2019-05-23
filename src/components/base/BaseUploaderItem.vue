<template>
  <figure :style="style" class="b-uploader-item">

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

    <div v-show="progress === 100" class="b-uploader-item__preview">

      <div v-if="hasPreview" @dragover.prevent @drop="onDrop">
        <BaseDropdownMenu
          class="b-uploader-item__preview"
          positionDropdown="left"
          :onHover="true"
          :onClick="onClick"
          >
          <div class="b-uploader-item__preview-img">
            <div v-if="type === 'video'">
              <icon-base name="video" width="18" height="18" />
            </div>
          </div>
          <div slot="listHover">
            <ul>
              <li class="_right-icon _label">
                <label class="b-uploader-item__preview-label">
                  Change
                  <input
                    @change="uploadFile($event.target.files[0])"
                    type="file"
                    hidden>
                  <icon-base
                    width="16"
                    height="18"
                    stroke="#B1B1B1"
                    name="change">
                  </icon-base>
                </label>
              </li>
              <li class="_right-icon"
                @click="$emit('remove')"
                >
                Remove
                <icon-base
                  width="12"
                  height="12"
                  color="#B1B1B1"
                  name="close">
                </icon-base>
              </li>
            </ul>
          </div>
          <div slot="list">
            <div class="b-uploader-item__show-img">
              <div :style="style"/>
            </div>
          </div>
        </BaseDropdownMenu>
      </div>

      <label class="b-uploader-item__label" v-else>
        <span
            class="
              b-uploader-item__button
              b-uploader-item__button--span
            ">
          <IconBase name="plus" width="16" height="16" color="#2275D7" />
        </span>
        <input
            :multiple="multiple"
            @click="$event.target.value = ''"
            @change="uploadFiles($event.target.files)"
            type="file"
            hidden>
      </label>

    </div>

  </figure>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

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
    type: String
  },

  data () {
    return {
      progress: 100,
      totalSteps: 100
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

    onClick () {
      return this.type !== 'video'
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

    onDrop: function (e) {
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

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-uploader-item
  display: inline-flex
  align-items: center
  justify-content: center

  width: $size-step*1.5
  height: $size-step
  margin: 0

  border-radius: 0.2rem
  border: 0.2rem solid $ligth-grey
  background-color: $white
  background-size: contain !important
  background-position: center center !important
  background-repeat: no-repeat !important

  position: relative
  &:not(:first-child)
    margin: $size-step/8 0
  &__preview
    display: inline-flex
    align-items: center
    justify-content: center

    width: $size-step*1.5
    height: $size-step
    &-label
     display: inline-flex
     align-items: center
     justify-content: center

     cursor: pointer
    &-img
      width: $size-step*1.5
      height: $size-step

      display: flex
      justify-content: center
      align-items: center
  &__label
    width: $size-step*1.5
    height: $size-step

    display: inline-flex
    align-items: center
    justify-content: center

    cursor: pointer
  &__show-img
    padding: $size-step*0.43

    display: inline-flex
    align-items: center
    justify-content: center
    & > div
      width: $size-step*7
      height: $size-step*4

      background-size: contain !important
  &:hover
    border-color: $dark-blue-krayola
  &:not(:last-child)
    margin-right: 0
    margin-bottom: 0

/deep/
  .b-pth-base-dropdown-menu__dropdown_click
    left: -1.5rem !important
</style>
