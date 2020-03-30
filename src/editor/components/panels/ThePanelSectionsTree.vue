<template>
  <div class="b-panel" id="sections_contents">
    <h6 class="b-panel__title">
      <span
        class="b-panel__title-text"
        @click="openHelpPage"
      >
        Section menu
        <IconBase
          name="questionBalloon"
          color="#00ADB6"
          width="16"
          height="16"
        />
      </span>
      <span
        class="b-panel__icon-close"
       @click="closeSidebarSection"
      >
        <IconBase
          name="firstPage"
          width="13"
          height="12"
          color="#a2a5a5"
        />
      </span>
    </h6>

    <div class="b-panel__add">
      <BaseButton
        @click="showAddSectionBar"
        color="main-green"
        size="middle"
        :disabled="isAddSectionExpanded"
      >
        Add section
      </BaseButton>
    </div>

    <div class="b-panel__content">
      <!-- Show added sections -->
      <div class="b-panel__content-outer">
        <MenuTree
          :sections="builder.sections"
          :builder="builder"
          :inc="increment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuTree from './../MenuTree'
import ControlSectionLayouts from './../controls/TheControlSectionLayouts.vue'

export default {
  name: 'ThePanelSectionsTree',

  components: {
    ControlSectionLayouts,
    MenuTree
  },

  props: {
    builder: {
      type: Object,
      required: true
    },
    increment: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'controlPanel',
      'isExpanded',
      'isAddSectionExpanded'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'toggleAddSectionMenu',
      'toggleSectionsTreeMenu'
    ]),

    ...mapActions('Landing', [
      'saveState'
    ]),

    showAddSectionBar () {
      this.toggleAddSectionMenu()
    },

    async onAddSection (section) {
      this.increment = this.increment + 1

      await this.$nextTick()
      let target

      document.querySelectorAll('.menu-tree-item').forEach((node) => {
        if (parseInt(node.dataset.id) === section.id) {
          target = node
        }
      })

      target.click()

      // move header to top
      if (section.isHeader) {
        this.builder.sort(this.builder.sections.length - 1, 0)
      }
    },

    closeSidebarSection () {
      this.toggleSidebar(false)
      this.toggleSectionsTreeMenu(false)
    },

    openHelpPage () {
      window.open(process.env.VUE_APP_HELP)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  transition: all .3s cubic-bezier(.2,.85,.4,1.275)
  &__title
    position: relative
    width: 100%

    padding: 2.2rem 3.1rem
    font-size: 1.8rem
    line-height: 1.8
    letter-spacing: 0.065em
    text-transform: uppercase
    color: #575A5F
    font-weight: 600
    text-align: center

    transition: color .3s cubic-bezier(.2,.85,.4,1.275)
    &-text
      position: relative
      & svg
        position: absolute
        top: .7rem
        right: -2rem

        opacity: 0
        transition: opacity .3s cubic-bezier(.2,.85,.4,1.275)
      &:hover
        cursor: pointer
        color: $main-green
        & svg
          opacity: 1
  &__add
    width: 100%

    display: flex
    justify-content: center
    align-items: center

    margin: 2rem 0 2.6rem
  &__icon-close
    position: absolute
    top: 1.9rem
    right: 1.7rem
    cursor: pointer

    width: 3.6rem
    height: 3.6rem

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
  &__content
    width: calc(100% + 1.5rem)
    height: 100%
    min-height: 0
    padding: 0

    display: flex
    flex-direction: column
    overflow: auto
    &-inner
      padding: 0
    &-outer
      height: 100%
      padding: 0 1.6rem 0 0
</style>
