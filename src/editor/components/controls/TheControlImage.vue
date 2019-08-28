<script>
import { mapState, mapActions } from 'vuex'

const defaultBg = 'https://gn680.cdn.stg.gamenet.ru/0/8qGME/o_OIgnu.png'

export default {

  data () {
    return {
      bgImage: '',
      bgSize: '',
      label: '',
      isStretchImage: false
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
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
    } else {
      this.bgImage = defaultBg
    }
    this.bgSize = this.styles['background-size'] || 'contain'

    if (this.bgSize === 'cover') {
      this.isStretchImage = true
    }

    this.label = 'Image'
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeImage () {
      let bg = 'none'
      if (this.bgImage !== null && this.bgImage !== '') {
        bg = `url(${this.bgImage})`
      } else {
        bg = `url(${defaultBg})`
      }
      this.styles['background-image'] = bg
    },

    setStretch () {
      if (this.isStretchImage) {
        this.styles['background-size'] = 'cover'
      } else {
        this.styles['background-size'] = 'contain'
      }
    }
  }
}
</script>

<template>
  <div class="b-controls"
       v-if="settingObjectType === 'button' || settingObjectType === 'image' || settingObjectType === 'slogan'">
    <div class="b-controls__control">
      <base-uploader
        v-model="bgImage"
        @change="changeImage"
        :label="label"
      />
    </div>
    <div class="b-controls__control">
      <BaseSwitcher
        v-model="isStretchImage"
        :label="$t('c.stretch')"
        @change="setStretch"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  &__control
    margin-bottom: $size-step/2
    &:lastt-child
      margin-bottom: 0
</style>
