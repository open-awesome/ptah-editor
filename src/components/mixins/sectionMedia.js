import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('Sidebar', [
      'device',
      'isMobile'
    ]),

    styles () {
      return this.$sectionData.mainStyle.styles
    },

    media () {
      return this.$sectionData.mainStyle.media
    },

    mediaStyles () {
      let device = 'is-mobile'
      let stylesMedia = this.$sectionData.mainStyle.media
      let media = { 'is-mobile': {} }

      if (stylesMedia === undefined) {
        stylesMedia = media
      }

      if (stylesMedia[device]) {
        for (let key in this.styles) {
          media[device][key] = stylesMedia[device][key] !== undefined ? stylesMedia[device][key] : this.styles[key]
        }
      } else {
        media[device] = this.styles
      }

      return media
    },

    objVarsMedia () {
      return {
        '--mobile-section-margin-top': this.mediaStyles['is-mobile']['margin-top'],
        '--mobile-section-margin-right': this.mediaStyles['is-mobile']['margin-right'],
        '--mobile-section-margin-bottom': this.mediaStyles['is-mobile']['margin-bottom'],
        '--mobile-section-margin-left': this.mediaStyles['is-mobile']['margin-left'],
        '--mobile-section-padding-top': this.mediaStyles['is-mobile']['padding-top'],
        '--mobile-section-padding-right': this.mediaStyles['is-mobile']['padding-right'],
        '--mobile-section-padding-bottom': this.mediaStyles['is-mobile']['padding-bottom'],
        '--mobile-section-padding-left': this.mediaStyles['is-mobile']['padding-left']
      }
    },

    objVarsTypo () {
      return {
        '--mobile-section-font-family': this.mediaStyles['is-mobile']['font-family'],
        '--mobile-section-font-size': this.mediaStyles['is-mobile']['font-size'],
        '--mobile-section-line-height': this.mediaStyles['is-mobile']['line-height'],
        '--mobile-section-text-align': this.mediaStyles['is-mobile']['text-align'],
        '--mobile-section-justify-content': this.mediaStyles['is-mobile']['justify-content']
      }
    }
  }
}
