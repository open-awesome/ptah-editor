<template>
  <div
    class="b-menu-tree"
    ref="tree"
    :class="[
      { '_short': menuTree.length > 0 && settingObjectSection.id && selectedSections.length === 1 },
      { '_short': selectedGroup.length > 0 },
      { '_long': selectedSections.length > 1 }
    ]"
  >
    <base-scroll-container backgroundBar="#999">
      <!-- header section -->

      <menu-tree-item
        ref="header"
        v-if="headerSection()"
        :section="headerSection()"
        :builder="builder"
        :data-id="headerSection().id"
        :class="{ 'selected' : itemSelected(headerSection())}"
        class="isHeader"
        @click="setActive(headerSection(), $event)"
        v-scroll-to="`#section_${headerSection().id}`"
      />

      <!-- tree menu -->
      <div class="node-sortable tree-root">
        <template v-for="(item, index) in menuTree">
          <menu-tree-item
            v-if="!isGroup(item)"
            :key="index"
            :section="item"
            :builder="builder"
            :data-id="item.id"
            :class="{ 'selected' : itemSelected(item) }"
            @click="setActive(item, $event)"
            @select="onSelect"
            v-scroll-to="`#section_${item.id}`"
            class="tree-node draggable"
          />
          <div
            class="b-menu-tree__group node-sortable tree-branch draggable"
            :key="index"
            v-if="isGroup(item)"
          >
            <div
              class="b-menu-tree__group-name"
              @click="onSelectGroup(item)"
              :class="[
                { 'selected' : selectedGroup.length > 0 && selectedGroup[0].id === item[0].id }
              ]"
            >
              <span>
                Group
              </span>
              <div class="b-menu-tree__group-controls">
                <span
                  @click="showBackgroundPanel(item[0])"
                >
                  <IconBase name="backgroundGrey" />
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
              @select="onSelect"
              v-scroll-to="`#section_${section.id}`"
              @click="setActive(section, $event)"
              class="tree-node group-node draggable" />
          </div>
        </template>
      </div>
    </base-scroll-container>

    <div class="b-menu-tree__bottom">
      <base-button
        v-if="selectedSections.length > 1"
        @click="showConfirm = true"
        size="small"
        color="main-green-transparent"
        class="b-menu-tree__group-together"
      >
        Create group
      </base-button>

      <div
        class="b-delete-section"
        v-if="sections.length > 0 && settingObjectSection.id && selectedSections.length === 1"
      >
        <BaseButton
          @click.stop="showConfirmDelete = true"
          color="main-red-transparent"
          size="small"
        >
          Delete section
        </BaseButton>
      </div>
      <div
        class="b-delete-section"
        v-if="selectedGroup.length > 0"
      >
        <BaseButton
          @click.stop="ungroup"
          color="main-red-transparent"
          size="small"
        >
          Delete group
        </BaseButton>
      </div>
      <div class="b-menu-tree__bottom-description" v-if="selectedSections.length < 2">
        <IconBase
          width="12"
          height="12"
          name="info"
          color="#A2A5A5"
        />
        <div>
          To create group select both section holding “Ctrl” key
        </div>
      </div>
    </div>

    <base-confirm
      title="Group selected"
      @confirm="groupSections"
      @close="showConfirm = false"
      v-if="showConfirm"
      button="Group"
    >
      After grouping, the background of all child sections will be deleted
    </base-confirm>

    <base-confirm
      title="Delete section"
      @confirm="deleteSection"
      @close="showConfirmDelete = false"
      v-if="showConfirmDelete"
      button="Delete"
    >
      You are going to delete <span class="b-menu-tree__modal-name-section">{{ settingObjectSection.name }}</span>, this cannot be undone. Confirm deleting?
    </base-confirm>
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
  components: {
    MenuTreeItem
  },
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
      selectedGroup: [],
      absorbed: [],
      init: false,
      nested: [],
      showConfirm: false,
      showConfirmDelete: false
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
      'setElement',
      'toggleAddSectionMenu'
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
      let isInGroup = false
      let i = this.selectedSections.indexOf(section.id)
      this.selectedGroup = []

      this.menuTree.forEach(item => {
        if (this.isGroup(item) && item.findIndex(i => i.Id === section.id)) {
          isInGroup = true
        }
      })

      // header can't be grouped
      if (this.headerSection() !== undefined) {
        const idHeader = this.headerSection().id
        const indexHeader = this.selectedSections.indexOf(idHeader)

        if (indexHeader > -1) {
          this.selectedSections.splice(indexHeader, 1)
        }
      }

      if (i > -1) {
        this.selectedSections.splice(i, 1)
      }

      if (!isInGroup) {
        this.selectedSections.push(section.id)
      } else {
        this.selectedSections.splice(0, 1)
        this.selectedSections.push(section.id)
      }
    },

    onSelectGroup (group) {
      this.selectedGroup = group
      this.selectedSections = []
    },

    onDelete () {
      setTimeout(() => {
        this.buildTree(true)
      }, 300)
    },

    itemSelected (section) {
      if (this.selectedGroup.length !== 0) {
        return false
      }
      return this.selectedSections.indexOf(section.id) > -1 || this.isActiveSection(section.id)
    },

    showBackgroundPanel (section) {
      this.setControlPanel('GroupBackground')
      this.setSettingSection(section)
    },

    ungroup () {
      const section = this.selectedGroup[0]

      this.selectedGroup.forEach((s) => {
        s['data']['mainStyle']['styles']['padding-top'] = '16px'
        s['data']['mainStyle']['styles']['padding-bottom'] = '16px'
        s['data']['mainStyle']['styles']['margin-top'] = '0'
        s['data']['mainStyle']['styles']['margin-bottom'] = '0'

        s['data']['mainStyle']['media']['is-mobile']['padding-top'] = '16px'
        s['data']['mainStyle']['media']['is-mobile']['padding-bottom'] = '16px'
        s['data']['mainStyle']['media']['is-mobile']['margin-top'] = '0'
        s['data']['mainStyle']['media']['is-mobile']['margin-bottom'] = '0'

        if (s.group === 'Slider') {
          s['data']['mainStyle']['styles']['padding-top'] = '0'
          s['data']['mainStyle']['styles']['padding-bottom'] = '0'

          s['data']['mainStyle']['media']['is-mobile']['padding-top'] = '0'
          s['data']['mainStyle']['media']['is-mobile']['padding-bottom'] = '0'
        }
      })

      this.setSectionData(section, 'absorb', 0)
      resetIndents()

      setTimeout(() => {
        this.destroySortable()
        this.buildTree(true)
        this.initSortable()
        this.selectedGroup = []
      }, 300)
    },

    async groupSections () {
      let group = this.sections.filter((section) => {
        return this.selectedSections.indexOf(section.id) > -1
      })

      let newMain = _.head(group)
      this.absorbed = _.tail(group)

      this.clearBackgrounds(this.absorbed)
      this.autoHeightToMain(newMain)
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
        if (this.headerSection()) {
          if (this.headerSection().id === section.id) {
            this.selectedSections = []
          } else {
            this.selectedSections = [section.id]
          }
        } else {
          this.selectedSections = [section.id]
        }
      } else {
        if (this.headerSection()) {
          if (this.headerSection().id === section.id) {
            this.selectedSections = []
          }
        }
      }

      this.selectedGroup = []
      this.toggleAddSectionMenu(false)
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

        if (target.classList.contains('b-menu-tree__group-together')) {
          return
        }

        if (target !== tree && !tree.contains(target)) {
          this.selectedSections = []
        }
      })
    },

    /**
     * Clear background from absorbed secitons
     * @param sections {Array} - list of absorbed sections
     */
    clearBackgrounds (sections) {
      sections.forEach((section) => {
        section.set(`$sectionData.mainStyle.styles['background-image']`, 'none')
        section.set(`$sectionData.mainStyle.media['is-mobile']['background-image']`, 'none')
        section.set(`$sectionData.mainStyle.styles['background-color']`, 'transparent')
        section.set(`$sectionData.mainStyle.media['is-mobile']['background-color']`, 'transparent')
      })
    },

    autoHeightToMain (mainSection) {
      mainSection.set(`$sectionData.mainStyle.styles['height']`, 'auto')
      mainSection.set(`$sectionData.mainStyle.media['is-mobile']['height']`, 'auto')

      if (mainSection.group === 'Slider') {
        mainSection.set(`$sectionData.mainStyle.styles['height']`, '80vh')
        mainSection.set(`$sectionData.mainStyle.media['is-mobile']['height']`, '80vh')
      }
    },

    deleteSection () {
      const sectionId = this.selectedSections[0]

      // update group
      if (this.isSlaveSection(sectionId)) {
        let master = _.find(this.sectionsGroups, o => o.children.indexOf(sectionId) > -1).main
        let absorb = master.data.mainStyle.absorb
        master.set('$sectionData.mainStyle', _.merge({}, master.data.mainStyle, { absorb: absorb - 1 }))
      }

      this.builder.remove(sectionId)
      this.clearSettingObject()

      resetIndents()

      this.onDelete()

      this.saveState(this.builder.export('JSON'))
    },

    isSlaveSection (sectionId) {
      return !!_.find(this.sectionsGroups, o => o.children.indexOf(sectionId) > -1)
    }
  }
}
</script>

<style lang="sass" scoped>
.tree-root
  padding-bottom: 0

.b-menu-tree
  padding: 0 0 9rem
  margin: 0
  height: 100%

  width: calc(100% + .5rem)
  &._short
    padding: 0 0 12rem
    .b-menu-tree__bottom
      height: 12rem
  &._long
    padding: 0 0 9rem
    .b-menu-tree__bottom
      height: 9rem
  &._short,
  &._long
    .b-menu-tree__bottom
      box-shadow: 0 2px 16px rgba($black, 0.1)

  &__group
    .menu-tree-item:nth-child(2)
      /deep/
        .menu-tree-item__controls > span:last-child
          visibility: hidden
    & .tree-node
      padding-left: 6.4rem
      /deep/
        .menu-tree-item__name,
        .menu-tree-item__name > span
          width: 9.5rem !important

  &__group-name
    color: $gray300
    font-size: 1.6rem
    font-weight: bold
    line-height: 1.9rem
    letter-spacing: -0.02em

    display: flex
    justify-content: space-between
    max-width: 28rem
    padding: 1.3rem 1.1rem 1.3rem 1.6rem
    margin: 0 0 0 1.3rem

    cursor: pointer
    &:active
      box-shadow: 0 4px 16px rgba($black, 0.25)
    &.selected
      background: rgba(0, 173, 182, 0.1)
      & *
        color: #575A5F
  &__group-controls
    opacity: .7
    svg
      margin-left: 1.5rem
      cursor: pointer
    &-ungroup
      margin-right: 0.3rem

  &__bottom
    position: absolute
    left: 0
    right: 1.5rem
    bottom: 0
    padding: 0 1rem 2.4rem
    height: 12rem

    display: flex
    flex-direction: column
    justify-content: flex-end
    align-items: center

    &-description
      color: #A2A5A5
      font-size: 1.2rem
      line-height: 1.6rem
      display: flex
      justify-content: flex-start
      align-items: center

      padding: 0 .8rem 0 1.6rem

      svg
        width: 2.4rem
        height: 2.4rem
        margin-right: 1.1rem
  &__modal-name-section
    font-weight: 600

.b-delete-section
  width: 100%
  text-align: center
  padding: 0 0 .9rem

  & svg
    transition: fill 0.3s cubic-bezier(.2,.85,.4,1.275)
    cursor: pointer
    &:hover
      fill: #FFCF0D
</style>
