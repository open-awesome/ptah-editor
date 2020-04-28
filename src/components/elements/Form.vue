<template>
  <div class="b-form b-border" @click.stop.stop="" ref="form"
    :path="path"
    :style="[objVarsMedia, objVarsTypo]"
    @mouseleave="mouseleave"
    @mouseover.stop="mouseover"
  >

    <slot v-if="!isActive"></slot>

    <form class="b-form-element ptah-form"
      :data-action="$builder.settings.mailchimpUrl"
      method="post"
      target="_blank"
      :style="{
        '--b-hover-color': formStyles.buttonHoverColor,
        '--b-hover-text-color': formStyles.buttonTextHoverColor,
        '--mobile-form-styles-height': mediaStyles['is-mobile'].formStyles.height + 'px'
      }"
      >
      <input
        type="email"
        name="EMAIL"
        required
        :style="{
          'color' : styles['color'],
          'font-size' : styles['font-size'],
          'font-weight' : styles['font-weight'],
          'font-style' : styles['font-style'],
          'text-decoration' : styles['text-decoration'],
          'height': `${formStyles.height}px`,
          'background-color': `${formStyles.inputBgColor}`,
        }"
        :placeholder="placeholder"
        class="b-form-element-input ptah-input"
        >
      <div class="b-form-element__hidden-input" aria-hidden="true">
        <input type="text" :name="roboCheck" tabindex="-1" value="" class="ptah-valid">
      </div>
      <button type="submit" class="b-form-element-button ptah-submit"
       @click.prevent
       :style="{
        'color': `${formStyles.buttonTextColor}`,
        'background-color': formStyles['button-color'],
        'border-radius': `${formStyles['border-radius']}px`,
        'font-size' : styles['font-size'],
        'font-weight' : styles['font-weight'],
        'font-style' : styles['font-style'],
        'text-decoration' : styles['text-decoration'],
        'height': `${formStyles.height}px`
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
              @click.stop="$_setHeading({ level: 1 })"
              >
              H1
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click.stop="$_setHeading({ level: 2 })"
              >
              H2
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click.stop="$_setHeading({ level: 3 })"
              >
              H3
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click.stop="$_setList('bullet', 'ordered')"
              >
              <icon-base name="bulletList"></icon-base>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click.stop="$_setList('ordered', 'bullet')"
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
          <form class="menubar__form" v-if="linkMenuIsActive" @submit.prevent="$_setLinkUrl(commands.link, linkUrl)">
            <input class="menubar__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="$_hideLinkMenu"/>
            <button class="menubar__button" @click.stop="$_setLinkUrl(commands.link, null)" type="button">
              <icon-base name="remove"></icon-base>
            </button>
            <base-button class="menubar__button" color="blue" size="small" @click.stop="$_setLinkUrl(commands.link, linkUrl)">
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
import elementMedia from '../mixins/elementMedia'
import textElement from '../mixins/textElement'
import elementHover from '../mixins/elementHover'

export default {
  name: 'Form',

  mixins: [
    elementMedia,
    textElement,
    elementHover
  ],

  inject: ['$builder'],

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
</style>
