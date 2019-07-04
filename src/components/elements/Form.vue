<template>
  <div class="b-form" @click.stop.stop="" ref="form">

    <slot v-if="!isActive"></slot>

    <form class="b-form-element ptah-form"
      :data-action="$builder.settings.mailchimpUrl"
      method="post"
      target="_blank"
      :style="{
        'background-color' : styles['background-color'],
      }"
      >
      <input
        type="email"
        name="EMAIL"
        required
        :style="{
          'color' : styles['color'],
          'background-color': formStyles['input-color'],
          'font-family' : styles['font-family'],
          'font-size' : styles['font-size'],
          'font-weight' : styles['font-weight'],
          'font-style' : styles['font-style'],
          'text-decoration' : styles['text-decoration']
        }"
        :placeholder="placeholder"
        class="b-form-element-input ptah-input"
        >
      <div class="b-form-element__hidden-input" aria-hidden="true">
        <input type="text" :name="roboCheck" tabindex="-1" value="" class="ptah-valid">
      </div>
      <button type="submit" class="b-form-element-button ptah-submit"
       :style="{
        'color': styles['color'],
        'background-color': formStyles['button-color'],
        'color' : styles['color'],
        'font-family' : styles['font-family'],
        'font-size' : styles['font-size'],
        'font-weight' : styles['font-weight'],
        'font-style' : styles['font-style'],
        'text-decoration' : styles['text-decoration']
       }"
        >
        <span v-html="buttonText" v-if="!isActive"/>
        <editor-content class="editor__content" :editor="editor" v-if="isActive"/>
      </button>

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
    </form>
  </div>
</template>

<script>
import { getParameterByName } from '@editor/util'
import { mapState } from 'vuex'
import { EditorContent, EditorMenuBar } from 'tiptap'

import textElement from '../mixins/textElement'

export default {
  name: 'Form',

  mixins: [textElement],

  inject: ['$section', '$builder'],

  components: {
    EditorContent,
    EditorMenuBar
  },

  props: {
    path: {
      type: String
    }
  },

  data: () => {
    return {
      width: 0,
      height: 0
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    placeholder () {
      return this.$section.get(`$sectionData.${this.path}.placeholder`)
    },

    buttonText () {
      return this.$section.get(`$sectionData.${this.path}.buttonText`)
    },

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },

    formStyles () {
      return this.$section.get(`$sectionData.${this.path}.formStyles`)
    },

    roboCheck () {
      let hash = getParameterByName('u', this.currentLanding.settings.mailchimpUrl)
      let list = getParameterByName('id', this.currentLanding.settings.mailchimpUrl)

      return `b_${hash}_${list}`
    },

    currentEl () {
      return this.$refs.form
    },

    refName () {
      return 'form'
    },

    storeText () {
      return this.settingObjectOptions.buttonText
    },

    storeEl () {
      return this.settingObjectOptions
    },

    savePath () {
      return 'buttonText'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-form-element
  display: flex
  align-items: center
  justify-content: center

  width: 100%
  padding: 0.4rem 0.8rem
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08)

  position: relative
  .is-mobile &,
  .is-tablet &
    flex-direction: column
  @media only screen and (max-width: 768px)
    &
      flex-direction: column

  &__hidden-input
    position: absolute
    left: -5000px

  &-button
    max-width: 50%
    height: 4.8rem
    margin: 0.2rem

    font-size: 1.6rem
    word-break: keep-all
    overflow: hidden

    padding: 0 2rem
    border-radius: 0.2rem
    border: none

    font-family: 'Lato', sans-serif

    transition: all ease-out .4s
    position: relative
    &.submited
      background-color: $emerald-green
    .is-mobile &,
    .is-tablet &
      width: 100%
      min-width: auto
      max-width: 100%
      margin-left: 0
    @media only screen and (max-width: 768px)
      &
        width: 100%
        min-width: auto
        max-width: 100%
        margin-left: 0

  &-input
    border: none
    background: #fff
    color: #2a2a2a
    border-radius: 0.2rem
    padding: 1rem
    .is-mobile &,
    .is-tablet &
      width: 100%
      max-width: 100%
      margin-bottom: 1rem
    @media only screen and (max-width: 768px)
      &
        width: 100%
        max-width: 100%
        margin-bottom: 1rem

.menubar
  display: flex
  align-items: center
  padding: 0 0.4rem

  position: absolute
  top: -38px
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
