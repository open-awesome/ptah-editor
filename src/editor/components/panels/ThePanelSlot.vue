<template>
  <div class="b-panel">
    <elements-list @addEl="addElement"/>
  </div>
</template>

<script>
import ElementsList from '@components/slots/ElementsList'
import { mapState, mapActions } from 'vuex'
import { randomPoneId } from '@editor/util'

export default {
  name: 'ThePanelSlot',

  components: { ElementsList },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', ['settingObjectOptions', 'settingObjectSection', 'sandbox']),

    components: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.components, value)
      },
      get () {
        return this.settingObjectSection.get(this.sandbox.components) || []
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', ['clearSettingObjectLight']),

    addElement (element) {
      element.element.removable = true
      element.key = randomPoneId()
      this.components = [...this.components, element]
    }
  }
}
</script>
