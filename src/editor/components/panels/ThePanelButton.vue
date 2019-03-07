<template>
  <div class="b-panel">
    <!-- Text -->
    <div class="b-panel__control">
      <control-text/>
    </div>

    <!-- Typography -->
    <div class="b-panel__control">
      <control-typegraphy/>
    </div>

    <!-- background -->
    <div class="b-panel__control">
      <control-background-color/>
    </div>
    <div class="b-panel__control">
      <control-background-image/>
    </div>

    <!-- Border radius -->
    <div class="b-panel__control">
      <control-border-radius/>
    </div>

    <!-- Hover animation -->
    <div class="b-panel__control">
      <control-hover-animation/>
    </div>
  </div>
</template>

<script>
import ControlText from './../controls/TheControlText'
import ControlTypegraphy from './../controls/TheControlTypegraphy'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlBackgroundImage from './../controls/TheControlBackgroundImage'
import ControlBorderRadius from './../controls/TheControlBorderRadius'
import ControlHoverAnimation from './../controls/TheControlHoverAnimation'

export default {
  name: 'ThePanelButton',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlText,
    ControlTypegraphy,
    ControlBackgroundColor,
    ControlBackgroundImage,
    ControlBorderRadius,
    ControlHoverAnimation
  }
}
</script>

<style lang="sass" scoped>
.b-panel
  padding-bottom: 4.5rem
  display: flex
  flex-direction: column
  height: auto
  width: 100%
  align-items: stretch

  &__control
    margin-bottom: 1.6rem
</style>
