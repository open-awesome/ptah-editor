<template>
  <div class="b-main-left-menu"
    id="sectionsContents"
    :class="[
      { '_expanded': isExpanded },
      { '_selected-item': isSectionsTreeExpanded || activePanel !== '' }
    ]"
  >
    <div class="b-main-left-menu-list">
      <div
        class="b-main-left-menu-list__item"
        v-for="item in mainLeftMenu.list"
        :key="item.name"
        @click="openPanels(item.panel)"
        :class="[
          { '_open' : isSectionsTreeExpanded && item.name === 'Sections' },
          { '_open' : controlPanel.expanded && item.name === 'Sections' &&  modalContentID !== item.panel && !isSectionsTreeExpanded},
          { '_open' : isAddSectionExpanded && item.name === 'Sections' &&  modalContentID !== item.panel && isSectionsTreeExpanded},
          { '_open' : modalContentID === item.panel }
        ]"
      >
        <span
          class="b-main-left-menu-list__item-icon"
        >
          <IconBase
            :name="item.icon"
            color="#A2A5A5"
          />
        </span>
        <span
          class="b-main-left-menu-list__item-text"
        >
          {{ item.name }}
        </span>
      </div>
      <div class="b-main-left-menu-list__item" />
    </div>
    <div class="b-main-left-menu-list__progress"
     @click="openPanels('progress')"
     :class="[
       { '_open' : isProgressPanelExpanded },
     ]"
    >
      <span class="b-main-left-menu-list__progress-icon">
        <IconBase name="progress" />
      </span>
      <span class="b-main-left-menu-list__progress-text" >
        Progress
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BuilderMainLeftMenu',
  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      activePanel: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'mainLeftMenu',
      'isExpanded',
      'controlPanel',
      'isSectionsTreeExpanded',
      'isProgressPanelExpanded',
      'isAddSectionExpanded'
    ]),

    modalContentID () {
      return this.$route.path.split('/')[4] || ''
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'toggleSectionsTreeMenu',
      'toggleAddSectionMenu',
      'toggleProgressPanelExpanded',
      'setControlPanel'
    ]),

    closeSiteSettings () {
      if (this.$route.fullPath === `/editor/${this.$route.params.slug}`) {
        return
      }

      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    openPanels (panel) {
      this.activePanel = panel
      this.toggleSidebar(true)
      this.toggleAddSectionMenu(false)
      this.setControlPanel(false)

      if (panel === 'progress') {
        this.closeSiteSettings()
        this.toggleSectionsTreeMenu(false)

        if (this.isProgressPanelExpanded === true) {
          this.toggleSidebar(false)
          this.toggleProgressPanelExpanded(false)
        } else {
          this.toggleProgressPanelExpanded(true)
        }
        return
      }

      if (panel === 'sectionsTree') {
        this.closeSiteSettings()
        this.toggleProgressPanelExpanded(false)

        if (this.isSectionsTreeExpanded === true) {
          this.toggleSidebar(false)
          this.toggleSectionsTreeMenu(false)
        } else {
          this.toggleSectionsTreeMenu(true)
        }
        return
      }

      if (this.modalContentID === panel) {
        this.closeSiteSettings()
        this.toggleSidebar(false)
        this.activePanel = ''
      } else {
        this.toggleSectionsTreeMenu(false)
        this.toggleProgressPanelExpanded(false)
        this.$router.push(`/editor/${this.$route.params.slug}/settings/${panel}`)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-main-left-menu
  $this: &
  padding-top: 6rem
  width: 100%
  height: 100%

  display: flex
  flex-direction: column
  justify-content: space-between

  background-color: #f3f6f6
  transition: width 0.3s ease-in-out
  &._selected-item
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.15)
  &-list
    height: 100%
    &__item,
    &__progress
      width: 100%
      height: 7.5rem

      display: flex
      flex-direction: column
      justify-content: center
      align-items: center

      cursor: pointer
      transition: background 0.1s ease-in-out
      border-left: transparent 0 solid
      user-select: none
      &:hover
        background: #def2f2
      &-icon
        display: flex
        justify-content: center
        align-items: center

        width: 3.2rem
        height: 3.2rem
        transition: 0.2s ease-in-out
        svg
          width: 2.4rem
          height: 2.4rem
          transition: 0.2s ease-in-out
      &-text
        font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif
        font-size: .9rem
        font-weight: bold
        letter-spacing: 0.065em
        text-align: center
        text-transform: uppercase
        color: #A2A5A5

        padding-top: .2rem
        width: 100%
        opacity: 0

        transition: opacity 0.3s ease-in-out
      #{$this}:hover &-text,
      #{$this}._expanded &-text
         opacity: 1
      &._open
        background-color: #fff
        border-left: $main-green 5px solid
        & .b-main-left-menu-list__item-icon,
        & .b-main-left-menu-list__progress-icon
          width: 3.6rem
          height: 3.6rem

          align-items: flex-end
          &
            svg
              width: 2.8rem
              height: 2.8rem
              fill: #575A5F
        & .b-main-left-menu-list__progress-icon
          margin-top: 2.5rem
        & .b-main-left-menu-list__item-text,
        & .b-main-left-menu-list__progress-text
          opacity: 0

.b-main-left-menu-list__progress
  padding-bottom: 2.2rem
.b-main-left-menu-list__progress-text
  padding-top: .2rem

.b-main-left-menu-list__progress._open,
.b-main-left-menu-list__item._open
  position: relative
  &:before
    content: ''
    position: absolute
    top: -1.5rem
    right: 0
    left: -.5rem
    z-index: 1
    height: 1.5rem
    background-color: #f3f6f6
    border-radius: 0 0 15px 0
    box-shadow: inset 0 -2px -2px rgba(0, 0, 0, 0.15)
  &:after
    content: ''
    position: absolute
    top: -1.5rem
    right: 0
    left: -.5rem
    z-index: 0
    height: 1.5rem
    background-color: #fff

  & + .b-main-left-menu-list__item
    position: relative
    &:before
      content: ''
      position: absolute
      top: 0
      right: 0
      left: -.5rem
      z-index: 1
      height: 1.5rem
      background-color: #f3f6f6
      border-radius: 0 1.5rem 0 0
      box-shadow: inset 0 .2rem .2rem rgba(0, 0, 0, 0.15)
    &:after
      content: ''
      position: absolute
      top: 0
      right: 0
      left: -.5rem
      z-index: 0
      height: 1.5rem
      background-color: #fff
    &:hover
      &:before
        background: #def2f2
      &:after
        background: #fff

.b-main-left-menu-list__item:hover ~ .b-main-left-menu-list__item._open
  &:before
    background: #def2f2
  &:after
    background: #fff
</style>
