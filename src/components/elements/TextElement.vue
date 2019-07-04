<template>
  <div class="b-text is-editable" ref="text" @click.stop.stop="">

    <slot v-if="!isActive"></slot>

    <editor-menu-bar :editor="editor" v-if="isActive && !hideMenubar">
      <div
        class="menubar is-hidden"
        :class="{ 'is-focused': focused, 'is-only-styles': isOnlyStyles }"
        :style=" { 'top': posMenu.top, 'bottom': posMenu.bottom, }"
        slot-scope="{ commands, isActive, focused, getMarkAttrs }"
      >
        <template v-if="textOptions.styles">
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
            <icon-base name="strike" width="20" height="20" />
          </button>
        </template>

        <template v-if="textOptions.tags">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click.stop="commands.paragraph"
          >
            <icon-base name="paragraph" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click.stop="setHeading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click.stop="setHeading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click.stop="setHeading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click.stop="setList('bullet', 'ordered')"
          >
            <icon-base name="bulletList"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click.stop="setList('ordered', 'bullet')"
          >
            <icon-base name="orderedList"></icon-base>
          </button>
        </template>

        <template v-if="textOptions.link">
          <button
            class="menubar__button"
            @click.stop="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <icon-base name="link"></icon-base>
          </button>
        </template>

        <base-button color="blue" size="small" @click.stop="close">
          Done
        </base-button>

        <!-- Link form -->
        <form class="menubar__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input class="menubar__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="menubar__button" @click.stop="setLinkUrl(commands.link, null)" type="button">
            <icon-base name="remove"></icon-base>
          </button>
          <base-button class="menubar__button" color="blue" size="small" @click.stop="setLinkUrl(commands.link, linkUrl)">
            Done
          </base-button>
        </form>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" v-if="isActive"/>
  </div>
</template>

<script>
import { EditorContent, EditorMenuBar } from 'tiptap'

import textElement from '../mixins/textElement'

export default {
  name: 'TextElement',

  mixins: [textElement],

  components: {
    EditorContent,
    EditorMenuBar
  },

  computed: {
    textOptions () {
      return this.settingObjectOptions.editor
    },

    isOnlyStyles () {
      return this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    hideMenubar () {
      return !this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    currentEl () {
      return this.$refs.text
    },

    refName () {
      return 'text'
    },

    storeText () {
      return this.settingObjectOptions.text
    },

    storeEl () {
      return this.settingObjectOptions
    },

    savePath () {
      return 'text'
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-text
  color: #000

  font-family: 'Lato'
  font-size: 1.4rem
  line-height: 1.4
  text-align: center

  position: relative
  display: block

  &::selection, & ::selection
    color: #ff0
    background: #000
  ul,
  ol
    margin: 0
    padding: 0 1em

.menubar
  display: flex
  align-items: center
  padding: 0 0.4rem

  position: absolute
  top: -38px
  width: 43rem
  left: calc(50% - 21.5rem)
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
    border-radius: 2px
    border: none

    color: $grey
    margin: 0.2rem
    svg
      fill: $grey
      margin-bottom: 0

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
  &.is-only-styles
    width: 20rem
    left: calc(50% - 10rem)
</style>
