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
      let obj = {}
      let objTypo = {}
      let list = [
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'background-color',
        'background-image',
        'background-position',
        'background-repeat',
        'background-size',
        'background-attachment'
      ]
      let listTypo = [
        'font-family',
        'font-size',
        'color'
      ]

      list.forEach((e) => {
        obj[`--mobile-section-${e}`] = this.$sectionData.mainStyle.media['is-mobile'][e]
          ? this.$sectionData.mainStyle.media['is-mobile'][e]
          : this.$sectionData.mainStyle.styles[e]
      })
      this.$sectionData.objVarsMedia = obj

      // for gallery
      if (this.$sectionData.mainStyle['textStyles']) {
        listTypo.forEach((e) => {
          objTypo[`--mobile-section-text-styles-chapter-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['textStyles']['chapter'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['textStyles']['chapter'][e]
            : this.$sectionData.mainStyle['textStyles']['chapter'][e]

          objTypo[`--mobile-section-text-styles-text-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['textStyles']['text'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['textStyles']['text'][e]
            : this.$sectionData.mainStyle['textStyles']['text'][e]
        })
        this.$sectionData.objVarsTypo = objTypo
      }
    }
  }
}
