import { mapActions, mapState } from 'vuex'

export default {
  inject: ['$section'],

  computed: {
    ...mapState('Sidebar', [
      'hoverBy'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'setHoverBy'
    ]),
    mouseover () {
      this.setHoverBy('element')
    },

    mouseleave () {
      this.setHoverBy('')
    }
  }
}
