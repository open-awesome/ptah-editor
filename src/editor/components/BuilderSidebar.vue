<template>
  <div class="b-builder-sidebar" :class="{'b-builder-sidebar_expanded': isExpanded}">
    <div class="b-builder-sidebar-header">
      <div class="b-builder-sidebar-header__ham">
        <span @click="toggleSidebarSection">
          <icon-base
            name="close"
            color="#fff"
            width="14"
            height="14"
            />
        </span>
      </div>
      <div class="b-builder-sidebar-header__add">
        <span class="b-builder-sidebar__icon-add"
          slot="icon"
          @click.stop="showAddSectionBar">
           <IconBase
            name="plus"
            color="#fff"
            strokeColor="transparent"
           />
        </span>
      </div>
    </div>
    <div class="b-builder-sidebar__content" id="sections_contents">
      <!-- Sections -->
      <menu-item
        :isSelected="true"
        :isExpandable="true"
        >
          <span>
            {{ $t('menu.sections') }}
          </span>
      </menu-item>

      <!-- Sections CONTENTS -->
        <!-- header -->
        <div class="no-sortable" ref="header">
          <menu-subitem
              v-if="headerSection"
              v-scroll-to="`#section_${ headerSection.id }`"
              :id="`menu-item-${ headerSection.id }`"
              :is-selected="isActiveSection(headerSection.id)"
              :section-id="headerSection.id"
              @click="toggleSettingsBar(headerSection)"
              class="b-menu-subitem--header"
            >
            # -
            <span class="b-menu-subitem__title-text">
              {{ headerSection.name }}
            </span>
            <div class="b-menu-subitem__icons">
              <span class="b-menu-subitem__icon"
                @click.stop="showSettingsBar(headerSection)"
                >
                <icon-base name="edit" color="#ffffff"></icon-base>
              </span>
              <span class="b-menu-subitem__icon"
                @click.stop="toggleSectionLayouts(headerSection)"
                >
                <icon-base name="layouts" color="#fff"></icon-base>
              </span>
              <span class="b-menu-subitem__icon"
                @click.stop="showBackgroundPanel(section)"
                >
                <icon-base name="image" color="#fff"></icon-base>
              </span>
              <span class="b-menu-subitem__icon"
                @click.stop="deleteSection(headerSection)"
                >
                <icon-base name="remove" color="#ffffff"></icon-base>
              </span>
            </div>
          </menu-subitem>
        </div>

        <div class="sortable" ref="sections">

          <!-- sections -->
          <menu-subitem
              v-for="(section, index) in builderSections"
              v-scroll-to="`#section_${section.id}`"
              :key="section.id"
              :id="`menu-item-${section.id}`"
              :is-selected="isActiveSection(section.id)"
              :is-main="section.isMain"
              :has-draggable-icon="true"
              :section-id="section.id"
              @click="toggleSettingsBar(section)"
            >
            {{ `${ index + 1 } - `}}
            <span class="b-menu-subitem__title-text">
              {{ section.name }}
            </span>
            <div class="b-menu-subitem__icons">
              <span class="b-menu-subitem__icon"
                @click.stop="showSettingsBar(section)"
                >
                <icon-base name="edit" color="#ffffff"></icon-base>
              </span>
              <span class="b-menu-subitem__icon"
                @click.stop="toggleSectionLayouts(section)"
                >
                <icon-base name="layouts" color="#fff"></icon-base>
              </span>
              <span class="b-menu-subitem__icon"
                @click.stop="showBackgroundPanel(section)"
                >
                <icon-base name="image" color="#fff"></icon-base>
              </span>
              <span class="b-menu-subitem__icon"
                @click.stop="deleteSection(section)"
                >
                <icon-base name="remove" color="#ffffff"></icon-base>
              </span>
            </div>
          </menu-subitem>

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
import * as _ from 'lodash-es'
import Sortable from 'sortablejs'
import MenuItem from './MenuItem'
import MenuSubitem from './MenuSubitem'
import BuilderSettingsBar from './BuilderSettingsBar'
import BuilderSettingsSlots from './BuilderSettingsSlots'
import BuilderAddSectionBar from './BuilderAddSectionBar'
import { mapActions, mapState } from 'vuex'
import TheControlPanel from './panels/TheControlPanel'

export default {
  name: 'BuilderSidebar',

  components: {
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
    ...mapState('BuilderModalContent', {
      modalContentID: 'contentID'
    }),

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
      isSettingsOpenedisSettingsOpened: false
    }
  },

  updated () {
    if (this.$refs.sections && this.builderSections.length) {
      Sortable.create(this.$refs.sections, {
        group: { name: 'sections' },
        animation: 150,
        sort: true,
        disabled: false,
        preventOnFilter: false,
        onUpdate: (event) => {
          this.builder.sort(event.oldIndex, event.newIndex)
        }
      })
    }

    // hack for update dropdown component
    window.dispatchEvent(new Event('resize'))
  },

  watch: {
    isAddSectionExpanded (value) {
      if (value) {
        // TODO: toggle others
      }
    }
  },

  methods: {

    ...mapActions('Sidebar', [
      'setSettingSection',
      'clearSettingObject',
      'clearSettingObjectLight',
      'toggleSidebar',
      'toggleAddSectionMenu',
      'setMenuItem',
      'setControlPanel',
      'setSection'
    ]),

    ...mapActions('BuilderModalContent', {
      setModalContent: 'setContent'
    }),

    toggleSidebarAndHideContent () {
      this.toggleSidebar()
      this.setModalContent('')
    },

    toggleSettingsBar (section) {
      this.closeSiteSettings()
      this.setSettingSection(section)
    },

    showSettingsBar (section) {
      this.closeSiteSettings()
      this.setSettingSection(section)
      this.setControlPanel('Section')
    },

    toggleSectionLayouts (section) {
      this.closeSiteSettings()
      this.setSettingSection(section)
      this.setControlPanel('SectionLayout')
    },

    selectSection (section) {
      this.toggleSettingsBar(section)
    },

    closeSettingsBar () {
      this.clearSettingObjectLight()
    },

    closeSiteSettings () {
      this.setModalContent('')
    },

    closeAddSectionBar () {
      this.toggleAddSectionMenu(false)
    },

    updateSectionsOrder (event) {
      this.builder.sort(event.oldIndex, event.newIndex)
    },

    isActiveSection (id) {
      return this.settingObjectSection.id === id
    },

    showAddSectionBar () {
      this.closeSiteSettings()
      this.toggleAddSectionMenu()
    },

    async onAddSection (section) {
      await this.$nextTick()
      let target = (section.isHeader)
        ? this.$refs.header.lastElementChild
        : this.$refs.sections.lastElementChild
      target.click()
    },

    startScroll (x) {

    },

    toggleSidebarSection () {
      this.toggleSidebar()
    },

    isSlaveSection (sectionId) {
      return !!_.find(this.sectionsGroups, o => o.children.indexOf(sectionId) > -1)
    },

    deleteSection (section) {
      // update group
      if (this.isSlaveSection(section.Id)) {
        let master = _.find(this.sectionsGroups, o => o.children.indexOf(section.Id) > -1).main
        let absorb = master.data.mainStyle.absorb
        master.set('$sectionData.mainStyle', _.merge({}, master.data.mainStyle, { absorb: absorb - 1 }))
      }

      this.builder.remove(section)
      this.clearSettingObject()
    },

    showBackgroundPanel (section) {
      this.setControlPanel('SectionBackground')
      this.setSection(section)
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
  border-right: 1px solid rgba($black, 0.08)
  background: $dark-blue
  position: fixed
  top: 0
  left: 0
  opacity: 0
  box-shadow: inset 0 1px 0 rgba($white, 0.05)
  color: $white
  transition: left 0.3s ease-in-out
  height: 100vh
  display: flex
  flex-direction: column

  &_expanded
    opacity: 1

  &__content
    height: 100%
    box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)
    display: flex
    flex-direction: column
    min-height: 0
    overflow: auto

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
    width: 3.2rem
    height: 3.2rem
    color: $white
    display: flex
    align-items: center
    justify-content: center
    border-radius: 100%
    cursor: pointer

  &-settings,
  &-add-section
    width: $size-step*9
    position: absolute
    left: 0
    top: 0
    bottom: 0
    display: flex

  &-header
   height: 8rem

   display: flex
   justify-content: space-between
   align-items: center

   padding: $size-step/2 $size-step
   &__ham
     &:hover
       cursor: pointer

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
