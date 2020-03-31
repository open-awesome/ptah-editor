<template>
  <div class="b-base-upload-button">
    <form
      class="b-base-upload__inner"
    >
      <input
        style="display: none;"
        type="file"
        accept="image/*"
        ref="uploadInput"
        @change="onUploadClick"
      />
      <BaseButton
        :disabled="progress"
        @click.prevent="upload"
        color="main-green"
        size="middle"
      >
        <template v-if="!palette">
          Upload an image
        </template>
        <template v-else>
          Upload a new image
        </template>
      </BaseButton>
    </form>
  </div>
</template>

<script>
import api from '@store/api'
import { mapState } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'upload'
  },

  props: {
    progress: Boolean
  },

  data () {
    return {
      url: this.value
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    palette () {
      return this.currentLanding.settings.palette
    }
  },

  methods: {
    onUploadClick (event) {
      this.$emit('startProgress', true)
      this.uploadFile(event)
    },

    upload () {
      this.$refs.uploadInput.click()
    },

    uploadFile (event) {
      this.$emit('upload', api.uploadFileAfterClickButton(event))
    }

  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_variables.sass'

.b-base-upload-button
  margin: 2.6rem 0
  width: 100%

  display: flex
  align-items: center
  justify-content: center

</style>
