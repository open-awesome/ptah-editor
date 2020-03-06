<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      <span>
        {{ $t('menu.sections') }}
      </span>
      <span class="b-builder-sidebar__icon-add"
        slot="icon"
        :tooltip="$t('nav.addSection')"
        tooltip-position="bottom"
        @click.stop="showAddSectionBar">
         <IconBase
           name="plus"
           strokeColor="transparent"
         />
      </span>
      <span class="b-builder-sidebar__icon-close" @click="toggleSidebarSection">
        <IconBase
          name="close"
          width="14"
          height="14"
        />
      </span>
    </h6>

    <div class="b-panel__control">
      <!-- Show added sections -->
      <div class="b-builder-sidebar__content-outer">
        <MenuTree
          v-if="!controlPanel.expanded && isExpanded"
          :sections="this.builder.sections"
          :builder="builder"
          :inc="increment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuTree from './../MenuTree'
import ControlSectionLayouts from './../controls/TheControlSectionLayouts.vue'

export default {
  name: 'ThePanelSectionsTree',

  data () {
    return {
      increment: 0
    }
  },

  components: {
    ControlSectionLayouts,
    MenuTree
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'controlPanel',
      'isExpanded'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'toggleAddSectionMenu'
    ]),

    ...mapActions('Landing', [
      'saveState'
    ]),

    showAddSectionBar () {
      this.toggleAddSectionMenu()
    },

    async onAddSection (section) {
      this.increment = this.increment + 1

      await this.$nextTick()
      let target

      document.querySelectorAll('.menu-tree-item').forEach((node) => {
        if (parseInt(node.dataset.id) === section.id) {
          target = node
        }
      })

      target.click()

      // move header to top
      if (section.isHeader) {
        this.builder.sort(this.builder.sections.length - 1, 0)
      }
    },

    toggleSidebarSection () {
      this.toggleSidebar()
    }
  }
}
</script>
