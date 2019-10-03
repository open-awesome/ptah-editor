export default {
  $schema: {
    objVarsMedia: {},
    objVarsTypo: {},
    objVarsSizeIcons: {},
    objVarsTable: {}
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
      let objSizeIcons = {}
      let objTable = {}
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
        'color',
        'line-height'
      ]
      let listSize = [
        'width'
      ]

      list.forEach((e) => {
        obj[`--mobile-section-${e}`] = this.$sectionData.mainStyle.media['is-mobile'][e]
          ? this.$sectionData.mainStyle.media['is-mobile'][e]
          : this.$sectionData.mainStyle.styles[e]
      })
      this.$sectionData.objVarsMedia = obj

      // for section gallery
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

      // for section system
      if (this.$sectionData.mainStyle['sizeIcons']) {
        listSize.forEach((e) => {
          objSizeIcons[`--mobile-section-size-icons-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['sizeIcons'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['sizeIcons'][e] + 'px'
            : this.$sectionData.mainStyle['sizeIcons'][e] + 'px'
        })
        this.$sectionData.objVarsSizeIcons = objSizeIcons
      }

      // for table
      if (this.$sectionData.mainStyle['table']) {
        listTypo.forEach((e) => {
          objTable[`--mobile-section-table-head-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['table']['head'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['table']['head'][e]
            : this.$sectionData.mainStyle['table']['head'][e]

          objTable[`--mobile-section-table-body-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['table']['body'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['table']['body'][e]
            : this.$sectionData.mainStyle['table']['body'][e]
        })
        this.$sectionData.objVarsTable = objTable
      }
    }
  }
}
