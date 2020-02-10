<template>
  <div
    data-toggle-element=""
    class="b-toggle-element is-editable b-border"
    ref="toggleEl"
    @click.stop.stop=""
    :path="path"
    :style="[objVarsMedia, objVarsTypo]"
    >

    <div class="b-toggle-element__item"
      >
      <div class="b-toggle-element__item-col b-toggle-element__item-col-icon" v-if="el.isIconVisible"
        >
        <span class="b-toggle-element__icon"
          :style="{
            fill: el.color,
            width: sizeIcons.width + 'px',
            'margin-top':  sizeIcons.width/4 + 'px',
            '--mobile-toggle-el-width': mediaStyles['is-mobile']['sizeIcons']['width'] + 'px',
            '--mobile-toggle-el--margin-top': mediaStyles['is-mobile']['sizeIcons']['width']/4 + 'px'
          }"
          @click="toggle">
          <icon-base :name="el.icon.value"/>
        </span>
      </div>
      <div data-toggle-element-text="" class="b-toggle-element__item-col b-toggle-element__item-col-content"
        :class="{ 'b-toggle-element__item-col-content_hide-text': !el.isTextVisible }"
        :style="{
          '--text-align': styles['text-align'],
          '--font-size': styles['font-size'],
          '--font-style': styles['font-style'],
          '--line-height': styles['line-height'],
          '--color': styles['color']
        }"
        >
        <div v-html="el.content" v-if="!isActive"/>
        <editor-content class="editor__content" :editor="editor" v-if="isActive" />
      </div>
    </div>

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
  </div>
</template>

<script>
import { merge } from 'lodash-es'
import { EditorContent, EditorMenuBar } from 'tiptap'
import elementMedia from '../mixins/elementMedia'
import textElement from '../mixins/textElement'

export default {
  name: 'ToggleElement',

  mixins: [
    elementMedia,
    textElement
  ],

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
      return this.$refs.toggleEl
    },

    refName () {
      return 'toggleEl'
    },

    storeText () {
      return this.settingObjectOptions.el.content
    },

    storeEl () {
      return this.settingObjectOptions.el
    },

    savePath () {
      return 'el.content'
    },

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },

    el () {
      return this.$section.get(`$sectionData.${this.path}.el`)
    },

    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    },

    textOptions () {
      return this.$section.get(`$sectionData.${this.path}.editor`)
    },

    isOnlyStyles () {
      return this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    hideMenubar () {
      return !this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    }
  },

  methods: {
    toggle () {
      let visible = !this.el.isTextVisible

      this.updateSettingOptions(merge({}, this.settingObjectOptions, { el: { isTextVisible: visible } }))
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
