<script>
import { mapState } from 'vuex'
import { getPseudoTemplate, randomPoneId } from '../../util'
import ControlBackgroundPosition from './../controls/TheControlBackgroundPosition'

export default {
  components: {
    ControlBackgroundPosition
  },

  data () {
    return {
      bgImage: '',
      bgHoverImage: '',
      bgSize: '',
      label: '',
      labelHover: '',
      isStretchImage: false,
      isShowBgImage: false,
      isShowHoverBgImage: false
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
  },

  mounted () {
    if (this.bgImage !== '' && this.bgImage !== null) {
      this.isShowBgImage = true
    }

    if (this.bgHoverImage !== '' && this.bgHoverImage !== null) {
      this.isShowHoverBgImage = true
    }
  }
}
</script>

<template>
  <div v-if="settingObjectType === 'button' || settingObjectType === 'image' || settingObjectType === 'slogan'">
    <div class="b-panel__control">
      <div class="b-panel__col">
        <div class="b-panel__row">
          <BaseSwitcher
            :label="label"
            v-model="isShowBgImage"
          />
        </div>
      </div>
    </div>

    <div class="b-panel__col" v-if="isShowBgImage">
      <div>
        <base-uploader
          v-model="bgImage"
          @change="changeImage"
          :label="label"
        />
      </div>
      <template v-if="settingObjectType === 'button' && bgImage !== '' && bgImage !== null">
        <div class="b-panel__control">
          <control-background-position />
        </div>
      </template>
      <div class="b-panel__control">
        <BaseSwitcher
          v-model="isStretchImage"
          :label="$t('c.stretch')"
          @change="setStretch"
        />
      </div>
    </div>

    <div class="b-panel__control">
      <div class="b-panel__col">
        <div class="b-panel__row">
          <BaseSwitcher
            :label="labelHover"
            v-model="isShowHoverBgImage"
          />
        </div>
      </div>
    </div>
    <div class="b-panel__col" v-if="pseudo && isShowHoverBgImage">
      <div class="b-panel__control">
        <base-uploader
          v-model="bgHoverImage"
          @change="changeBgHoverImage"
          :label="labelHover"
        />
      </div>
    </div>
  </div>
</template>
