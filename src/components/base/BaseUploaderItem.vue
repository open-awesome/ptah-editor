<template>
<figure :style="style" class="b-uploader-item">

  <figcaption class="b-uploader-item__caption">

    <template v-if="item">
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
          Replace file
        </span>
        <input
          @change="uploadFile($event.target.files[0])"
          type="file"
          hidden>
      </label>
      <base-button
          v-text="'Remove file'"
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
        Add file
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
import api from '@store/api'

const VALID_TYPES = ['image', 'video']

function getFormData (file) {
  let formData = new FormData()
  formData.append('file[]', file)
  formData.append('method', 'storefront.upload')
  formData.append('format', 'json')
  return formData
}

async function getFileData (file) {
  let response
  try {
    let { name, src: path } = await api.uploadFile(getFormData(file))
    response = { name, path }
  } catch (error) {
    console.error(error)
  }
  return response
}

export default {
  name: 'BaseUploaderItem',

  props: {
    item: Object,
    multiple: Boolean,
    type: {
      type: String,
      default: VALID_TYPES[0],
      validator: value => VALID_TYPES.includes(value)
    }
  },

  computed: {
    pattern () {
      return new RegExp(`^${this.type}`)
    },

    style () {
      let item = this.item
      if (!item) {
        return null
      }
      return {
        background: `url(${item.path}) no-repeat center`,
        backgroundSize: 'cover'
      }
    }
  },

  methods: {
    async uploadFiles (fileList) {
      let pattern = this.pattern
      let files = [...fileList].filter(({ type }) => type.match(pattern))
      for (let file of files) {
        this.$emit('add', await getFileData(file))
      }
    },

    async uploadFile (file) {
      if (!(file && file.type.match(this.pattern))) {
        return
      }
      this.$emit('replace', await getFileData(file))
    }
  }
}
</script>

<style lang="sass" scoped>
.b-uploader-item
  display: inline-flex
  align-items: center
  justify-content: center

  width: 100%
  height: 10rem
  margin: .5rem

  background-color: $white
  border: .1rem solid $gray-dark
  border-radius: .4rem

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

  &:not(:last-child)
    margin-bottom: 0
</style>
