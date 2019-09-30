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
      let media = this.$section.get(`$sectionData.${this.path}.media`)

      if (media === undefined) {
        media = {
          'is-mobile': this.styles
        }
        this.$section.set(`$sectionData.${this.path}.media`, media)
      }

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
