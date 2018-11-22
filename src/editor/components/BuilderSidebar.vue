<template>
  <div class="builder-sidebar" :class="{'_expanded': isExpanded}">
    <button
      class="builder-sidebar__back-button"
      title="Minimize panel"
      @click="toggleSidebar">

      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 1L1 4L4 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 1L6 4L9 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="builder-sidebar__content">
      <ul slot="dropdown">
        <li v-for="section in builder.sections" :key="section.id">{{ section.name }}</li>
      </ul>
      <menu-item
        v-for="(item, index) in contents"
        :key="index"
        :isSelected="item.isSelected"
        :isExpandable="Boolean(item.items)"
        @click="item.isSelected = !item.isSelected">

        <IconBase
          slot="icon"
          name="platformDesktop">
        </IconBase>

        <span>{{item.title}}</span>

        <BaseDropdown
          slot="dropdown"
          :isOpened="item.isSelected">

          <MenuSubitem
            v-for="section in builder.sections"
            :isSelected="section.isSelected"
            :hasSettings="true"
            :isSettingsSelected="selectedSettingsName === section.name"
            :key="section.id"
            @click="section.isSelected = !section.isSelected"
            @settingsClick="toggleSettingsBar(section)">
            {{section.name}}
          </MenuSubitem>
        </BaseDropdown>
      </menu-item>
    </div>
    <transition name="slide-fade">
      <div class="builder-sidebar-settings" v-show="isExpanded && isSettingsExpanded">
        <BuilderSettingsBar :title="selectedSettingsName" @requestClose="closeSettingsBar">
        </BuilderSettingsBar>
      </div>
    </transition>

  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import MenuSubitem from './MenuSubitem.vue'
import BuilderSettingsBar from './BuilderSettingsBar.vue'
import { mapActions, mapState } from 'vuex'
import * as _ from 'lodash-es'

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
    ...mapState('Sidebar', [
      'isSettingsExpanded'
    ])
  },

  data () {
    return {
      selectedSection: {},
      selectedSettingsName: '',
      selectedSettingsTitle: '',
      contents: [
        {
          title: 'Site Settings',
          isSelected: false
        },
        {
          title: 'Sections',
          isSelected: false
        }
      ]
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'setSettingObject',
      'clearSettingObject'
    ]),

    toggleSidebar () {
      this.$emit('toggleSidebar')
    },

    toggleSettingsBar (section) {
      let options = _.find(section.stylers, { name: '$sectionData.mainStyle' }).options
      console.log(section, options)
      if (this.selectedSettingsName !== section.name) {
        this.setSettingObject({ type: 'section', options })
        this.selectedSettingsName = section.name
      } else {
        this.clearSettingObject()
        this.selectedSettingsName = ''
      }
    },

    closeSettingsBar () {
      this.clearSettingObject()
      this.selectedSettingsName = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.builder-sidebar
  width: 240px
  border-right: 1px solid rgba(#000000, 0.08)
  background: #F1F1F1
  position: fixed
  top: 64px
  left: -220px
  bottom: 0
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05)
  color: #888888
  transition: left 0.3s ease-in-out

  &._expanded
    left: 0
    transform: translateX(0px)

  &__back-button
    height: 24px
    padding: 0 8px
    width: 100%
    border: 0
    background: #F0F0F0
    border-bottom: 2px solid rgba(#888888, 0.15)
    cursor: pointer
    text-align: right

    &:hover
      background: rgba(#202020, 0.08)

  &__content
    box-shadow: inset 1px 3px 8px 0 rgba(#888888, 0.15)

.builder-sidebar-settings
  position: absolute
  right: -248px
  top: 8px
  bottom: 8px;
  display: flex;

// Animations down here
.slide-fade-enter-active
  transition: all .2s ease

.slide-fade-leave-active
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(-8px)
  opacity: 0

</style>
