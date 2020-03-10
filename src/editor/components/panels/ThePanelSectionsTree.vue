<template>
  <div class="b-panel" id="sections_contents">
    <h6 class="b-panel__title">
      <span>
        {{ $t('menu.sections') }}
      </span>
      <span class="b-panel__icon-add"
        slot="icon"
        :tooltip="$t('nav.addSection')"
        tooltip-position="bottom"
        @click.stop="showAddSectionBar">
         <IconBase
           name="plus"
           strokeColor="transparent"
         />
      </span>
      <span
        class="b-panel__icon-close"
       @click="closeSidebarSection"
      >
        <IconBase
          name="close"
          width="14"
          height="14"
        />
      </span>
    </h6>

    <div class="b-panel__content">
      <!-- Show added sections -->
      <div class="b-panel__content-outer">
        <MenuTree
          :sections="builder.sections"
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

  components: {
    ControlSectionLayouts,
    MenuTree
  },

  props: {
    builder: {
      type: Object,
      required: true
    },
    increment: {
      type: Number,
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
      'toggleAddSectionMenu',
      'toggleSectionsTreeMenu'
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

    closeSidebarSection () {
      this.toggleSidebar(false)
      this.toggleSectionsTreeMenu(false)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  &__title
    position: relative
    display: flex
    align-items: center
    justify-content: flex-start
    width: 100%
    padding: 1.7rem 3.1rem
    font-size: 2rem
    line-height: 1.2
    letter-spacing: -0.02em
  &__icon-add
    width: $size-step/2
    height: $size-step/2
    color: $grey
    display: flex
    align-items: center
    justify-content: center
    border-radius: 100%
    cursor: pointer
    margin: 1px 0 0 11px
    &:hover
      color: $main-green
  &__icon-close
    color: $grey
    position: absolute
    top: 18px
    right: 17px
    cursor: pointer
    &:hover
      color: $main-green
  &__content
    height: 100%

    display: flex
    flex-direction: column

    min-height: 0
    overflow: auto
    &-inner
      padding: 0
    /deep/
      .vb.vb-invisible .vb-content
        padding-right: 0 !important
        overflow: hidden !important
        width: 100% !important
      .vb.vb-visible .vb-content
        padding-right: 0 !important
        width: calc(100% + 17px) !important
    &-outer
      height: 100%
      padding: 0
</style>
