<template>
  <div class="menu-tree-item" @click="$emit('click', $event)" @click.ctrl="onClickCtrl">
    <div class="menu-tree-item__header-sign">
      <IconBase name="lock" />
    </div>
    <div class="menu-tree-item__drag">
      <IconBase name="dragNew"/>
    </div>
    <div class="menu-tree-item__name"
      :tooltip="section.name"
      tooltip-position="bottom"
    >
      <span>
        {{ section.name }}
      </span>
    </div>
    <div class="menu-tree-item__controls">
      <span
        class="menu-tree-item__control"
        tooltip="Section settings"
        tooltip-position="bottom"
        @click.stop="showSettingsBar(section)">
        <icon-base name="cog"></icon-base>
      </span>
      <span
        class="menu-tree-item__control"
        tooltip="Section background"
        tooltip-position="bottom"
        @click.stop="showBackgroundPanel(section)">
        <icon-base name="background"></icon-base>
      </span>
      <!--span
        class="menu-tree-item__control"
        tooltip="Delete"
        tooltip-position="bottom"
        @click.stop="deleteSection(section)">
        <icon-base name="remove"></icon-base>
      </span-->
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash-es'
import { mapActions, mapState } from 'vuex'
import { resetIndents } from '@editor/util'

export default {
  name: 'MenuTreeItem',
  props: {
    section: {
      required: true
    },
    isGroupItem: {
      required: false
    },
    builder: {
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sectionsGroups'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'setSettingSection',
      'clearSettingObject',
      'setControlPanel',
      'setElement'
    ]),

    ...mapActions('Landing', [
      'saveState'
    ]),

    onClickCtrl () {
      if (!this.isGroupItem) {
        this.$emit('select', this.section)
      }
    },

    showSettingsBar (section) {
      this.setElement(document.getElementById(`section_${section.id}`))
      this.setSettingSection(section)
      this.setControlPanel('Section')
    },

    showBackgroundPanel (section) {
      this.setControlPanel('SectionBackground')
      this.setSettingSection(section)
    },

    deleteSection (section) {
      // update group
      if (this.isSlaveSection(section.id)) {
        let master = _.find(this.sectionsGroups, o => o.children.indexOf(section.id) > -1).main
        let absorb = master.data.mainStyle.absorb
        master.set('$sectionData.mainStyle', _.merge({}, master.data.mainStyle, { absorb: absorb - 1 }))
      }

      this.builder.remove(section)
      this.clearSettingObject()

      resetIndents()

      this.$emit('delete', section)

      this.saveState(this.builder.export('JSON'))
    },

    isMasterSection () {
      return !!_.find(this.sectionsGroups, o => o.main.id === this.sectionId)
    },

    isSlaveSection (sectionId) {
      return !!_.find(this.sectionsGroups, o => o.children.indexOf(sectionId) > -1)
    }
  }
}
</script>

<style lang="sass" scoped>
  .menu-tree-item
    color: $gray300
    font-size: 1.6rem
    line-height: 1.9rem
    width: 100%
    display: flex
    justify-content: flex-start
    padding: 1.3rem 1.3rem 1.3rem 1.6rem
    cursor: pointer

    &__drag
      visibility: hidden
      margin-right: 1.2rem
      width: .3rem
      svg
        width: .3rem
        height: 1.4rem
        margin-bottom: -1px !important

    &__header-sign
      display: none
      width: 3rem

    &__name
      > span
        display: block
        max-width: 15rem
        overflow: hidden
        text-overflow: ellipsis

    &:hover
      background: rgba(0, 173, 182, 0.1)
      .menu-tree-item__name
        color: #575A5F
      .menu-tree-item__drag
        visibility: visible
      .menu-tree-item__controls
        visibility: visible

    &.selected
      background: rgba(0, 173, 182, 0.1)
      .menu-tree-item__name
        color: #575A5F
      .menu-tree-item__controls
        visibility: visible

    &.isHeader
      .menu-tree-item__drag
        display: none
      .menu-tree-item__header-sign
        display: inline-block

    &__controls
      visibility: hidden
      display: flex
      justify-content: flex-end
      flex-grow: 1
      opacity: .8

    &__control
      margin-left: 1rem
      svg
        width: 1.5rem
        height: 1.5rem

      &:hover
        color: $main-green
</style>
