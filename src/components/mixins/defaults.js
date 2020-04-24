import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'
import forEach from 'lodash-es/forEach'

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
    },

    '$store.state.currentLanding.settings.logo': {
      handler (value) {
        if (value.length) {
          this.changeLogos(value)
        }
      }
    }
  },

  beforeDestroy () {
    this.$section.set(`$sectionData.components`, [])
  },

  mounted () {
    let logo = this.$store.state.currentLanding.settings.logo

    if (logo.length) {
      this.changeLogos(logo)
    }
  },

  methods: {
    ...mapActions('Landing', ['saveState']),
    ...mapActions('Sidebar', ['toggleDragStop']),

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

    changeLogos (url) {
      let paths = []

      // find all logos in section
      forEach(this.$sectionData, (value, key) => {
        if (key.indexOf('components') > -1) {
          value.forEach((element, index) => {
            if (element.name === 'Logo') {
              paths.push(`$sectionData.${key}[${index}].element.styles['background-image']`)
            }
          })
        }
      })

      paths.forEach(path => this.$section.set(path, `url(${url})`))
    }
  }
}
