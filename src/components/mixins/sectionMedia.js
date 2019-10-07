const LIST_PROPS_STYLES = [
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
let LIST_PROPS_TYPO = [
  'font-family',
  'font-size',
  'color',
  'line-height'
]
let LIST_PROPS_SIZE = [
  'width'
]

export default {
  $schema: {
    objVarsMedia: {},
    objVarsTypo: {},
    objVarsSizeIcons: {},
    objVarsTable: {}
  },

  watch: {
    '$sectionData.mainStyle.styles': {
      handler () {
        this.mediaStyles()
      },
      deep: true
    },
    '$sectionData.mainStyle.textStyles': {
      handler () {
        this.mediaTextStyles()
      },
      deep: true
    },
    '$sectionData.mainStyle.sizeIcons': {
      handler () {
        this.mediaSizeIcons()
      },
      deep: true
    },
    '$sectionData.mainStyle.table': {
      handler () {
        this.mediaTableStyles()
      },
      deep: true
    }
  },

  methods: {
    mediaStyles () {
      let obj = {}

      LIST_PROPS_STYLES.forEach((e) => {
        obj[`--mobile-section-${e}`] = this.$sectionData.mainStyle.media['is-mobile'][e]
          ? this.$sectionData.mainStyle.media['is-mobile'][e]
          : this.$sectionData.mainStyle.styles[e]
      })
      this.$sectionData.objVarsMedia = obj
    },

    mediaTextStyles () {
      let obj = {}

      // for section gallery
      if (this.$sectionData.mainStyle['textStyles']) {
        LIST_PROPS_TYPO.forEach((e) => {
          obj[`--mobile-section-text-styles-chapter-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['textStyles']['chapter'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['textStyles']['chapter'][e]
            : this.$sectionData.mainStyle['textStyles']['chapter'][e]

          obj[`--mobile-section-text-styles-text-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['textStyles']['text'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['textStyles']['text'][e]
            : this.$sectionData.mainStyle['textStyles']['text'][e]
        })
        this.$sectionData.objVarsTypo = obj
      }
    },

    mediaSizeIcons () {
      let obj = {}

      // for section system
      if (this.$sectionData.mainStyle['sizeIcons']) {
        LIST_PROPS_SIZE.forEach((e) => {
          obj[`--mobile-section-size-icons-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['sizeIcons'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['sizeIcons'][e] + 'px'
            : this.$sectionData.mainStyle['sizeIcons'][e] + 'px'
        })
        this.$sectionData.objVarsSizeIcons = obj
      }
    },

    mediaTableStyles () {
      let obj = {}

      // for table
      if (this.$sectionData.mainStyle['table']) {
        LIST_PROPS_TYPO.forEach((e) => {
          obj[`--mobile-section-table-head-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['table']['head'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['table']['head'][e]
            : this.$sectionData.mainStyle['table']['head'][e]

          obj[`--mobile-section-table-body-${e}`] = this.$sectionData.mainStyle.media['is-mobile']['table']['body'][e]
            ? this.$sectionData.mainStyle.media['is-mobile']['table']['body'][e]
            : this.$sectionData.mainStyle['table']['body'][e]
        })
        this.$sectionData.objVarsTable = obj
      }
    }
  }
}
