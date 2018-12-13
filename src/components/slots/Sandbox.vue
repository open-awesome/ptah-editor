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
    align (value, dir) {
      let rule = ''
      let style = {}
      if (dir && this.innerDir === 'column') {
        rule = 'justify-content'
      } else {
        rule = 'align-items'
      }
      style[rule] = value
      this.setStyle(style)
    },
    changeDirection (dir) {
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
        <ul>
          <li @click.stop="align('flex-start', true)"><icon-base name="groupTop"></icon-base></li>
          <li @click.stop="align('center', true)"><icon-base name="groupCenterVertical"></icon-base></li>
          <li @click.stop="align('flex-end', true)"><icon-base name="groupBottom"></icon-base></li>
        </ul>
        <ul>
          <li @click.stop="align('flex-end', false)"><icon-base name="groupRight"></icon-base></li>
          <li @click.stop="align('center', false)"><icon-base name="groupCenterHorizontal"></icon-base></li>
          <li @click.stop="align('flex-start', false)"><icon-base name="groupLeft"></icon-base></li>
        </ul>
        <ul>
          <li @click.stop="changeDirection('column')"><icon-base name="groupColumn"></icon-base></li>
          <li @click.stop="changeDirection('row')"><icon-base name="groupRow"></icon-base></li>
        </ul>
      </div>
      <slot>

      </slot>
  </div>
</template>

<style lang="sass" scoped>
.b-slot
  display: flex
  // flex-wrap: wrap
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
    padding: 5px
    overflow: hidden
    opacity: .3
    z-index: 1
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
        padding: .8rem
        cursor: pointer
        &:hover
          background: rgba(67, 111, 238, 0.15)
  /deep/
    .b-draggable-slot
      display: flex
</style>
