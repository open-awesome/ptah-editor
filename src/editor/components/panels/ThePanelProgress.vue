<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      <span>
        Your progress
      </span>
      <span
        class="b-panel__icon-close"
       @click="closeSidebarSection"
      >
        <IconBase
          name="close"
          width="14"
          height="14"
        />
      </span>
    </h6>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ThePanelProgress',

  methods: {
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'toggleAddSectionMenu',
      'toggleProgressPanelExpanded'
    ]),

    closeSidebarSection () {
      this.toggleSidebar(false)
      this.toggleAddSectionMenu(false)
      this.toggleProgressPanelExpanded(false)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  display: block
  &__title
    position: relative
    display: flex
    align-items:  flex-start
    justify-content: flex-start
    width: 100%
    padding: 1.7rem 3.1rem
    font-size: 2rem
    line-height: 1.2
    letter-spacing: -0.02em
  &__icon-close
    color: $grey
    position: absolute
    top: 18px
    right: 17px
    cursor: pointer
    &:hover
      color: $main-green
</style>
