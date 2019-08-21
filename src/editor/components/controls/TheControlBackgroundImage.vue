<script>
import { mapState } from 'vuex'
import { getPseudoTemplate, randomPoneId } from '../../util'

export default {

  data () {
    return {
      bgImage: '',
      bgHoverImage: '',
      bgSize: '',
      label: '',
      labelHover: '',
      isStretchImage: false
    }
  },

  created () {
    let image = this.styles['background-image']
    let pBackgroundImage = ''

    if (this.pseudo && this.pseudo['hover']) {
      pBackgroundImage = this.pseudo['hover']['background-image'].split('!')[0]
    }

    if (image && image !== 'none') {
      let images = image.match(/url\(.+(?=\))/g) || []
      let result = images.map(url => url.replace(/url\(/, ''))[0]
      if (result) {
        this.bgImage = (result.match(/^("")|("")$/)) ? JSON.parse(result) : result
      }
    }
    this.bgSize = this.styles['background-size'] || 'contain'

    if (this.bgSize === 'cover') {
      this.isStretchImage = true
    }

    if (pBackgroundImage && pBackgroundImage !== 'none') {
      let images = pBackgroundImage.match(/url\(.+(?=\))/g) || []
      let result = images.map(url => url.replace(/url\(/, ''))[0]
      this.bgHoverImage = (result.match(/^("")|("")$/)) ? JSON.parse(result) : result
    }

    if (this.settingObjectType === 'image' || this.settingObjectType === 'logo') {
      this.label = this.settingObjectType
    } else {
      this.label = this.settingObjectType + ' image'
    }

    this.labelHover = 'Hover image'
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
        this.styles['background-size'] = 'cover'
      } else {
        this.styles['background-size'] = 'contain'
      }
    },

    changeBgHoverImage () {
      let bg = 'none'
      if (this.bgHoverImage !== null && this.bgHoverImage !== '') {
        bg = 'url(' + this.bgHoverImage + ')'
      }
      this.changePseudo('background-image', bg)
    },

    changePseudo (attr, style, pseudoClass = 'hover') {
      if (style !== '') {
        this.changePseudoStyle(attr, style + '!important')
        this.pseudo[pseudoClass][attr] = style + '!important'
      }
    },

    /**
     * Add style to pseudocalss
     * @param attr {string}
     * @param style {string}
     * @param pseudoClass {string}
     */
    changePseudoStyle (attr, style, pseudoClass = 'hover') {
      const poneId = randomPoneId()
      this.pseudo[pseudoClass][attr] = style
      this.settingObjectElement.dataset.pone = poneId

      let styleTemplate = getPseudoTemplate(poneId, this.settingObjectOptions.pseudo)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    }
  }
}
</script>

<template>
  <div class="b-bg-controls"
       v-if="settingObjectType === 'button' || settingObjectType === 'image' || settingObjectType === 'slogan'">
    <div class="b-bg-controls__control">
      <base-uploader
          v-model="bgImage"
          @change="changeImage"
          :label="label"/>
    </div>
    <div class="b-bg-controls__control" v-if="pseudo">
      <base-uploader
        v-model="bgHoverImage"
        @change="changeBgHoverImage"
        :label="labelHover"/>
    </div>
    <div class="b-bg-controls__control">
      <BaseSwitcher v-model="isStretchImage" :label="$t('c.stretch')" @change="setStretch" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-bg-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    margin-bottom: $size-step/2
    &:lastt-child
      margin-bottom: 0
</style>
