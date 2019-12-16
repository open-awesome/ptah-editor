import { mapActions, mapState } from 'vuex'
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  inject: ['$section'],

  components: {
    VueDraggableResizable
  },

  data: function () {
    return {
      width: 0,
      height: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectElement'
    ]),

    objVarsResize () {
      return {
        '--mobile-width': this.mediaStyles['is-mobile']['width'],
        '--mobile-height': this.mediaStyles['is-mobile']['height']
      }
    }
  },

  created () {
    this.width = parseInt(this.styles.width.split('px')[0]) || 150
    this.height = parseInt(this.styles.height.split('px')[0]) || 150
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleResizeStop'
    ]),

    $_onResizeStop (x, y, width, height) {
      this.toggleResizeStop(this.path)
    },

    $_onResize (x, y, width, height) {
      let parents = {}
      let max = {}
      let prop = 'styles'

      parents['width'] = this.settingObjectElement.closest('.b-draggable-slot')
      parents['height'] = this.settingObjectElement.closest('section') || this.settingObjectElement.closest('header') || this.settingObjectElement.closest('footer')

      max['width'] = parents['width'].offsetWidth
      max['height'] = parseInt(parents['height'].offsetHeight)

      if (width > max['width']) width = max['width']
      if (height > max['height']) height = max['height']

      if (this.isMobile) {
        prop = `media[${this.device}]`
      }

      this.$section.set(`$sectionData.${this.path}.${prop}.width`, width + 'px')
      this.$section.set(`$sectionData.${this.path}.${prop}.height`, height + 'px')
    }
  }
}
