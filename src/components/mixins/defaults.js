import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'

export default {
  components: {
    Draggable
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
      this.toggleDragStop(true)
      event.moved.element.element['isDragged'] = true
    }
  }
}
