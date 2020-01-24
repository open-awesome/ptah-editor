import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'
import { uniq } from 'lodash'

export default {
  components: {
    Draggable
  },

  data () {
    return {
      arrayName: ''
    }
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  watch: {
    '$sectionData': {
      handler () {
        let newState = this.$builder.export('JSON')
        this.saveState(newState)
      },
      deep: true
    }
  },

  methods: {
    ...mapActions('Landing', ['saveState']),
    ...mapActions('Sidebar', ['toggleDragStop']),
    ...mapActions(['storeSettings', 'storeSaveSettings']),

    $_dragStop (event) {
      this.selectElement(event.moved.newIndex)

      this.toggleDragStop(false)
    },

    $_drag (arrayName) {
      this.arrayName = arrayName

      this.toggleDragStop(true)
    },

    selectElement (newIndex) {
      let idSection = this.id
      let section = document.getElementById(`section_${idSection}`)
      let el = section.querySelector(`[path="${this.arrayName}[${newIndex}].element"]`)
      let resize = el.querySelector(`.resizable.vdr`)

      if (resize) {
        el = resize
      }

      this.clickOnElement(el)
    },

    clickOnElement (el) {
      let machineEvent = new Event('mousedown', { bubbles: true })
      el.dispatchEvent(machineEvent)
    },

    storeFonts (fontsArr) {
      let objFonts = {}

      fontsArr.forEach(font => {
        if (!objFonts[font]) {
          objFonts[font] = {
            variants: ['regular'],
            subsets: ['latin']
          }
        }
      })

      this.storeSaveSettings(objFonts)
    },

    setFontFromSectiontoStore () {
      let fontsArr = []

      for (let key in this.$sectionData) {
        let obj = this.$sectionData[key]

        if (key.indexOf('components') !== -1) {
          obj.forEach(el => {
            if (el.element.styles['font-family'] !== undefined) {
              const fontFamily = el.element.styles['font-family']
              fontsArr = [
                ...fontsArr,
                fontFamily
              ]
            }
          })
        }
      }

      if (fontsArr.length > 0) {
        this.storeFonts(uniq(fontsArr))
      }
    }
  },

  mounted () {
    this.setFontFromSectiontoStore()
  }
}
