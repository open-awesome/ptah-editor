import { mapState } from 'vuex'

export default {
  inject: ['$section'],

  computed: {
    ...mapState('Sidebar', [
      'device'
    ]),

    isMobile () {
      return this.device === 'is-mobile'
    },

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },

    mediaStyles () {
      let device = 'is-mobile'
      let stylesMedia = this.$section.get(`$sectionData.${this.path}.media`)
      let sizeIcons = this.$section.get(`$sectionData.${this.path}.sizeIcons`)
      let formStyles = this.$section.get(`$sectionData.${this.path}.formStyles`)
      let media = { 'is-mobile': {} }

      if (stylesMedia === undefined) {
        stylesMedia = media
      }

      // set sizeIcons for elements
      if (sizeIcons) {
        media[device]['sizeIcons'] = stylesMedia[device]['sizeIcons'] !== undefined ? stylesMedia[device]['sizeIcons'] : sizeIcons
      }

      // set formStyles for form
      if (formStyles) {
        media[device]['formStyles'] = stylesMedia[device]['formStyles'] !== undefined ? stylesMedia[device]['formStyles'] : sizeIcons
      }

      if (stylesMedia[device]) {
        for (let key in this.styles) {
          media[device][key] = stylesMedia[device][key] !== undefined ? stylesMedia[device][key] : this.styles[key]
        }
      } else {
        media[device] = this.styles
      }

      this.$section.set(`$sectionData.${this.path}.media`, media)

      return media
    },

    objVarsMedia () {
      return {
        '--mobile-margin-top': this.mediaStyles['is-mobile']['margin-top'],
        '--mobile-margin-right': this.mediaStyles['is-mobile']['margin-right'],
        '--mobile-margin-bottom': this.mediaStyles['is-mobile']['margin-bottom'],
        '--mobile-margin-left': this.mediaStyles['is-mobile']['margin-left'],
        '--mobile-padding-top': this.mediaStyles['is-mobile']['padding-top'],
        '--mobile-padding-right': this.mediaStyles['is-mobile']['padding-right'],
        '--mobile-padding-bottom': this.mediaStyles['is-mobile']['padding-bottom'],
        '--mobile-padding-left': this.mediaStyles['is-mobile']['padding-left']
      }
    },

    objVarsTypo () {
      return {
        '--mobile-font-family': this.mediaStyles['is-mobile']['font-family'],
        '--mobile-font-size': this.mediaStyles['is-mobile']['font-size'],
        '--mobile-line-height': this.mediaStyles['is-mobile']['line-height'],
        '--mobile-text-align': this.mediaStyles['is-mobile']['text-align'],
        '--mobile-justify-content': this.mediaStyles['is-mobile']['justify-content']
      }
    }
  }
}
