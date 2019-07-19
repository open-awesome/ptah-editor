<template>
  <!-- @click.stop was here. this breaks down the color picker -->
  <div class="b-control-panel">
    <span class="b-control-panel__close" @click="close()">
      <icon-base width="14" height="14" name="close"/>
    </span>
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
import ThePanelForm from './ThePanelForm'
import ThePanelSectionProductsColumnsSettings from './ThePanelSectionProductsColumnsSettings'
import ThePanelSectionProductsColumnsStyle from './ThePanelSectionProductsColumnsStyle'
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
    ...mapActions('Sidebar', ['setControlPanel']),

    close () {
      this.setControlPanel(false)
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
    ThePanelSectionProductsColumnsSettings,
    ThePanelSectionProductsColumnsStyle,
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
  width: $size-step*9
  height: 100%
  padding: 1.7rem 1rem 1.7rem 1.6rem

  display: flex
  flex-direction: column

  background: $white
  box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)

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
    color: $grey
    position: absolute
    top: 24px
    right: 17px
    cursor: pointer
    &:hover
      color: $dark-blue-krayola
</style>
