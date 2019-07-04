<template>
  <div class="b-text-icon is-editable"
    :class="{ 'b-text-icon_hide': !icon.visible }"
    ref="icon"
    @click.stop.stop=""
    >

    <slot v-if="!isActive"></slot>

    <div class="b-text-icon__item">
      <div class="b-text-icon__item-col b-text-icon__item-col-icon" v-if="icon.visible">
        <span class="b-text-icon__icon" :style="{ fill: colorFill['color'], width: sizeIcons.width + 'px'  }">
          <icon-base :name="icon.value"></icon-base>
        </span>
      </div>

      <div class="b-text-icon__item-col b-text-icon__item-col-text">
        <span v-html="icon.text" v-if="!isActive"/>
        <editor-content class="editor__content" :editor="editor" v-if="isActive"/>
      </div>

    </div>

    <editor-menu-bar :editor="editor" v-if="isActive">
      <div
        class="menubar is-hidden"
        :class="{ 'is-focused': focused }"
        :style=" { 'top': posMenu.top, 'bottom': posMenu.bottom, }"
        slot-scope="{ commands, isActive, focused, getMarkAttrs }"
      >
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click.stop="commands.bold"
        >
          <icon-base name="fontBold" width="14" height="14"></icon-base>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click.stop="commands.italic"
        >
          <icon-base name="fontItalic" width="14" height="14"></icon-base>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon-base name="fontUnderline" width="14" height="14" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon-base name="strike" width="14" height="14" />
        </button>

        <base-button color="blue" size="small" @click.stop="close">
          Done
        </base-button>

      </div>
    </editor-menu-bar>

  </div>
</template>

<script>
import { EditorContent, EditorMenuBar } from 'tiptap'

import textElement from '../mixins/textElement'

export default {
  name: 'IconWithText',

  mixins: [textElement],

  inject: ['$section'],

  components: {
    EditorContent,
    EditorMenuBar
  },

  props: {
    path: {
      type: String
    }
  },
  computed: {
    currentEl () {
      return this.$refs.icon
    },

    refName () {
      return 'icon'
    },

    storeText () {
      return this.settingObjectOptions.icon.text
    },

    storeEl () {
      return this.settingObjectOptions.icon
    },

    savePath () {
      return 'icon.text'
    },

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },

    icon () {
      return this.$section.get(`$sectionData.${this.path}.icon`)
    },
    colorFill () {
      return this.$section.get(`$sectionData.${this.path}.colorFill`)
    },
    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-text-icon
  color: #000
  font-family: 'Lato'
  position: relative
  font-size: 1.4rem
  line-height: 1.4

  display: flex
  justify-content: flex-start
  align-items: flex-start

  color: inherit
  font-family: inherit
  &::selection,
  & ::selection
    color: #ff0
    background: #000
  &__item
    display: flex
    align-items: flex-start
    justify-content: inherit

    padding: 0.8rem 0
    cursor: pointer
    &-col
      padding: 0 0.4rem
      &-icon
        width: 3.2rem
        min-width: 3.2rem
    &-text
      max-width: 100%
  &_hide
    padding: 0 1.6rem
  &__icon
    display: inline-block
    svg
      fill: inherit
      width: 100%
      height: auto

.menubar
  display: flex
  align-items: center
  padding: 0 0.4rem

  position: absolute
  top: -26px
  width: 19rem
  left: calc(50% - 9.5rem)
  z-index: 9999

  background: $white
  border-radius: 2px
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25)

  &__button
    width: $size-step
    height: $size-step/1.5

    display: flex
    justify-content: center
    align-items: center

    background: transparent
    border: none

    color: $grey
    margin: 0.2rem
    svg
      fill: $grey
      width: 14px
      height: 14px

    &:hover,
    &.is-active
      cursor: pointer
      color: $black
      svg
        fill: $black
  &__form
    width: 100%
    height: 100%
    padding: 0 .8rem
    position: absolute
    top: 0
    left: 0
    display: flex
    align-items: center

    background: $white
    border-radius: 4px

  &__input
    width: 28em
    padding: 1rem
    margin-right: 1rem

    border: 1px solid $grey-middle
    border-radius: 4px

</style>
