<template>
  <div class="b-base-upload">
    <base-label v-if="label">
      {{label}}
    </base-label>

    <form class="b-base-upload__inner">
      <input type="text" v-model="url" :placeholder="placeholder">
      <input
        style="display: none;"
        type="file"
        accept="image/*,video/mp4,video/x-m4v,video/*"
        ref="uploadInput"
        @change="onUploadClick"/>
      <a class="b-base-upload__button" @click.prevent="upload">
        <icon-base name="download" width="16" color="#436FEE" title="Upload"></icon-base>
      </a>
    </form>
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
    placeholder: {
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
  .b-base-upload
    &__inner
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid rgba(136, 136, 136, .25)
      padding: 0 0 .5rem
    input[type="text"]
      background: transparent
      border: none
      color: #272727
      font-size: 1.6rem
      width: 90%
    &__button
      height: 16px
      cursor: pointer
      text-decoration: none
</style>
