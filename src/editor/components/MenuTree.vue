<template>
  <div class="b-menu-tree node-sortable tree-root">
    <template v-for="(item, index) in menuTree">
      <menu-tree-item v-if="!isGroup(item)" :key="index" :section="item" :data-id="item.id" class="tree-node" />
      <div class="b-menu-tree__group node-sortable tree-branch" :key="index" v-if="isGroup(item)">
        <menu-tree-item
          v-for="(section, i) in item"
          :key="i"
          :section="section"
          :data-id="section.id"
          class="tree-node" />
      </div>
    </template>
  </div>
</template>

<script>
import * as _ from 'lodash-es'
import { mapState } from 'vuex'
import MenuTreeItem from './MenuTreeItem'
import Sortable from 'sortablejs'

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
      lastIndexes: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sectionsGroups'
    ]),

    builderSections () {
      return this.sections.filter(section => !section.isHeader)
    }
  },

  watch: {
    sections () {
      this.buildTree()
    },

    sectionsGroups () {
      this.buildTree()
    }
  },

  updated () {
    let nodes = Array.from(document.querySelectorAll('.node-sortable'))
    for (let i = 0; i < nodes.length; i++) {
      Sortable(nodes[i], {
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
    buildTree () {
      this.menuTree = []

      this.builderSections.forEach((section) => {
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
    },

    treeUpdate (e) {
      let newIndexes = this.getIndexes()

      if (e.item.classList.contains('tree-branch')) { // move group
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
      } else { // move 1 section
        console.log(e)
        let nodeId = e.item.dataset.id

        if (e.to !== e.from) {
          // move to group
          if (e.to.classList.contains('tree-branch')) {
            if (e.newIndex !== 0) {
              let mainSection = this.getSectionById(e.to.querySelector('.tree-node').dataset.id)
              mainSection.data.mainStyle.absorb = mainSection.data.mainStyle.absorb + 1
            } else {
              // TODO: make new main
            }
          } else { // move from group
            if (e.oldIndex !== 0) {
              let mainSection = this.getSectionById(e.from.querySelector('.tree-node').dataset.id)
              mainSection.data.mainStyle.absorb = mainSection.data.mainStyle.absorb - 1
              if (mainSection.data.mainStyle.absorb === 0) {
                mainSection.isMain = false
              }
            } else {
              // TODO: make new main
            }
          }
        }

        this.sort(this.lastIndexes.indexOf(nodeId), newIndexes.indexOf(nodeId))
      }

      this.lastIndexes = this.getIndexes() // renew indexes

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
    }
  }
}
</script>

<style lang="sass" scoped>
.b-menu-tree
  padding: 1rem

  &__group
    background: $gray300
    padding: 1rem
</style>
