<template>
  <div class="b-control-panel">
    <button class="b-control-panel__close" @click="setControlPanel(false)">
      <icon-base width="10" height="10" name="close"/>
    </button>
    <component :is="panelName" :builder="builder"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ThePanelSection from './ThePanelSection'
import ThePanelSlot from './ThePanelSlot'
import ThePanelButton from './ThePanelButton'
import ThePanelSocialSettings from './ThePanelSocialSettings'
import ThePanelSocialStyle from './ThePanelSocialStyle'
import ThePanelText from './ThePanelText'
import ThePanelTimerSettings from './ThePanelTimerSettings'
import ThePanelTimerStyle from './ThePanelTimerStyle'

export default {
  name: 'TheControlPanel',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', ['settingObjectType', 'controlPanel']),

    panelName () {
      return `ThePanel${this.controlPanel.name}`
    }
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel'])
  },

  components: {
    ThePanelSection,
    ThePanelButton,
    ThePanelSocialSettings,
    ThePanelSocialStyle,
    ThePanelText,
    ThePanelTimerSettings,
    ThePanelTimerStyle,
    ThePanelSlot
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-control-panel
  position: relative
  width: $size-step*9
  height: 100%
  padding: 2.8rem 0.5rem 2.8rem 3.2rem

  display: flex
  flex-direction: column

  background: $white
  box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)

  &__close
    position: absolute
    right: 1rem
    top: 1rem
    padding: 0.6rem 1rem
    border: 0
    background: transparent
    cursor: pointer
</style>
