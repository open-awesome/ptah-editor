<template>
  <div
    data-toggle-element=""
    class="b-toggle-element is-editable"
    ref="toggleEl"
    :style="{ 'justify-content': styles['justify-content'] }"
    @click.stop.stop=""
    >

    <div class="b-toggle-element__item is-editable"
      >
      <div class="b-toggle-element__item-col b-toggle-element__item-col-icon" v-if="el.isIconVisible"
        >
        <span class="b-toggle-element__icon" :style="{ fill: el.color, width: el.size + 'px'  }" @click="toggle">
          <icon-base :name="el.icon.value"/>
        </span>
      </div>
      <div data-toggle-element-text="" class="b-toggle-element__item-col b-toggle-element__item-col-content"
        :class="{ 'b-toggle-element__item-col-content_hide-text': !el.isTextVisible }"
        >
        <div v-html="el.content" v-if="!isActive"/>
        <editor-content class="editor__content" :editor="editor" v-if="isActive" />
      </div>
    </div>

    <editor-menu-bar :editor="editor" v-if="isActive && !hideMenubar">
      <div
        class="menubar is-hidden"
        :class="{ 'is-focused': focused, 'is-only-styles': isOnlyStyles }"
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
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Italic,
  Strike,
  Underline,
  Heading,
  ListItem,
  OrderedList,
  BulletList,
  HardBreak,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from 'tiptap-extensions'

export default {
  name: 'ToggleElement',

  inject: ['$section'],

  components: {
    EditorContent,
    EditorMenuBar
  },

  data () {
    return {
      editor: null,
      text: null,
      isActive: false,
      linkUrl: null,
      linkMenuIsActive: false
    }
  },

  props: {
    path: {
      type: String
    }
  },

  watch: {
    textEditorActive (value) {
      let self = this

      if (!self.settingObjectOptions.el) {
        return
      }

      self.text = self.settingObjectOptions.el.content
      if (value && this.settingObjectElement === this.$refs.toggleEl) {
        this.editor = new Editor({
          extensions: [
            new Bold(),
            new Italic(),
            new Strike(),
            new Underline(),
            new Heading({ levels: [1, 2, 3] }),
            new ListItem(),
            new OrderedList(),
            new BulletList(),
            new HardBreak(),
            new Link(),
            new Table({ resizable: true }),
            new TableHeader(),
            new TableCell(),
            new TableRow()
          ],
          content: self.settingObjectOptions.el.content,
          onUpdate (state) {
            self.text = state.getHTML()
          }
        })

        this.isActive = true
      } else {
        if (this.editor !== null) this.editor.destroy()
        this.hideLinkMenu()
        this.isActive = false
      }
    },

    text (value) {
      this.save()
    }
  },

  computed: {
    ...mapState('Landing', ['textEditorActive']),
    ...mapState('Sidebar', ['settingObjectOptions', 'settingObjectElement']),

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },

    el () {
      return this.$section.get(`$sectionData.${this.path}.el`)
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
    ...mapActions('Sidebar', ['updateSettingOptions']),
    ...mapMutations('Landing', ['textEditor']),

    save () {
      this.$section.set(`$sectionData.${this.path}.el.content`, this.text)
    },

    close () {
      this.textEditor(false)
    },

    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },

    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },

    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },

    setList (oldList, newList) {
      if (this.editor.isActive.heading()) {
        this.editor.commands.heading()
      }

      if (this.editor.isActive[`${newList}_list`]()) {
        this.editor.commands[`${newList}_list`]()

        this.$nextTick(function () {
          this.editor.commands[`${oldList}_list`]()
        })
      } else {
        this.editor.commands[`${oldList}_list`]()
      }
    },

    setHeading (obj) {
      this.resetList('bullet')
      this.resetList('ordered')
      this.editor.commands.heading(obj)
    },

    resetList (list) {
      if (this.editor.isActive[`${list}_list`]()) {
        this.editor.commands[`${list}_list`]()
      }
    },

    toggle () {
      let visible = !this.el.isTextVisible

      this.$section.set(`$sectionData.${this.path}.el.isTextVisible`, visible)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-toggle-element
  width: 100%
  position: relative
  text-align: left
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
      &-content
        max-width: 100%
        &_hide-text
          /deep/
            table > tbody > tr:last-child
              display: none
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
