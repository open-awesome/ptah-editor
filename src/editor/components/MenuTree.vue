<template>
  <div class="b-menu-tree node-sortable">
    <template v-for="(item, index) in menuTree">
      <menu-tree-item v-if="!isGroup(item)" :key="index" :section="item"></menu-tree-item>
      <div class="b-menu-tree__group node-sortable" :key="index" v-if="isGroup(item)">
        <menu-tree-item v-for="(section, i) in item" :key="i" :section="section"></menu-tree-item>
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
    }
  },

  data () {
    return {
      menuTree: []
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
          console.log(event)
        }
      })
    }
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
            _.last(this.menuTree).push(section)
          }
        }
      })

      console.log(this.menuTree)
    },

    isSimpleSection (section) {
      return !section.isMain && _.find(this.sectionsGroups, (o) => o.children.indexOf(section.id) > -1) === undefined
    },

    isGroup (item) {
      return _.isArray(item)
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
