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

      list.forEach((e) => {
        obj[`--mobile-section-${e}`] = this.$sectionData.mainStyle.media['is-mobile'][e]
          ? this.$sectionData.mainStyle.media['is-mobile'][e]
          : this.$sectionData.mainStyle.styles[e]
      })

      this.$sectionData.objVarsMedia = obj
    }
  }
}
