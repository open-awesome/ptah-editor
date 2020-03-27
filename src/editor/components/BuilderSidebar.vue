<template>
  <div class="b-builder-sidebar" :class="{'b-builder-sidebar_expanded': isExpanded}">
    <!-- Show Sections panel -->
    <PanelSectionsTree
      v-show="isExpanded && isSectionsTreeExpanded"
      :builder="builder"
      :increment="increment"
    />

    <!-- Shows Control panel -->
    <div
      v-show="controlPanel.expanded"
      class="b-builder-sidebar-settings"
    >
      <ControlPanel
        :builder="builder"
      />
    </div>

    <!-- Showed Add Section panel -->
    <transition name="slide-fade">
      <div
        v-show="isExpanded && isAddSectionExpanded"
        class="b-builder-sidebar-add-section"
      >
        <BuilderAddSectionBar
          :builder="builder"
          :title="$t('nav.addSection')"
          @add="onAddSection"
          @requestClose="closeAddSectionBar">
        </BuilderAddSectionBar>
      </div>
    </transition>

    <!-- Show Progress panel -->
    <div class="b-builder-sidebar__content" v-if="isExpanded && isProgressPanelExpanded">
      <PanelProgress />
    </div>

  </div>
</template>

<script>
import MenuItem from './MenuItem'
import MenuSubitem from './MenuSubitem'
import BuilderSettingsBar from './BuilderSettingsBar'
import BuilderSettingsSlots from './BuilderSettingsSlots'
import BuilderAddSectionBar from './BuilderAddSectionBar'
import { mapActions, mapState } from 'vuex'
import ControlPanel from './panels/TheControlPanel'
import MenuTree from './MenuTree'
import PanelSectionsTree from './panels/ThePanelSectionsTree.vue'
import PanelProgress from './panels/ThePanelProgress.vue'

export default {
  name: 'BuilderSidebar',

  components: {
    MenuTree,
    ControlPanel,
    MenuItem,
    MenuSubitem,
    BuilderSettingsBar,
    BuilderSettingsSlots,
    BuilderAddSectionBar,
    PanelSectionsTree,
    PanelProgress
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

  data () {
    return {
      increment: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'isAddSectionExpanded',
      'isSectionsTreeExpanded',
      'isProgressPanelExpanded',
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
      'toggleSectionsTreeMenu',
      'toggleProgressPanelExpanded',
      'setControlPanel',
      'setElement'
    ]),

    ...mapActions('Landing', [
      'saveState'
    ]),

    showAddSectionBar () {
      this.toggleAddSectionMenu()
    },

    showSectionsTreeBar () {
      this.toggleSectionsTreeMenu()
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
      this.toggleSectionsTreeMenu(true)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

$top-panel-height: 7.2rem

.b-builder-sidebar
  position: relative
  opacity: 0

  display: flex
  flex-direction: column

  height: auto
  width: 0

  background: $white
  color: $black
  transition: width, opacity 0.3s cubic-bezier(.2,.85,.4,1.275)
  &_expanded
    opacity: 1
    width: 30.5rem

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
      height: 100%
      padding: 0

  &-settings
    position: absolute
    left: 0
    top: 0
    bottom: 0

    display: flex
    flex-direction: column
    flex-grow: 1

    transition: all 0.1s ease
    &.slots-settings
      flex-direction: row
      .slots-settings__list
        margin-right: .8rem

  &-add-section
    width: 100%
    position: absolute
    left: 305px
    top: 0
    bottom: 0
    z-index: 20

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
