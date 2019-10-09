import { mapState } from 'vuex'

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

  computed: {
    ...mapState('Sidebar', [
      'device'
    ])
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
    },
    'device': {
      handler () {
        this.mediaStyles()
      }
    }
  },

  methods: {
    mediaStyles () {
      let obj = {}

      LIST_PROPS_STYLES.forEach((e) => {
        let propM = this.$sectionData.mainStyle.media['is-mobile'][e]
        let propS = this.$sectionData.mainStyle.styles[e]

        obj[`--mobile-section-${e}`] = propM && propM !== '' ? propM : propS
      })
      this.$sectionData.objVarsMedia = obj
    },

    mediaTextStyles () {
      let obj = {}

      // for section gallery
      if (this.$sectionData.mainStyle['textStyles']) {
        LIST_PROPS_TYPO.forEach((e) => {
          let propMC = this.$sectionData.mainStyle.media['is-mobile']['textStyles']['chapter'][e]
          let propSC = this.$sectionData.mainStyle['textStyles']['chapter'][e]
          let propMT = this.$sectionData.mainStyle.media['is-mobile']['textStyles']['text'][e]
          let propST = this.$sectionData.mainStyle['textStyles']['text'][e]

          obj[`--mobile-section-text-styles-chapter-${e}`] = propMC && propMC !== '' ? propMC : propSC
          obj[`--mobile-section-text-styles-text-${e}`] = propMT && propMT !== '' ? propMT : propST
        })
        this.$sectionData.objVarsTypo = obj
      }
    },

    mediaSizeIcons () {
      let obj = {}

      // for section system
      if (this.$sectionData.mainStyle['sizeIcons']) {
        LIST_PROPS_SIZE.forEach((e) => {
          let propM = this.$sectionData.mainStyle.media['is-mobile']['sizeIcons'][e]
          let propS = this.$sectionData.mainStyle['sizeIcons'][e]

          obj[`--mobile-section-size-icons-${e}`] = propM && propM !== '' ? propM + 'px' : propS + 'px'
        })
        this.$sectionData.objVarsSizeIcons = obj
      }
    },

    mediaTableStyles () {
      let obj = {}

      // for table
      if (this.$sectionData.mainStyle['table']) {
        LIST_PROPS_TYPO.forEach((e) => {
          let propMH = this.$sectionData.mainStyle.media['is-mobile']['table']['head'][e]
          let propSH = this.$sectionData.mainStyle['table']['head'][e]
          let propMB = this.$sectionData.mainStyle.media['is-mobile']['table']['body'][e]
          let propSB = this.$sectionData.mainStyle['table']['body'][e]

          obj[`--mobile-section-table-head-${e}`] = propMH && propMH !== '' ? propMH : propSH

          obj[`--mobile-section-table-body-${e}`] = propMB && propMB !== '' ? propMB : propSB
        })
        this.$sectionData.objVarsTable = obj
      }
    }
  },

  mounted () {
    this.mediaStyles()
    this.mediaTextStyles()
    this.mediaSizeIcons()
    this.mediaTableStyles()
  }
}
