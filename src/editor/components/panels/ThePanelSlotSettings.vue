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
          <li :class="{ active: align === 'flex-start' }" tooltip="Top" @click="changeAlign('flex-start')">
            <icon-base name="groupTop"/>
          </li>
          <li :class="{ active: align === 'center' }" tooltip="Vertical align center" @click="changeAlign('center')">
            <icon-base name="groupCenterVertical"/>
          </li>
          <li :class="{ active: align === 'flex-end' }" tooltip="Bottom" @click="changeAlign('flex-end')">
            <icon-base name="groupBottom"/>
          </li>
        </ul>

        <ul v-show="isRowDir">
          <li :class="{ active: justify === 'center' }" tooltip="Center" @click="changeJustify('center')">
            <icon-base name="groupCenterHorizontal"/>
          </li>

          <li :class="{ active: justify === 'space-between' }" tooltip="Space between" @click="changeJustify('space-between')">
            <icon-base name="groupSpaceBetween"/>
          </li>

          <li :class="{ active: justify === 'flex-start' }" tooltip="Left" @click="changeJustify('flex-start')">
            <icon-base name="groupLeft"/>
          </li>

          <li :class="{ active: justify === 'flex-end' }" tooltip="Right" @click="changeJustify('flex-end')">
            <icon-base name="groupRight"/>
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

    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelSlotSettings',
  components: { ControlBox },
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
    },

    justify: {
      get () {
        return this.styles['justify-content']
      },

      set (value) {
        this.settingObjectSection.set(this.sandbox.container, {
          styles: { ...this.styles, 'justify-content': value }
        })
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
    },

    changeJustify (value) {
      if (value === this.justify) {
        return
      }
      this.justify = value
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
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
      margin: 0 0 1.5rem
      padding: 0
      &:last-child
        border-bottom: none
      li
        padding: .8rem
        cursor: pointer
        color: $blue
        border-radius: 3px
        margin-right: 6px

        transition: all .3s cubic-bezier(.2,.85,.4,1.275)
        &:hover,
        &.active
          background: $dark-blue-krayola
        &:hover
          color: #ffffff
        &.active
          color: #ffffff
          cursor: default
</style>
