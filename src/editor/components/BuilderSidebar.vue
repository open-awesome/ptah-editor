<template>
  <div class="b-builder-sidebar" :class="{'b-builder-sidebar_expanded': isExpanded}">
    <div class="b-builder-sidebar__content" id="sections_contents">
      <!-- Sections -->
      <div class="b-builder-sidebar__header">
        <span>
          {{ $t('menu.sections') }}
        </span>

        <span class="b-builder-sidebar__icon-add"
          slot="icon"
          tooltip="Add section"
          tooltip-position="bottom"
          @click.stop="showAddSectionBar">
           <IconBase
             name="plus"
             strokeColor="transparent"
           />
        </span>

        <span class="b-builder-sidebar__icon-close" @click="toggleSidebarSection">
          <icon-base
            name="close"
            width="14"
            height="14"
          />
        </span>
      </div>
      <div class="b-builder-sidebar__content-outer">
      <menu-tree v-if="!controlPanel.expanded && isExpanded" :sections="this.builder.sections" :builder="builder" :inc="increment"></menu-tree>

      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="controlPanel.expanded" class="b-builder-sidebar-settings">
        <the-control-panel
          :title="settingObjectOptions.sectionName"
          :builder="builder" />
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="b-builder-sidebar-add-section" v-if="isExpanded && isAddSectionExpanded">
        <BuilderAddSectionBar
          :builder="builder"
          title="Add Section"
          @add="onAddSection"
          @requestClose="closeAddSectionBar">
        </BuilderAddSectionBar>
      </div>
    </transition>

  </div>
</template>

<script>
import MenuItem from './MenuItem'
import MenuSubitem from './MenuSubitem'
import BuilderSettingsBar from './BuilderSettingsBar'
import BuilderSettingsSlots from './BuilderSettingsSlots'
import BuilderAddSectionBar from './BuilderAddSectionBar'
import { mapActions, mapState } from 'vuex'
import TheControlPanel from './panels/TheControlPanel'
import MenuTree from './MenuTree'

export default {
  name: 'BuilderSidebar',

  components: {
    MenuTree,
    TheControlPanel,
    MenuItem,
    MenuSubitem,
    BuilderSettingsBar,
    BuilderSettingsSlots,
    BuilderAddSectionBar
  },

  props: {
    builder: {
      required: true
    },
    isExpanded: {
      required: true,
      type: Boolean
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'siteSettingsMenu',
      'isAddSectionExpanded',
      'settingObjectType',
      'sectionsGroups',
      'sandbox',
      'controlPanel'
    ]),

    sectionId () {
      return this.settingObjectSection.id
    },

    headerSection () {
      return this.builder.sections.find(section => section.isHeader)
    },

    builderSections () {
      return this.builder.sections.filter(section => !section.isHeader)
    },

    isSlotsSettings () {
      return this.settingObjectType !== 'section'
    }
  },

  data () {
    return {
      isSettingsOpenedisSettingsOpened: false,
      increment: 0
    }
  },

  updated () {
    // hack for update dropdown component
    window.dispatchEvent(new Event('resize'))
  },

  watch: {
    isAddSectionExpanded (value) {
      if (value) {
        // TODO: toggle others
      }
    },

    controlPanel () {
      setTimeout(() => {
        this.increment = this.increment + 1
      }, 100)
    }
  },

  methods: {

    ...mapActions('Sidebar', [
      'setSettingSection',
      'clearSettingObject',
      'clearSettingObjectLight',
      'toggleSidebar',
      'toggleAddSectionMenu',
      'setControlPanel',
      'setElement'
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

    toggleSidebarSection () {
      this.toggleSidebar()
    },

    closeAddSectionBar () {
      this.toggleAddSectionMenu(false)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

$top-panel-height: 7.2rem

.b-builder-sidebar
  width: $size-step*9
  background: $white
  position: fixed
  top: 0
  left: 0
  opacity: 0
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25)
  color: $black
  transition: left 0.3s ease-in-out
  height: 100vh
  display: flex
  flex-direction: column

  &_expanded
    opacity: 1

  &__header
    position: relative

    display: flex
    align-items: center
    justify-content: flex-start

    width: 100%
    padding: 1.7rem 3.1rem
    font-size: 2rem
    line-height: 1.2
    letter-spacing: -0.02em
  &__content
    height: 100%

    display: flex
    flex-direction: column

    min-height: 0
    overflow: auto
    &-inner
      padding: 0
    /deep/
      .vb.vb-invisible .vb-content
        padding-right: 0 !important
        overflow: hidden !important
        width: 100% !important
      .vb.vb-visible .vb-content
        padding-right: 0 !important
        width: calc(100% + 17px) !important
    &-outer
      height: 90vh
      padding: 0 0 0 0

  &-settings
    position: absolute
    right: -24.8rem
    top: 0.8rem
    bottom: 0.8rem
    display: flex
    flex-direction: column
    flex-grow: 1
    box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)
    &.slots-settings
      flex-direction: row
      .slots-settings__list
        margin-right: .8rem

  &__icon-add
    width: $size-step/2
    height: $size-step/2
    color: $grey

    display: flex
    align-items: center
    justify-content: center

    border-radius: 100%
    cursor: pointer
    margin: 1px 0 0 11px
    &:hover
      color: $dark-blue-krayola

  &__icon-close
    color: $grey
    position: absolute
    top: 18px
    right: 17px
    cursor: pointer
    &:hover
      color: $dark-blue-krayola

  &-settings,
  &-add-section
    width: $size-step*9
    position: absolute
    left: 0
    top: 0
    bottom: 0
    display: flex

// Animations down here
.slide-fade
  &-enter-active
    transition: all .3s ease

  &-leave-active
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    transform: translateX(-0.8rem)
    opacity: 0

</style>
