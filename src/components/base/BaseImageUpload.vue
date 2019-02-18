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
        <IconBase name="plus" width="16" height="16" color="#fff" />
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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-base-image-upload
  display: flex
  flex-direction: row

  &-preview__image
    width: 100%
    height: 100%

  &__side
    cursor: pointer
    height: $size-step*2
    width: $size-step*2
    margin-right: 1.4rem

    display: flex
    align-items: center
    justify-content: center

    position: relative
    background: rgba($dark-grey, 0.6)
    border-radius: 0.4rem

  &__button
    height: $size-step*2
    width: $size-step*2
    display: flex
    align-items: center
    justify-content: center
    &_preview
      overflow: hidden
      height: $size-step*1.5
      width: $size-step*1.5
      margin: 0 auto
      border-radius: 100%

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
      height: $size-step
      width: $size-step
      margin: 0 auto
      background: $dark-blue-krayola
      border-radius: 100%
      &:hover
        border-color: $dark-blue-krayola

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
