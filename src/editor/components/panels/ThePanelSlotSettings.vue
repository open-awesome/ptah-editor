<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Slot
    </h6>

    <div class="direction">
      <div class="b-panel__control">
        <h6 class="">Section direction</h6>

        <ul>
          <li :class="{ active: isRowDir }" @click="changeDirection('row')">
            <icon-base name="groupRow"/>
          </li>
          <li :class="{ active: isColumnDir }" @click="changeDirection('column')">
            <icon-base name="groupColumn"/>
          </li>
        </ul>
      </div>

      <div class="b-panel__control">
        <h6 v-show="direction" class="">Content direction</h6>

        <ul v-show="isRowDir">
          <li :class="{ active: align === 'flex-start' }" @click="changeAlign('flex-start')">
            <icon-base name="groupTop"/>
          </li>
          <li :class="{ active: align === 'center' }" @click="changeAlign('center')">
            <icon-base name="groupCenterVertical"/>
          </li>
          <li :class="{ active: align === 'flex-end' }" @click="changeAlign('flex-end')">
            <icon-base name="groupBottom"/>
          </li>
        </ul>

        <ul v-show="isColumnDir">
          <li :class="{ active: align === 'flex-start' }" @click="changeAlign('flex-start')">
            <icon-base name="groupLeft"/>
          </li>
          <li :class="{ active: align === 'center' }" @click="changeAlign('center')">
            <icon-base name="groupCenterHorizontal"/>
          </li>
          <li :class="{ active: align === 'flex-end' }" @click="changeAlign('flex-end')">
            <icon-base name="groupRight"/>
          </li>
        </ul>
      </div> <!-- /_b-panel__control-->
    </div><!-- /_direction-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ThePanelSlotSettings',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', ['sandbox', 'settingObjectSection', 'settingObjectOptions']),

    options () {
      return this.settingObjectOptions
    },

    title () {
      return this.options.sectionName || this.section.name
    },

    sectionElement () {
      return document.getElementById(`section_${this.section.id}`)
    },

    isRowDir () {
      return this.direction === 'row'
    },

    isColumnDir () {
      return this.direction === 'column'
    },

    styles () {
      return (this.settingObjectSection.get(this.sandbox.container) || {}).styles
    },

    components: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.components, value)
      },
      get () {
        return this.settingObjectSection.get(this.sandbox.components) || []
      }
    },

    direction: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.container, {
          styles: { ...this.styles, 'flex-direction': value }
        })
      },
      get () {
        return this.styles['flex-direction']
      }
    },

    align: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.container, {
          styles: { ...this.styles, 'align-items': value }
        })
      },
      get () {
        return this.styles['align-items']
      }
    }
  },

  methods: {
    selectSlot (component, index) {
      try {
        let slotContainer = this.sectionElement.querySelector('.b-draggable-slot.active')
        if (slotContainer) {
          let slotElement = slotContainer.children[index].firstElementChild
          slotElement.click()
        }
      } catch (error) {
        console.error(error)
      }
    },

    changeDirection (value) {
      if (value === this.direction) {
        return
      }
      this.direction = value
    },

    changeAlign (value) {
      if (value === this.align) {
        return
      }
      this.align = value
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  padding-bottom: 4.5rem
  display: flex
  flex-direction: column
  height: auto
  width: 100%
  align-items: stretch

  &__title
    color: $black
    font-size: 2rem
    font-weight: bold

    min-width: 28rem
    margin: 0 0 2.8rem 0
    padding: 0
    &:first-letter
      text-transform: uppercase

  &__control
    margin-bottom: 1.6rem

  .direction
    width: 100%
    border: none
    padding: 0 0 1.6rem 0
    overflow: hidden
    margin-bottom: .8rem

    h6
      font-size: 1.4rem
      font-weight: normal
      line-height: 1.8rem
      color: $grey-middle
      letter-spacing: -0.01em

      padding: 0 0 0.5rem 0
      margin: 0
      display: inline-block

    ul
      width: 100%
      display: flex
      align-items: center
      list-style-type: none
      margin: 0
      padding: 0
      &:last-child
        border-bottom: none
      li
        padding: .8rem
        cursor: pointer
        color: $blue
        border-radius: 3px
        margin-right: 6px
        &:hover,
        &.active
          background: $dark-blue-krayola
        &.active
          color: #ffffff
          cursor: default
</style>