<template>
<div class="b-builder-settings-slots">

  <div class="b-builder-settings-slots__top">
    <header class="b-builder-settings-slots__header">

      <h6 class="b-builder-settings-slots__title">
        {{ title }}
      </h6>

      <button v-if="!options.sectionName" class="b-builder-settings-slots__closer" @click="$emit('requestClose')">
        <icon-base width="10" height="10" name="close"/>
      </button>

      <elements-list @addEl="addElement"/>

    </header>

    <div class="b-builder-settings-slots__direction">

      <h6 class="b-builder-settings-slots__subtitle">Section direction</h6>

      <ul>
        <li :class="{ active: isRowDir }" @click="changeDirection('row')">
          <icon-base name="groupRow"/>
        </li>
        <li :class="{ active: isColumnDir }" @click="changeDirection('column')">
          <icon-base name="groupColumn"/>
        </li>
      </ul>

      <h6 v-show="direction" class="b-builder-settings-slots__subtitle">Content direction</h6>

      <ul v-show="isRowDir">
        <li :class="{ active: align === 'flex-start' }" @click="changeAlign('flex-start')">
          <icon-base name="groupBottom"/>
        </li>
        <li :class="{ active: align === 'center' }" @click="changeAlign('center')">
          <icon-base name="groupCenterVertical"/>
        </li>
        <li :class="{ active: align === 'flex-end' }" @click="changeAlign('flex-end')">
          <icon-base name="groupTop"/>
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

    </div>

    <h6 class="b-builder-settings-slots__subtitle">Slots</h6>
  </div>

  <div class="b-builder-settings-slots__bottom">
    <draggable v-model="components" element="ul" class="b-builder-settings-slots__list">
      <li
          v-for="(component, index) in components"
          :key="`${component.name}-${index}`"
          @click="selectSlot(component, index)"
          class="b-builder-settings-slots__item">
        {{ component.name }}
        <base-button
            v-text="'-'"
            :disabled="!component.element.removable"
            @click.native.stop="removeElement(index)"
            size="small"
            color="light-gray"
            class="b-builder-settings-slots__button"/>
      </li>
    </draggable>
  </div>

</div>
</template>

<script>
import ElementsList from '@components/slots/ElementsList'
import Draggable from 'vuedraggable'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BuilderSettingsSlots',

  components: { ElementsList, Draggable },

  props: {
    section: Object,
    options: Object
  },

  computed: {
    ...mapState('Sidebar', ['sandbox']),

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
      return (this.section.get(this.sandbox.container) || {}).styles
    },

    components: {
      set (value) {
        this.section.set(this.sandbox.components, value)
      },
      get () {
        return this.section.get(this.sandbox.components) || []
      }
    },

    direction: {
      set (value) {
        this.section.set(this.sandbox.container, {
          styles: { ...this.styles, 'flex-direction': value }
        })
      },
      get () {
        return this.styles['flex-direction']
      }
    },

    align: {
      set (value) {
        this.section.set(this.sandbox.container, {
          styles: { ...this.styles, 'align-items': value }
        })
      },
      get () {
        return this.styles['align-items']
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', ['clearSettingObjectLight']),

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

    addElement (element) {
      element.element.removable = true
      this.components = [...this.components, element]
    },

    removeElement (index) {
      this.components.splice(index, 1)
      this.clearSettingObjectLight()
    }
  }
}
</script>

<style lang="sass" scoped>
.b-builder-settings-slots
  position: relative
  max-width: 40rem
  width: 100%
  width: intrinsic
  width: -moz-max-content
  width: -webkit-max-content
  height: 100%
  display: flex
  flex-direction: column
  padding: .8rem 0.5rem 2.8rem 3.2rem
  background: #F5F5F5

  &__bottom
    overflow: auto

  &__header
    width: 100%

    display: flex
    align-items: center
    justify-content: space-between

  &__title
    min-width: 15rem
    max-width: 20rem
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    margin: 0
    padding-right: .8rem
    color: #272727
    font-size: 1.8rem
    font-weight: bold
    color: rgba(39, 39, 39, 0.5)
    &:first-letter
      text-transform: uppercase

  &__closer
    position: absolute
    right: 1rem
    top: 1rem
    padding: 0.6rem 1rem
    border: 0
    background: transparent
    cursor: pointer
    + *
      margin-right: 4rem

  &__subtitle
    margin: 0
    color: #272727
    font-size: 1.6rem
    font-weight: bold
    &:first-letter
      text-transform: uppercase

  &__direction
    width: 100%
    border: none
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    padding: 0 0 1.6rem 0
    overflow: hidden
    margin-bottom: .8rem

    h6
      width: 100%
      margin: 1.6rem 0

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
        color: #000 !important
        &:hover,
        &.active
          background: rgba(67, 111, 238, 0.15)
        &.active
          color: $gray-light
          cursor: default

  &__list
    margin: 0
    margin-top: 1.8rem
    padding: 0
    padding-right: 1.8rem

    display: flex
    flex-direction: column

    list-style-type: none

  &__item
    display: flex
    align-items: center
    justify-content: space-between
    padding: .8rem
    cursor: pointer
    transition: background-color .1s linear

    &:hover,
    &.active
      background-color: lightgray
      border-radius: .2rem

  &__button
    width: auto
    height: auto
    margin: 0
    margin-left: .8rem
    padding: .2rem .8rem
    font-size: 2rem
    line-height: 1em
</style>
