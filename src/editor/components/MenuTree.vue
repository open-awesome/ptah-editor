<template>
  <div class="b-menu-tree node-sortable tree-root" v-click-outside="onClickOutside">

    <base-button
      v-show="selectedSections.length > 1"
      @click="groupSections"
      size="small"
      color="blue"
      class="b-menu-tree__group-together">Group selected</base-button>

    <template v-for="(item, index) in menuTree">
      <menu-tree-item
        v-if="!isGroup(item)"
        :key="index"
        :section="item"
        :data-id="item.id"
        :class="{ 'selected' : itemSelected(item) }"
        v-on:select="onSelect"
        class="tree-node" />
      <div class="b-menu-tree__group node-sortable tree-branch" :key="index" v-if="isGroup(item)">
        <div class="b-menu-tree__group-name">
          <span>Group</span>
          <div class="b-menu-tree__group-controls">
            <span
              @click="showBackgroundPanel(item[0])"
              tooltip="Group background"
              tooltip-position="bottom">
              <icon-base name="background"></icon-base>
            </span>
              <span
                @click="ungroup(item[0])"
                tooltip="Ungroup"
                tooltip-position="bottom">
              <icon-base name="remove"></icon-base>
            </span>
          </div>
        </div>
        <menu-tree-item
          v-for="(section, i) in item"
          :key="i"
          :section="section"
          :data-id="section.id"
          :class="{ 'selected' : itemSelected(section) }"
          is-group-item="true"
          v-on:select="onSelect"
          class="tree-node group-node" />
      </div>
    </template>
  </div>
</template>

<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import MenuTreeItem from './MenuTreeItem'
import Sortable from 'sortablejs'
import { resetIndents } from '@editor/util'

export default {
  name: 'menuTree',
  components: { MenuTreeItem },
  props: {
    sections: {
      required: true
    },
    builder: {
      required: true
    }
  },

  data () {
    return {
      menuTree: [],
      lastIndexes: [],
      selectedSections: [],
      absorbed: [],
      init: false
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sectionsGroups'
    ])
  },

  watch: {
    sectionsGroups () {
      this.buildTree()
    }
  },

  updated () {
    let nodes = Array.from(document.querySelectorAll('.node-sortable'))
    let nested = []
    for (let i = 0; i < nodes.length; i++) {
      nested[i] = new Sortable(nodes[i], {
        group: 'nested',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onEnd: (event) => {
          this.treeUpdate(event)
        }
      })
    }

    this.lastIndexes = this.getIndexes()
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

    buildTree (renew) {
      if (!this.init && !renew) {
        this.menuTree = []

        this.builderSections().forEach((section) => {
          console.log(section.isMain)
          if (this.isSimpleSection(section)) {
            this.menuTree.push(section)
          } else {
            if (section.isMain) {
              this.menuTree.push([section])
            } else {
              try {
                _.last(this.menuTree).push(section)
              } catch (e) {}
            }
          }
        })

        this.init = true
      }
    },

    treeUpdate (e) {
      let newIndexes = this.getIndexes()
      let needReloadTree = false

      if (e.item.classList.contains('tree-branch')) { // --- move group
        // section ids in the group
        let ids = Array.from(e.item.querySelectorAll('.tree-node')).map((node) => node.dataset.id)

        if (this.lastIndexes.indexOf(ids[0]) > newIndexes.indexOf(ids[0])) {
          ids.forEach((id) => {
            this.builder.sort(this.lastIndexes.indexOf(id), newIndexes.indexOf(id))
          })
        } else {
          _.forEachRight(ids, (id) => {
            this.builder.sort(this.lastIndexes.indexOf(id), newIndexes.indexOf(id))
          })
        }
      } else { // --- move 1 section
        console.log(e)
        let nodeId = e.item.dataset.id
        let currentSection = this.getSectionById(nodeId)

        if (e.to !== e.from) {
          needReloadTree = true
          // move to group
          if (e.to.classList.contains('tree-branch')) {
            let mainSection = this.getSectionById(e.to.querySelector('.tree-node').dataset.id)
            if (e.newIndex !== 0) {
              mainSection.data.mainStyle.absorb = mainSection.data.mainStyle.absorb + 1
            } else {
              // make new main
              let absorb = mainSection.data.mainStyle.absorb + 1
              mainSection.isMain = false
              mainSection.data.mainStyle.absorb = 0

              currentSection.isMain = false
              currentSection.data.mainStyle.absorb = absorb
            }
          } else { // move from group
            if (e.oldIndex !== 0) {
              let mainSection = this.getSectionById(e.from.querySelector('.tree-node').dataset.id)
              mainSection.data.mainStyle.absorb = mainSection.data.mainStyle.absorb - 1
              if (mainSection.data.mainStyle.absorb === 0) {
                mainSection.isMain = false
              }
            } else {
              // make new main
              let absorb = currentSection.data.mainStyle.absorb - 1
              let newMainSection = this.getSectionById(Array.from(e.from.querySelectorAll('.tree-node'))[1].dataset.id)

              currentSection.isMain = false
              currentSection.data.mainStyle.absorb = 0

              newMainSection.isMain = true
              newMainSection.data.mainStyle.absorb = absorb
            }
          }
        }

        // TODO: main section lost lead

        this.builder.sort(this.lastIndexes.indexOf(nodeId), newIndexes.indexOf(nodeId))
      }

      this.lastIndexes = this.getIndexes() // renew indexes
      if (needReloadTree) {
        this.buildTree(true)
        needReloadTree = false
      }

      //  TODO: save state
    },

    getIndexes () {
      let n = Array.from(document.querySelectorAll('.tree-node'))
      return n.map((node) => node.dataset.id)
    },

    isSimpleSection (section) {
      return !section.isMain && _.find(this.sectionsGroups, (o) => o.children.indexOf(section.id) > -1) === undefined
    },

    isGroup (item) {
      return _.isArray(item)
    },

    async sort (oldIndex, newIndex) {
      await this.$nextTick()
      this.builder.sort(oldIndex, newIndex)
    },

    getSectionById (id) {
      return _.filter(this.builder.sections, (section) => section.id === parseInt(id))[0]
    },

    onSelect (section) {
      let i = this.selectedSections.indexOf(section.id)
      if (i > -1) {
        this.selectedSections.splice(i, 1)
      } else {
        this.selectedSections.push(section.id)
      }
    },

    onClickOutside () {
      this.selectedSections = []
    },

    itemSelected (section) {
      return this.selectedSections.indexOf(section.id) > -1
    },

    showBackgroundPanel (section) {
      this.setControlPanel('SectionBackground')
      this.setSettingSection(section)
    },

    ungroup (section) {
      section.isMain = false
      section.data.mainStyle.absorb = 0

      this.buildTree(true)
    },

    groupSections () {
      let newMain = this.getSectionById(_.head(this.selectedSections))
      this.absorbed = _.tail(this.selectedSections)

      this.applyGroup(newMain)

      this.buildTree(true)
    },

    applyGroup (newMain) {
      // sort sections in builder
      this.moveSections()
      // apply changes
      newMain.isMain = true
      newMain.data.mainStyle.absorb = this.absorbed.length

      resetIndents()

      this.selectedSections = []
      this.absorbed = []
    },

    moveSections () {
      let holes = this.findHoles()

      holes.forEach((hole) => {
        this.builder.sort(hole.index, hole.index + 1)
      })

      if (this.findHoles().length) {
        this.moveSections()
      }
    },

    findHoles () {
      let holes = []
      let stop = 0

      for (let i = this.sIndex + 1; i < this.builder.sections.length; i++) {
        if (this.absorbed.indexOf(this.builder.sections[i].id) === -1 && stop < this.absorbed.length) {
          holes.push({ index: i, id: this.builder.sections[i].id })
        } else {
          stop++
        }
      }

      return holes
    },

    builderSections () {
      return this.sections.filter(section => !section.isHeader)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-menu-tree
  padding: 0 0 3rem
  margin: 0

  &__group
    background: rgba($grey-middle, .2)

    .group-node
      padding-left: 3.2rem

  &__group-name
    color: $gray300
    font-size: 1.6rem
    font-weight: bold
    line-height: 1.9rem
    letter-spacing: -0.02em

    display: flex
    justify-content: space-between
    padding: 1.6rem 1.6rem 1.6rem 4.6rem

  &__group-controls
    opacity: .7
    svg
      width: 1.5rem
      height: 1.5rem
      margin-left: 1.5rem
      cursor: pointer

  &__group-together
    width: 12rem !important
    margin-left: 2.8rem
</style>
