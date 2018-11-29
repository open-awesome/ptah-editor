<template>
  <div class="b-base-image-upload">
    <div class="b-base-image-upload__preview" @click="upload">
      <img v-if="url" :src="url" width="48" alt="" @click.prevent="upload">
      <span v-else class="b-base-image-upload__add-button">
        <IconBase name="plus" width="16" height="16" color="#436FEE" />
      </span>
      <input
        style="display: none;"
        type="file"
        accept="image/*"
        ref="uploadInput"
        @change="onUploadClick"/>
    </div>
    <div class="b-base-image-upload__info">
      <p>{{label}}</p>
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
import api from '@store/api'

export default {
  model: {
    prop: 'value',
    event: 'upload'
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },

  watch: {
    value (value) {
      this.url = value
    },
    url (value) {
      this.$emit('upload', value)
    }
  },

  data () {
    return {
      url: this.value
    }
  },

  methods: {
    onUploadClick (event) {
      this.uploadFile(event)
        .then((data) => { this.url = data.src })
        .catch((error) => console.warn(error))
    },

    upload () {
      this.url = ''
      this.$refs.uploadInput.click()
    },

    uploadFile (event) {
      return api.uploadFileFromInputFile(event)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-base-image-upload
  display: flex
  flex-direction: row

  &__preview
    cursor: pointer
    height: 4.8rem
    width: 4.8rem
    margin-right: 2.4rem
    display: flex
    align-items: center
    justify-content: center

  &__add-button
    background: rgba(#D5E0FF, 0.25)
    height: 4.8rem
    width: 4.8rem
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center

  &__info
    font-size: 1.4rem
    line-height: 1.7rem
    color: #888888
    padding-top: 0.3rem

    p
      margin: 0

      & + p
        margin-top: 0.6rem
</style>
