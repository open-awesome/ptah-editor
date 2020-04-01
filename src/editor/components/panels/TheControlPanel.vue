<template>
  <!-- @click.stop was here. this breaks down the color picker -->
  <div class="b-control-panel" v-if="controlPanel.name">
    <span class="b-control-panel__close" @click="close">
      <IconBase
        name="close"
        width="13"
        height="12"
        color="#a2a5a5"
      />
    </span>

    <component
      :is="panelName"
      :builder="builder"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ThePanelSection from './ThePanelSection'
import ThePanelSectionLayout from './ThePanelSectionLayout'
import ThePanelSlot from './ThePanelSlot'
import ThePanelSlotSettings from './ThePanelSlotSettings'
import ThePanelButton from './ThePanelButton'
import ThePanelNetworks from './ThePanelNetworks'
import ThePanelText from './ThePanelText'
import ThePanelTimer from './ThePanelTimerSettings'
import ThePanelImage from './ThePanelImage'
import ThePanelImageLink from './ThePanelImageLink'
import ThePanelAvailable from './ThePanelAvailable'
import ThePanelRestrictions from './ThePanelRestrictions'
import ThePanelInline from './ThePanelInlineEdit'
import ThePanelIconWithText from './ThePanelIconWithText'
import ThePanelSectionBackground from './ThePanelSectionBackground'
import ThePanelSlotBackground from './ThePanelSlotBackground'
import ThePanelSectionSystemSettings from './ThePanelSectionSystemSettings'
import ThePanelSectionSystemStyle from './ThePanelSectionSystemStyle'
import ThePanelSectionGallerySettings from './ThePanelSectionGallerySettings'
import ThePanelSectionGalleryStyle from './ThePanelSectionGalleryStyle'
import ThePanelVideo from './ThePanelVideo'
import ThePanelIframe from './ThePanelIframe'
import ThePanelForm from './ThePanelForm'
import ThePanelSectionProductsColumnsSettings from './ThePanelSectionProductsColumnsSettings'
import ThePanelSectionColumnsSettings from './ThePanelSectionColumnsSettings'
import ThePanelToggleElement from './ThePanelToggleElement'
import ThePanelGroupBackground from './ThePanelGroupBackground'

export default {
  name: 'TheControlPanel',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectType',
      'controlPanel'
    ]),

    panelName () {
      return `ThePanel${this.controlPanel.name}`
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'setControlPanel',
      'toggleSectionsTreeMenu'
    ]),

    close () {
      this.setControlPanel(false)
      this.toggleSectionsTreeMenu(true)
    }
  },

  components: {
    ThePanelSection,
    ThePanelSectionLayout,
    ThePanelButton,
    ThePanelNetworks,
    ThePanelText,
    ThePanelTimer,
    ThePanelSlot,
    ThePanelSlotSettings,
    ThePanelAvailable,
    ThePanelRestrictions,
    ThePanelInline,
    ThePanelImage,
    ThePanelImageLink,
    ThePanelIconWithText,
    ThePanelSectionBackground,
    ThePanelSlotBackground,
    ThePanelSectionSystemSettings,
    ThePanelSectionSystemStyle,
    ThePanelForm,
    ThePanelVideo,
    ThePanelIframe,
    ThePanelSectionProductsColumnsSettings,
    ThePanelSectionGallerySettings,
    ThePanelSectionGalleryStyle,
    ThePanelSectionColumnsSettings,
    ThePanelToggleElement,
    ThePanelGroupBackground
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-control-panel
  position: relative
  width: 30.5rem
  height: 100%

  display: flex
  flex-direction: column

  background: $white

  color: $dark-grey
  font-size: 1.4rem
  letter-spacing: -0.01em

  &__title
    color: $black
    font-size: 2rem
    font-weight: bold

    min-width: 28rem
    margin: 0 0 2.8rem 0
    padding: 0
    &:first-letter
      text-transform: uppercase

  &__close
    position: absolute
    top: 1.9rem
    right: 1.7rem
    z-index: 1

    cursor: pointer

    width: 3.6rem
    height: 3.6rem

    display: flex
    justify-content: center
    align-items: center

    border-radius: 100%
    transition: background .3s cubic-bezier(.2,.85,.4,1.275)
    & svg
      transition: fill .3s cubic-bezier(.2,.85,.4,1.275)
    &:hover
      cursor: pointer
      background: rgba(#000000, 0.05)
    &:active
      cursor: pointer
      background: rgba(#00ADB6, 0.05)
      & svg
        fill: $main-green
</style>
