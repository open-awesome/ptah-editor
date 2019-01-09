<template>
  <div class="b-base-image-upload">
    <div class="b-base-image-upload__side">
      <template v-if="url">
        <span class="b-base-image-upload__button b-base-image-upload__button_preview">
          <img class="b-base-image-upload-preview__image"
            :src="url"
            width="32"
            height="32"
            alt="">
        </span>
        <span
          class="b-base-image-upload__button b-base-image-upload__button_remove"
          @click="clearValue"
          >
          <IconBase name="close" width="14" height="14" color="#FFFFFF" />
        </span>
      </template>

      <span
        v-else
        class="b-base-image-upload__button b-base-image-upload__button_add"
        @click="chooseFile">
        <IconBase name="upload" width="16" height="16" color="#436FEE" />
      </span>
      <input
        style="display: none;"
        type="file"
        accept="image/*"
        ref="uploadInput"
        @change="uploadFileAndHandleData"/>
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
    event: 'change'
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
      this.$emit('change', value)
    }
  },

  data () {
    return {
      url: this.value
    }
  },

  methods: {
    uploadFileAndHandleData (event) {
      this.uploadFile(event)
        .then((data) => { this.url = data.src })
        .catch((error) => console.warn(error))
    },

    chooseFile () {
      this.$refs.uploadInput.click()
    },

    uploadFile (event) {
      return api.uploadFileFromInputFile(event)
    },

    clearValue () {
      this.url = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.b-base-image-upload
  display: flex
  flex-direction: row

  &-preview__image
    width: 100%
    height: 100%

  &__side
    cursor: pointer
    height: 4.8rem
    width: 4.8rem
    margin-right: 1.4rem
    display: flex
    align-items: center
    justify-content: center
    position: relative

  &__button
    border: 2px solid rgba(#888888, 0.2)
    height: 4.8rem
    width: 4.8rem
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center

    &_preview
      overflow: hidden

    &_remove
      z-index: 10
      position: absolute
      border-color: #FF3C5F
      background: rgba(#FF3C5F, 0.65)
      opacity: 0
      transition: opacity 0.1s ease

      .b-base-image-upload__side:hover &
        opacity: 1

    &_add
      &:hover
        border-color: #436FEE

      svg
        margin-bottom: 0.2rem

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
