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
      this.$el.classList.add('_hover')
      this.setHoverBy('element')
    },

    mouseleave () {
      this.$el.classList.remove('_hover')
      this.setHoverBy('')
    }
  }
}
