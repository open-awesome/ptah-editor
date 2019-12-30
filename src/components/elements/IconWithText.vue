<template>
  <div class="b-text-icon is-editable b-border"
    :class="{ 'b-text-icon_hide': !icon.visible }"
    ref="icon"
    @click.stop.stop=""
    :path="path"
    :style="[objVarsMedia, objVarsTypo]"
    >

    <slot v-if="!isActive"></slot>

    <div class="b-text-icon__item">
      <div class="b-text-icon__item-col b-text-icon__item-col-icon" v-if="icon.visible"
        :style="{
          '--mobile-width': mediaSizeIcons['width'] + 'px'
        }"
        >
        <span class="b-text-icon__icon" :style="{
          fill: colorFill['color'],
          width: sizeIcons.width + 'px'
        }">
          <icon-base :name="icon.value"></icon-base>
        </span>
      </div>

      <div class="b-text-icon__item-col b-text-icon__item-col-text">
        <span v-html="icon.text" v-if="!isActive"/>
        <editor-content class="editor__content" :editor="editor" v-if="isActive"/>
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
import { EditorContent, EditorMenuBar } from 'tiptap'
import elementMedia from '../mixins/elementMedia'
import textElement from '../mixins/textElement'

export default {
  name: 'IconWithText',

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

    textOptions () {
      return this.settingObjectOptions.editor
    },

    isOnlyStyles () {
      return this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    hideMenubar () {
      return !this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    icon () {
      return this.$section.get(`$sectionData.${this.path}.icon`)
    },

    colorFill () {
      return this.$section.get(`$sectionData.${this.path}.colorFill`)
    },

    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    },
    mediaSizeIcons () {
      let media = this.$section.get(`$sectionData.${this.path}.media['is-mobile']['sizeIcons']`)

      if (media === undefined) {
        media = {
          'is-mobile': {
            sizeIcons: this.sizeIcons
          }
        }
        this.$section.set(`$sectionData.${this.path}.media`, media)
      }

      return media
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
