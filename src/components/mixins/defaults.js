import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'

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

    dragStop (event) {
      this.selectElement(event.moved.newIndex)

      this.toggleDragStop(false)
    },

    drag (arrayName) {
      this.arrayName = arrayName

      this.toggleDragStop(true)
    },

    selectElement (newIndex) {
      let idSection = this.id
      let section = document.getElementById(`section_${idSection}`)
      let el = section.querySelector(`[path="${this.arrayName}[${newIndex}].element"]`)

      this.clickOnElement(el)
    },

    clickOnElement (el) {
      let machineEvent = new Event('mousedown', { bubbles: true })
      el.dispatchEvent(machineEvent)
    }
  }
}
