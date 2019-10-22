<template>
  <a class="b-button is-editable" ref="btn"
     @click.stop.prevent
     :path="path"
     :style="[objVarsMedia, objVarsResize, objVarsTypo]"
    >

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
            @click.stop.prevent="commands.bold"
           >
            <icon-base name="fontBold" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click.stop.prevent="commands.italic"
          >
            <icon-base name="fontItalic" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click.stop.prevent="commands.underline"
          >
            <icon-base name="fontUnderline" width="14" height="14" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click.stop.prevent="commands.strike"
          >
            <icon-base name="strike" width="20" height="20" />
          </button>
        </template>

        <template v-if="textOptions.tags">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click.stop.prevent="commands.paragraph"
          >
            <icon-base name="paragraph" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click.stop.prevent="setHeading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click.stop.prevent="setHeading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click.stop.prevent="setHeading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click.stop.prevent="setList('bullet', 'ordered')"
          >
            <icon-base name="bulletList"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click.stop.prevent="setList('ordered', 'bullet')"
          >
            <icon-base name="orderedList"></icon-base>
          </button>
        </template>

        <template v-if="textOptions.link">
          <button
            class="menubar__button"
            @click.stop.prevent="showLinkMenu(getMarkAttrs('link'))"
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

    <editor-content class="editor__content" ref="editor" :editor="editor" v-if="isActive"/>

    <vue-draggable-resizable
      class="b-button__resize b-resize"
      class-name-active="b-button__resize_active"
      class-name-handle="b-handle"
      :w="width"
      :h="height"
      :min-width="32"
      :min-height="32"
      :max-height="320"
      @resizing="onResize"
      @resizestop="onResizeStop"
      :draggable="false"
      :z="999"
      />
    <!-- Keep aspect ratio using :lock-aspect-ratio="true" prop. -->
  </a>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { EditorContent, EditorMenuBar } from 'tiptap'
import textElement from '../mixins/textElement'
import elementMedia from '../mixins/elementMedia'
import elementResize from '../mixins/elementResize'

export default {
  name: 'Button',

  mixins: [
    textElement,
    elementMedia,
    elementResize
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
    ...mapState('Landing', ['textEditorActive']),
    ...mapState('Sidebar', ['settingObjectOptions']),

    currentEl () {
      return this.$refs.btn
    },

    refName () {
      return 'btn'
    },

    storeText () {
      return this.settingObjectOptions.text
    },

    storeEl () {
      return this.settingObjectOptions
    },

    savePath () {
      return 'text'
    },

    textOptions () {
      return this.settingObjectOptions.editor
    },

    isOnlyStyles () {
      return this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    },

    hideMenubar () {
      return !this.textOptions.styles && !this.textOptions.tags && !this.textOptions.link
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ])
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'
@import '../../assets/sass/_menubar.sass'
@import '../../assets/sass/element.sass'
@import '../../assets/sass/element-resize.sass'

.b-button
  $self: &
  position: relative

  font-size: 3rem
  font-family: 'Lato'
  line-height: 1.4
  text-decoration: none
  color: $black

  box-sizing: border-box
  width: $size-step*5

  max-width: 100% !important
  max-height: 100% !important

  min-width: $size-step*2
  min-height: $size-step/2

  padding: 0 $size-step/2

  background-color: #a7a1a1

  display: flex
  text-align: center
  justify-content: center
  flex-direction: column

  user-select: none
  cursor: pointer
  transition: background 200ms, border 200ms
  & .contenteditable
    position: relative
    z-index: 9999
  &.is-editable
    .styler-active
      border-color: $white
  & span
    display: block
  .is-mobile &,
  .is-tablet &
    margin: $size-step/2 auto
  @media only screen and (max-width: 768px)
    &
      margin: $size-step/2 auto

</style>
