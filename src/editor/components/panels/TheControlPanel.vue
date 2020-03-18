<template>
  <!-- @click.stop was here. this breaks down the color picker -->
  <div class="b-control-panel">
    <span class="b-control-panel__close" @click="close">
      <IconBase
        name="firstPage"
        width="13"
        height="12"
        color="#a2a5a5"
      />
    </span>
    <div class="b-control-panel__mobile" v-if="isMobile">
      Settings for mobile devices
    </div>
    <component :is="panelName" :builder="builder"/>
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
      'controlPanel',
      'isMobile'
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
  width: 305px
  height: 100%
  padding: 1.7rem 1rem 1.7rem 1.6rem

  display: flex
  flex-direction: column

  background: $white

  color: $dark-grey
  font-size: 1.4rem
  letter-spacing: -0.01em

  &__mobile
    font-size: 1.2rem

    padding: $size-step/8 0
    color: $main-green
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
    color: $grey
    position: absolute
    top: 24px
    right: 17px
    cursor: pointer
    &:hover
      color: $main-green
</style>
