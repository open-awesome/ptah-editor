<script>
import { mapState } from 'vuex'

export default {

  data () {
    return {
      bgImage: '',
      bgSize: '',
      label: '',
      labelHover: '',
      isStretchImage: false
    }
  },

  created () {
    let image = this.styles['background-image']
    if (image && image !== 'none') {
      let images = image.match(/url\(.+(?=\))/g) || []
      let result = images.map(url => url.replace(/url\(/, ''))[0]
      if (result) {
        this.bgImage = (result.match(/^("")|("")$/)) ? JSON.parse(result) : result
      }
    }
    this.bgSize = this.styles['background-size'] || 'cover'
    this.label = this.settingObjectType + ' image'

    console.log(this.bgImage)
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectType'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    }

  },

  methods: {
    changeImage () {
      let bg = 'none'
      if (this.bgImage !== null && this.bgImage !== '') {
        bg = `url(${this.bgImage})`
      }
      this.styles['background-image'] = bg
    },

    setStretch () {
      if (this.isStretchImage) {
        this.styles['background-size'] = 'contain'
      } else {
        this.styles['background-size'] = 'cover'
      }
    }
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-bg-controls__control">
      <base-uploader
          v-model="bgImage"
          @change="changeImage"
          :label="label"/>
    </div>
    <div class="b-bg-controls__control" v-if="bgImage !== '' || bgImage !== 'none' || bgImage !== null">
      <BaseSwitcher v-model="isStretchImage" @change="setStretch" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-bg-controls
  &__control
    margin-top: 2.2rem
</style>
