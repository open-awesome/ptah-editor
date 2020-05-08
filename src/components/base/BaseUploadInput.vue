<template>
  <div class="b-base-upload">
    <base-label class="b-base-upload__label" v-if="label">
      {{label}}
    </base-label>

    <form class="b-base-upload__inner" :class="{ 'b-base-upload__inner--focus': focus }">
      <input
        type="text"
        v-model="url"
        @focus="$emit('focus', $event), focus = true"
        @blur="$emit('blur', $event), focus = false"
        :placeholder="placeholder">
      <input
        style="display: none;"
        type="file"
        accept="image/*,video/mp4,video/x-m4v,video/*"
        ref="uploadInput"
        @change="onUploadClick"/>
      <a class="b-base-upload__button" @click.prevent="upload">
        <icon-base name="downloadCloud" width="24" color="#436FEE" title="Upload"></icon-base>
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
      url: this.value,
      focus: false
    }
  },

  methods: {
    onUploadClick (event) {
      this.uploadFile(event)
        .then((response) => {
          this.url = `${process.env.VUE_APP_S3BUCKET}${response.data.relative_path}`
        })
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
@import '../../assets/sass/_variables.sass'
.b-base-upload
  width: 100%
  &__label
    margin-bottom: 0.4rem
  &__inner
    display: flex
    justify-content: space-between
    align-items: center
    border: 1px solid #A2A5A5
    box-sizing: border-box
    border-radius: 5px
    height: 3.4rem
    padding: .5rem .9rem .5rem 1.3rem

    svg
      fill: #A2A5A5

    &--focus
      border: 2px solid $main-green
      padding: .5rem .8rem .5rem 1.2rem

      input
        outline: none

      svg
        fill: $main-green

  input[type="text"]
    background: transparent
    border: none
    color: #272727
    font-size: 1.2rem
    width: 90%
    &::placeholder
      color: #CDCDCD
  &__button
    height: 16px
    cursor: pointer
    text-decoration: none
</style>
