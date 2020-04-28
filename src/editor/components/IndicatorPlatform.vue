<template>
  <div class="b-indicator-platform">
    <div class="b-indicator-platform__platform" v-if="isMobile">
      <IconBase name="platformMobile" width="25" height="25" />
    </div>
    <div class="b-indicator-platform__platform" v-if="!isMobile">
      <IconBase name="platformDesktop" width="27.8" height="25" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndicatorPlatform',

  computed: {
    ...mapState('Sidebar', [
      'isMobile'
    ])
  }
}
</script>

<style lang="sass" scoped>
.b-indicator-platform
  height: 2.5rem
  text-align: center
  margin: 0 0 2.2rem 1.4rem
</style>
