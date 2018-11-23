<template>
  <div class="b-builder-sidebar" :class="{'b-builder-sidebar_expanded': isExpanded}">
    <button
      class="b-builder-sidebar__back-button"
      title="Minimize panel"
      @click="toggleSidebar">

      <IconBase
        slot="icon"
        name="turnAside"
        width="10"
        height="8"
        color="none"
        strokeColor="#888888">
      </IconBase>
    </button>

    <div class="b-builder-sidebar__content">
      <!-- Site settings -->
      <menu-item>
        <IconBase
          slot="icon"
          name="hollowCircle"
          color="transparent"
          strokeColor="currentColor">
        </IconBase>
        Site Settings
      </menu-item>

      <!-- Sections -->
      <menu-item
        :isSelected="isSectionsExpanded"
        :isExpandable="true"
        @click="isSectionsExpanded = !isSectionsExpanded">

        <IconBase
          slot="icon"
          name="hollowCircle"
          color="transparent"
          strokeColor="currentColor">
        </IconBase>

        <span>Sections</span>
      </menu-item>

      <!-- Sections CONTENTS -->
      <BaseDropdown
        class="b-builder-sidebar__dropdown"
        slot="dropdown"
        :isOpened="isSectionsExpanded">

        <Draggable @end="updateSectionsOrder">
          <MenuSubitem
            v-for="(section, index) in builder.sections"
            :key="section.id"
            :hasSettings="true"
            :isSettingsSelected="isActiveSection(section.id)"
            @settingsClick="toggleSettingsBar(section)">
            {{`${index + 1}.`}} {{section.name}}
          </MenuSubitem>
        </Draggable>
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
import Draggable from 'vuedraggable'
import MenuItem from './MenuItem.vue'
import MenuSubitem from './MenuSubitem.vue'
import BuilderSettingsBar from './BuilderSettingsBar.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BuilderSidebar',

  components: {
    MenuItem,
    MenuSubitem,
    BuilderSettingsBar,
    Draggable
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
      'isSettingsExpanded',
      'settingObjectOptions'
    ])
  },

  data () {
    return {
      isSectionsExpanded: false,
      isSettingsOpenedisSettingsOpened: false
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'setSettingSection',
      'clearSettingObject'
    ]),

    toggleSidebar () {
      this.$emit('toggleSidebar')
    },

    toggleSettingsBar (section) {
      this.clearSettingObject()

      if (!this.isActiveSection(section.id)) {
        this.setSettingSection(section)
      }
    },

    closeSettingsBar () {
      this.clearSettingObject()
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

.b-builder-sidebar-settings
  position: absolute
  right: -248px
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
