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
            @change="uploadImg"
            v-if="$builder.isEditing && mode === 'input'"
            />
        </form>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

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
    }
  },

  data: () => ({
    src: ''
  }),

  computed: {
    section () {
      return this.$section.get(`$sectionData.${this.path}`)
    }
  },

  mounted () {
    this.src = this.section.src
  },

  methods: {
    uploadImg: function (event) {
      console.log(event)

      let file = event.target.files || event.dataTransfer.files
      let self = this

      if (!file) {
        return
      }

      console.log(123)

      let request = new FormData()
      let $form = $(event.target).parent()

      request.append('file[]', file[0])
      request.append('method', 'storefront.upload')
      request.append('format', 'json')

      $form[0].reset()

      axios.post('//images.stg.gamenet.ru/restapi', request)
        .then(function (response) {
          if (!response.hasOwnProperty('data') || !response['data'].hasOwnProperty('response') ||
                    !response['data']['response'].hasOwnProperty('data') ||
                    !Array.isArray(response['data']['response']['data'])) {
            return
          }

          const data = response['data']['response']['data'][0]

          self.src = self.section.src = data.src

          self.$section.set(self.path, self.section)
        }).catch(function (e) {
          console.warn(e)
        })
    },

    onDrop: function (e) {
      e.stopPropagation()
      e.preventDefault()

      this.uploadImg(e)
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
