export default {
  $schema: {
    objVarsMedia: {}
  },

  watch: {
    '$sectionData.mainStyle': {
      handler () {
        this.mediaStyles()
      },
      deep: true
    }
  },

  methods: {
    mediaStyles () {
      this.$sectionData.objVarsMedia = {
        '--mobile-section-margin-top': this.$sectionData.mainStyle.media['is-mobile']['margin-top'],
        '--mobile-section-margin-right': this.$sectionData.mainStyle.media['is-mobile']['margin-right'],
        '--mobile-section-margin-bottom': this.$sectionData.mainStyle.media['is-mobile']['margin-bottom'],
        '--mobile-section-margin-left': this.$sectionData.mainStyle.media['is-mobile']['margin-left'],
        '--mobile-section-padding-top': this.$sectionData.mainStyle.media['is-mobile']['padding-top'],
        '--mobile-section-padding-right': this.$sectionData.mainStyle.media['is-mobile']['padding-right'],
        '--mobile-section-padding-bottom': this.$sectionData.mainStyle.media['is-mobile']['padding-bottom'],
        '--mobile-section-padding-left': this.$sectionData.mainStyle.media['is-mobile']['padding-left'],
        '--mobile-section-background-color': this.$sectionData.mainStyle.media['is-mobile']['background-color'],
        '--mobile-section-background-image': this.$sectionData.mainStyle.media['is-mobile']['background-image'],
        '--mobile-section-background-position': this.$sectionData.mainStyle.media['is-mobile']['background-position'],
        '--mobile-section-background-repeat': this.$sectionData.mainStyle.media['is-mobile']['background-repeat'],
        '--mobile-section-background-size': this.$sectionData.mainStyle.media['is-mobile']['background-size'],
        '--mobile-section-background-attachment': this.$sectionData.mainStyle.media['is-mobile']['background-attachment']
      }
    }
  }
}
