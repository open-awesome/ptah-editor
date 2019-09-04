<template>
  <div class="b-menu-tree">
    <base-scroll-container backgroundBar="#999">
      <!-- header section -->
      <menu-tree-item
        v-if="headerSection()"
        :section="headerSection()"
        :builder="builder"
        :data-id="headerSection().id"
        :class="{ 'selected' : itemSelected(headerSection())}"
        class="isHeader"
        @click="setActive(headerSection(), $event)"
        v-scroll-to="`#section_${headerSection().id}`" />

      <!-- tree menu -->
      <div class="node-sortable tree-root" ref="tree">
        <template v-for="(item, index) in menuTree">
          <menu-tree-item
            v-if="!isGroup(item)"
            :key="index"
            :section="item"
            :builder="builder"
            :data-id="item.id"
            :class="{ 'selected' : itemSelected(item) }"
            @click="setActive(item, $event)"
            v-on:select="onSelect"
            v-on:delete="onDelete"
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
              :builder="builder"
              :data-id="section.id"
              :class="{ 'selected' : itemSelected(section) }"
              is-group-item="true"
              v-on:select="onSelect"
              v-on:delete="onDelete"
              v-scroll-to="`#section_${section.id}`"
              @click="setActive(section, $event)"
              class="tree-node group-node draggable" />
          </div>
        </template>
      </div>
    </base-scroll-container>

    <div class="b-menu-tree__group-control">
      <div class="b-menu-tree__group-control--description" v-show="selectedSections.length <= 1">
        <icon-base name="pling"></icon-base>
        <div>
          To group sections select them both holding “Ctrl” key
        </div>
      </div>
      <base-button
        v-show="selectedSections.length > 1"
        @click="groupSections"
        size="middle"
        color="gray"
        class="b-menu-tree__group-together">Group selected</base-button>
    </div>
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
    },
    inc: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      menuTree: [],
      lastIndexes: [],
      selectedSections: [],
      absorbed: [],
      init: false,
      nested: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sectionsGroups',
      'settingObjectSection'
    ])
  },

  watch: {
    sectionsGroups (value, oldValue) {
      this.buildTree()
    },

    inc () {
      this.buildTree(true)
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.initSortable()
    })

    this.treeOutsideClick()
  },

  updated () {
    this.lastIndexes = this.getIndexes()
  },

  beforeDestroy () {
    this.destroySortable()
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

    initSortable () {
      setTimeout(() => {
        let nodes = Array.from(document.querySelectorAll('.node-sortable'))
        for (let i = 0; i < nodes.length; i++) {
          this.nested[i] = new Sortable(nodes[i], {
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
      }, 300)
    },

    destroySortable () {
      try {
        this.nested.forEach((sortable) => {
          sortable.destroy()
        })

        let nodes = Array.from(document.querySelectorAll('.group-node'))
        nodes.forEach((node) => node.remove())
      } catch (e) {
        console.warn(e)
      }
    },

    buildTree (renew = false) {
      if (!this.init || renew) {
        this.menuTree.splice(0, this.menuTree.length)

        this.builderSections().forEach((section) => {
          if (this.isSimpleSection(section)) {
            this.menuTree.push(section)
          } else {
            if (section.isMain) {
              this.menuTree.push([section])
            } else {
              try {
                _.last(this.menuTree).push(section)
              } catch (e) {
                this.menuTree.push(section)
                console.warn(e)
              }
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

      if (e.item.classList.contains('tree-branch')) { // --- move group
        // section ids in the group
        let ids = Array.from(e.item.querySelectorAll('.tree-node')).map((node) => node.dataset.id)

        if (this.lastIndexes.indexOf(ids[0]) > newIndexes.indexOf(ids[0])) {
          ids.forEach((id) => {
            this.sort(this.lastIndexes.indexOf(id), newIndexes.indexOf(id))
          })
        } else {
          _.forEachRight(ids, (id) => {
            this.sort(this.lastIndexes.indexOf(id), newIndexes.indexOf(id))
          })
        }
      } else { // --- move 1 section
        if (e.to !== e.from) {
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
            if (group.length < 2) {
              // ungroup
              let mainSection
              needReloadTree = true
              if (currentSection.isMain) {
                mainSection = currentSection
              } else {
                mainSection = this.getSectionById(e.from.querySelector('.tree-node').dataset.id)
              }
              mainSection.isMain = false
              this.setSectionData(mainSection, 'absorb', 0)
            } else {
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
        }

        // --- moving within a group
        if (e.from.classList.contains('tree-branch') && e.to.classList.contains('tree-branch')) {
          // The section becomes the new master
          if (e.newIndex === 0) {
            let oldMaster = _.find(this.builder.sections, (section) => {
              return group.indexOf(section.id + '') > -1 && section.isMain
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

        this.sort(this.lastIndexes.indexOf(nodeId), newIndexes.indexOf(nodeId))
      }

      resetIndents()

      this.lastIndexes = this.getIndexes() // renew indexes
      if (needReloadTree) {
        this.destroySortable()
        this.buildTree(true)
        this.initSortable()
        needReloadTree = false
      }

      this.saveState(this.builder.export('JSON'))
    },

    sort (oldIndex, newIndex) {
      let headerOffset = this.headerSection() ? 1 : 0
      oldIndex = parseInt(oldIndex)
      newIndex = parseInt(newIndex)
      this.builder.sort(oldIndex + headerOffset, newIndex + headerOffset)
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

    onDelete () {
      setTimeout(() => {
        this.buildTree(true)
      }, 300)
    },

    itemSelected (section) {
      return this.selectedSections.indexOf(section.id) > -1 || this.isActiveSection(section.id)
    },

    showBackgroundPanel (section) {
      this.setControlPanel('GroupBackground')
      this.setSettingSection(section)
    },

    ungroup (section) {
      this.setSectionData(section, 'absorb', 0)
      resetIndents()
      setTimeout(() => {
        this.destroySortable()
        this.buildTree(true)
        this.initSortable()
      }, 300)
    },

    async groupSections () {
      let group = this.sections.filter((section) => {
        return this.selectedSections.indexOf(section.id) > -1
      })

      let newMain = _.head(group)
      this.absorbed = _.tail(group)

      this.applyGroup(newMain)

      await this.$nextTick()
      this.destroySortable()
      this.buildTree(true)
      this.initSortable()
    },

    applyGroup (newMain) {
      // sort sections in builder
      this.moveSections(this.sIndex(newMain.id))
      // apply changes
      this.setSectionData(newMain, 'absorb', this.absorbed.length)

      resetIndents()

      this.selectedSections = []
      this.absorbed = []
    },

    /**
     * Moves sections together if they are marked through one
     * @param index - index of the main section in the group
     */
    moveSections (index) {
      let holes = this.findHoles(index)

      holes.forEach((hole) => {
        this.builder.sort(hole.index, hole.index + 1)
      })

      if (this.findHoles(index).length) {
        this.moveSections(index)
      }
    },

    /**
     * Finds the gaps between the marked sections
     * @param index - index of the main section in the group
     * @returns {array} - array of gaps {index, id}
     */
    findHoles (index) {
      let holes = []
      let stop = 0

      for (let i = index + 1; i < this.builder.sections.length; i++) {
        if (this.absorbed.find((s) => s.id === this.builder.sections[i].id) === undefined
          && stop < this.absorbed.length) {
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
        this.selectedSections = [section.id]
      }
    },

    isActiveSection (id) {
      return this.settingObjectSection.id === id
    },

    /**
     * Get section index in builder by id
     * @param id
     * @returns {number}
     */
    sIndex (id) {
      return _.findIndex(this.builder.sections, (s) => s.id === id)
    },

    /**
     *  outside click
     */
    treeOutsideClick () {
      const tree = this.$refs.tree

      document.addEventListener('click', e => {
        const target = e.target

        if (target !== tree && !tree.contains(target)) {
          this.selectedSections = []
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.tree-root
  padding-bottom: 5rem

.b-menu-tree
  padding: 0 0 5rem
  margin: 0
  height: 100%

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

  &__group-control
    position: absolute
    bottom: 0
    width: 100%
    padding: 0 4.4rem 1.8rem 2.1rem

    &--description
      color: $grey-middle
      font-size: 1.4rem
      line-height: 1.7rem
      display: flex
      justify-content: flex-start
      align-items: center

      svg
        width: 2.4rem
        height: 2.4rem
        margin-right: 1.1rem

  &__group-together
    width: 100% !important
    background: transparent !important
</style>
