<template>
  <div class="b-menu-tree node-sortable tree-root" v-click-outside="onClickOutside">

    <base-button
      v-show="selectedSections.length > 1"
      @click="groupSections"
      size="small"
      color="blue"
      class="b-menu-tree__group-together">Group selected</base-button>

    <!-- header section -->
    <menu-tree-item
      v-if="headerSection()"
      :section="headerSection()"
      :data-id="headerSection().id"
      :class="{ 'selected' : itemSelected(headerSection())}"
      class="isHeader"
      @click="setActive(headerSection(), $event)"
      v-scroll-to="`#section_${headerSection().id}`" />

    <!-- tree menu -->
    <template v-for="(item, index) in menuTree">
      <menu-tree-item
        v-if="!isGroup(item)"
        :key="index"
        :section="item"
        :data-id="item.id"
        :class="{ 'selected' : itemSelected(item) }"
        @click="setActive(item, $event)"
        v-on:select="onSelect"
        v-scroll-to="`#section_${item.id}`"
        class="tree-node draggable" />
      <div class="b-menu-tree__group node-sortable tree-branch draggable" :key="index" v-if="isGroup(item)">
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
          v-scroll-to="`#section_${section.id}`"
          @click="setActive(section, $event)"
          class="tree-node group-node draggable" />
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
      'sectionsGroups',
      'settingObjectSection'
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
        draggable: '.draggable',
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
      'setControlPanel',
      'setElement'
    ]),

    ...mapActions('Landing', [
      'saveState'
    ]),

    buildTree (renew = false) {
      if (!this.init || !renew) {
        this.menuTree = []

        this.builderSections().forEach((section) => {
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
      let nodeId = e.item.dataset.id
      let currentSection = this.getSectionById(nodeId)
      let group = Array.from(e.from.querySelectorAll('.tree-node')).map((node) => node.dataset.id)

      console.log(e)

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
        if (e.to !== e.from) {
          needReloadTree = true
          // move to group
          if (e.to.classList.contains('tree-branch')) {
            let mainSection = this.getSectionById(e.to.querySelector('.tree-node').dataset.id)
            if (e.newIndex !== 0) {
              this.setSectionData(mainSection, 'absorb', mainSection.data.mainStyle.absorb + 1)
            } else {
              // make new main
              let absorb = mainSection.data.mainStyle.absorb + 1
              this.setSectionData(mainSection, 'absorb', 0)
              this.setSectionData(currentSection, 'absorb', absorb)
            }
          } else { // move from group
            if (e.oldIndex !== 0) {
              let mainSection = this.getSectionById(e.from.querySelector('.tree-node').dataset.id)
              this.setSectionData(mainSection, 'absorb', mainSection.data.mainStyle.absorb - 1)
            } else {
              // make new main
              let absorb = currentSection.data.mainStyle.absorb - 1
              let newMainSection = this.getSectionById(Array.from(e.from.querySelectorAll('.tree-node'))[1].dataset.id)

              this.setSectionData(currentSection, 'absorb', 0)
              this.setSectionData(newMainSection, 'absorb', absorb)
            }
          }
        }

        // --- moving within a group
        if (e.from.classList.contains('tree-branch') && e.to.classList.contains('tree-branch')) {
          // The section becomes the new master
          if (e.newIndex === 0) {
            let oldMaster = _.filter(this.builder.sections, (section) => {
              return group.indexOf(section.id) > -1 && section.isMain
            })
            let absorb = oldMaster.data.mainStyle.absorb

            this.setSectionData(oldMaster, 'absorb', 0)
            this.setSectionData(currentSection, 'absorb', absorb)
          }

          // The old master lost its lead
          if (e.oldIndex === 0) {
            let absorb = currentSection.data.mainStyle.absorb
            let newMaster = this.getSectionById(group[0])

            this.setSectionData(currentSection, 'absorb', 0)
            this.setSectionData(newMaster, 'absorb', absorb)
          }
        }

        this.builder.sort(this.lastIndexes.indexOf(nodeId), newIndexes.indexOf(nodeId))
      }

      this.lastIndexes = this.getIndexes() // renew indexes
      if (needReloadTree) {
        this.buildTree(true)
        needReloadTree = false
      }

      this.saveState(this.builder.export('JSON'))
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
      return this.selectedSections.indexOf(section.id) > -1 || this.isActiveSection(section.id)
    },

    showBackgroundPanel (section) {
      this.setControlPanel('SectionBackground')
      this.setSettingSection(section)
    },

    ungroup (section) {
      this.setSectionData(section, 'absorb', 0)
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
      this.setSectionData(newMain, 'absorb', this.absorbed.length)

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
    },

    setSectionData (section, param, value) {
      let obj = {}
      obj[param] = value
      section.set('$sectionData.mainStyle', _.merge({}, section.data.mainStyle, obj))
    },

    headerSection () {
      return this.builder.sections.find(section => section.isHeader)
    },

    setActive (section, event) {
      this.setSettingSection(section)
      if (!event.ctrlKey) {
        this.selectedSections = []
      }
    },

    isActiveSection (id) {
      return this.settingObjectSection.id === id
    }
  }
}
</script>

<style lang="sass" scoped>
.b-menu-tree
  padding: 0 0 3rem
  margin: 0

  &__group
    background: rgba($grey-middle, .1)

    .tree-node
      padding-left: 3.2rem

  &__group-name
    color: $gray300
    font-size: 1.6rem
    font-weight: bold
    line-height: 1.9rem
    letter-spacing: -0.02em

    display: flex
    justify-content: space-between
    padding: 1.6rem 1.6rem 1.6rem 3.1rem

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
