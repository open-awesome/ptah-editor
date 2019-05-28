<template>
  <div class="menu-tree-item" @click="onClick" @click.ctrl="onClickCtrl">
    <div class="menu-tree-item__drag">
      <icon-base name="dragNew"></icon-base>
    </div>
    <div class="menu-tree-item__name">
      {{section.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuTreeItem',
  props: {
    section: {
      required: true
    },

    isGroupItem: {
      required: false
    }
  },

  methods: {
    onClick () {
      this.$emit('click', this.section)
    },

    onClickCtrl () {
      if (!this.isGroupItem) {
        this.$emit('select', this.section)
      }
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
    padding: 1.6rem 2.5rem 1.6rem 1.6rem
    cursor: pointer

    &__drag
      visibility: hidden
      margin-right: 1.2rem
      width: .3rem
      svg
        width: .3rem
        height: 1.4rem

    &:hover
      background: rgba(116, 169, 230, 0.25)
      .menu-tree-item__name
        color: #000
      .menu-tree-item__drag
        visibility: visible

    &.selected
      background: rgba(116, 169, 230, 0.25)
      .menu-tree-item__name
        color: #000
</style>
