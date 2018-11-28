<template>
  <div class="b-builder-sidebar" :class="{'b-builder-sidebar_expanded': isExpanded}">
    <button
      class="b-builder-sidebar__back-button"
      title="Minimize panel"
      @click="toggleSidebarAndHideContent">

      <IconBase
        slot="icon"
        name="turnAside"
        width="10"
        height="8"
        color="none"
        strokeColor="#888888"/>
    </button>

    <div class="b-builder-sidebar__content">
      <!-- Site settings -->
      <menu-item
        :isSelected="expandedMenuItem === 'siteSettings'"
        :isExpandable="true"
        @click="toggleMenuItem('siteSettings')">
        <IconBase
          slot="icon"
          name="hollowCircle"
          color="transparent"
          strokeColor="currentColor">
        </IconBase>
        Site Settings
      </menu-item>

      <!-- Site settings CONTENTS -->
      <BaseDropdown
        :isOpened="expandedMenuItem === 'siteSettings'">
        <MenuSubitem
          v-for="siteSetting in siteSettingsMenu"
          :key="siteSetting.id"
          :isSelected="modalContentID === siteSetting.id"
          @click="toggleSiteSettings(siteSetting.id)">
          {{siteSetting.name}}
        </MenuSubitem>
      </BaseDropdown>

      <!-- Sections -->
      <menu-item
        :isSelected="expandedMenuItem === 'sections'"
        :isExpandable="true"
        @click="toggleMenuItem('sections')">

        <IconBase
          slot="icon"
          name="hollowCircle"
          color="transparent"
          strokeColor="currentColor" />

        <span>Sections</span>
      </menu-item>

      <!-- Sections CONTENTS -->
      <BaseDropdown
        :isOpened="expandedMenuItem === 'sections'">
        <div ref="sections">
          <MenuSubitem
            v-for="(section, index) in builder.sections"
            :key="section.id"
            :isSelected="isActiveSection(section.id)"
            :hasDraggableIcon="true"
            @click="toggleSettingsBar(section)">
            {{`${index + 1}.`}} {{section.name}}
          </MenuSubitem>
        </div>
      </BaseDropdown>

    </div>
    <transition name="slide-fade">
      <div class="b-builder-sidebar-settings" v-show="isExpanded && isSettingsExpanded">
        <BuilderSettingsBar
          :title="settingObjectOptions.sectionName"
          :builder="builder"
          @requestClose="closeSettingsBar"
          v-if="settingObjectOptions.sectionName">
        </BuilderSettingsBar>
      </div>
    </transition>

  </div>
</template>

<script>
import Sortable from 'sortablejs'
import MenuItem from './MenuItem.vue'
import MenuSubitem from './MenuSubitem.vue'
import BuilderSettingsBar from './BuilderSettingsBar.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BuilderSidebar',

  components: {
    MenuItem,
    MenuSubitem,
    BuilderSettingsBar
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
    ...mapState('BuilderModalContent', {
      modalContentID: 'contentID'
    }),
    ...mapState('Sidebar', [
      'isSettingsExpanded',
      'settingObjectOptions',
      'siteSettingsMenu'
    ])
  },

  data () {
    return {
      expandedMenuItem: ''
    }
  },

  updated () {
    if (this.$refs.sections && this.builder.sections.length) {
      Sortable.create(this.$refs.sections, {
        group: {
          name: 'sections'
        },
        animation: 150,
        sort: true,
        disabled: false,
        preventOnFilter: false,
        onUpdate: (event) => {
          this.builder.sort(event.oldIndex, event.newIndex)
        }
      })
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'setSettingSection',
      'clearSettingObject',
      'toggleSidebar'
    ]),
    ...mapActions('BuilderModalContent', {
      setModalContent: 'setContent'
    }),

    toggleSidebarAndHideContent () {
      this.toggleSidebar()
      this.setModalContent('')
    },

    toggleMenuItem (name) {
      if (this.expandedMenuItem === name) {
        this.expandedMenuItem = ''
      } else {
        this.expandedMenuItem = name
      }
    },

    toggleSettingsBar (section) {
      this.closeSiteSettings()
      this.clearSettingObject()

      if (!this.isActiveSection(section.id)) {
        this.setSettingSection(section)
      }
    },

    closeSettingsBar () {
      this.clearSettingObject()
    },

    toggleSiteSettings (contentID) {
      this.closeSettingsBar()

      if (this.modalContentID === contentID) {
        this.closeSiteSettings()
      } else {
        this.setModalContent(contentID)
      }
    },

    closeSiteSettings () {
      this.setModalContent('')
    },

    updateSectionsOrder (event) {
      this.builder.sort(event.oldIndex, event.newIndex)
    },

    isActiveSection (id) {
      return this.settingObjectOptions.sectionId === id
    }
  }
}
</script>

<style lang="sass" scoped>
$top-panel-height: 7.2rem

.b-builder-sidebar
  width: 24rem
  border-right: 1px solid rgba(#000000, 0.08)
  background: #F1F1F1
  position: fixed
  top: $top-panel-height
  left: -22rem
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05)
  color: #888888
  transition: left 0.3s ease-in-out
  height: calc(100vh - #{$top-panel-height})
  display: flex
  flex-direction: column

  &_expanded
    left: 0
    transform: translateX(0px)

  &__back-button
    height: 2.4rem
    padding: 0 0.8rem
    width: 100%
    border: 0
    background: #F0F0F0
    border-bottom: 2px solid rgba(#888888, 0.15)
    cursor: pointer
    text-align: right
    flex-shrink: 0

    // @todo remove maybe?
    // drops margin from BaseIcon
    svg
      margin-bottom: 0

    &:hover
      background: rgba(#202020, 0.08)

  &__content
    box-shadow: inset 1px 3px 8px 0 rgba(#888888, 0.15)
    display: flex
    flex-direction: column
    min-height: 0

  &-settings
    position: absolute
    right: -24.8rem
    top: 0.8rem
    bottom: 0.8rem;
    display: flex

// Animations down here
.slide-fade
  &-enter-active
    transition: all .2s ease

  &-leave-active
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    transform: translateX(-0.8rem)
    opacity: 0
</style>
