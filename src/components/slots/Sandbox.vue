<script>
export default {
  name: 'Sandbox',
  inject: ['$builder', '$section'],
  props: {
    path: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'row'
    }
  },
  data: () => ({
    styles: {},
    innerDir: ''
  }),

  computed: {
    isRowDir () {
      return this.innerDir === 'row'
    },

    isColumnDir () {
      return this.innerDir === 'column'
    }
  },

  methods: {
    setStyle (data) {
      this.styles = Object.assign(this.styles, this.$section.get(this.path + '.styles'), data)
      this.$section.set(this.path, { styles: this.styles })
    },
    /**
     * Align elements in slot
     * @param value {string} - css rule value
     * @param dir {boolean} - true - vertical, false - horizontal
     */
    align (value) {
      this.setStyle({ 'align-items': value })
    },
    changeDirection (target, dir) {
      target = target.closest('li')
      if (target.classList.contains('active')) {
        return
      }
      this.innerDir = dir
      this.setStyle({ 'flex-direction': dir })
    }
  },
  mounted () {
    this.innerDir = this.direction
    this.setStyle({ 'flex-direction': this.direction })
  }
}
</script>

<template>
  <div class="b-slot">
      <div class="b-slot__tune ptah-control">
        <ul v-show="isRowDir">
          <li @click.stop="align('flex-start')"><icon-base name="groupTop"></icon-base></li>
          <li @click.stop="align('center')"><icon-base name="groupCenterVertical"></icon-base></li>
          <li @click.stop="align('flex-end')"><icon-base name="groupBottom"></icon-base></li>
        </ul>
        <ul v-show="isColumnDir">
          <li @click.stop="align('flex-end')"><icon-base name="groupRight"></icon-base></li>
          <li @click.stop="align('center')"><icon-base name="groupCenterHorizontal"></icon-base></li>
          <li @click.stop="align('flex-start')"><icon-base name="groupLeft"></icon-base></li>
        </ul>
        <ul>
          <li :class="{ active: isRowDir }" @click.stop="changeDirection($event.target, 'row')"><icon-base name="groupRow"></icon-base></li>
          <li :class="{ active: isColumnDir }" @click.stop="changeDirection($event.target, 'column')"><icon-base name="groupColumn"></icon-base></li>
        </ul>
      </div>
      <slot>

      </slot>
  </div>
</template>

<style lang="sass" scoped>
.b-slot
  $this: &
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  position: relative
  width: 100%
  min-height: 20rem
  .is-editable &
    border: 1px dashed $green
  &__tune
    background: $color-gray
    border: none
    width: $slot-step
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    position: absolute
    top: 5.2rem
    right: 0px
    padding: 0.5rem
    overflow: hidden
    opacity: 0
    z-index: 1
    #{$this}:hover &
      opacity: 0.3
      &:hover
        opacity: 1
    ul
      list-style: none
      margin: 0
      padding: .8rem
      border-bottom: 1px solid #B2B2B2
      &:last-child
        border-bottom: none
      li
        padding: .4rem
        cursor: pointer
        &:hover,
        &.active
          background: rgba(67, 111, 238, 0.15)
        &.active
          color: $gray-light
          cursor: default
  /deep/
    .b-draggable-slot
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
</style>
