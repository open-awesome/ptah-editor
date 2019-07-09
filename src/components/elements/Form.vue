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

    textOptions () {
      return this.$section.get(`$sectionData.${this.path}.editor`)
    },

    isOnlyStyles () {
      return this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    hideMenubar () {
      return !this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
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

</style>
