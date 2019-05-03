<template>
    <div class="b-text is-editable" ref="text">
      <slot v-if="!isActive"></slot>

      <editor-menu-bar :editor="editor" v-if="isActive">
        <div
          class="menubar is-hidden"
          :class="{ 'is-focused': focused }"
          slot-scope="{ commands, isActive, focused, getMarkAttrs }"
        >
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <icon-base name="fontBold" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <icon-base name="fontItalic" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <icon-base name="paragraph" width="14" height="14"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <icon-base name="bulletList"></icon-base>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <icon-base name="orderedList"></icon-base>
          </button>

          <button
            class="menubar__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <icon-base name="link"></icon-base>
          </button>

          <base-button color="blue" size="small" @click="save">Done</base-button>

          <!-- Link form -->
          <form class="menubar__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
            <input class="menubar__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
            <button class="menubar__button" @click="setLinkUrl(commands.link, null)" type="button">
              <icon-base name="remove"></icon-base>
            </button>
          </form>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" v-if="isActive" />
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Italic,
  Heading,
  ListItem,
  OrderedList,
  BulletList,
  HardBreak,
  Link
} from 'tiptap-extensions'
import { merge } from 'lodash-es'

export default {
  name: 'TextElement',

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

  watch: {
    textEditorActive (value) {
      let self = this
      self.text = self.settingObjectOptions.text
      if (value && this.settingObjectElement === this.$refs.text) {
        this.editor = new Editor({
          extensions: [
            new Bold(),
            new Italic(),
            new Heading({ levels: [1, 2, 3] }),
            new ListItem(),
            new OrderedList(),
            new BulletList(),
            new HardBreak(),
            new Link()
          ],
          content: self.settingObjectOptions.text,
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
    }
  },

  computed: {
    ...mapState('Landing', ['textEditorActive']),
    ...mapState('Sidebar', ['settingObjectOptions', 'settingObjectElement'])
  },

  mounted () {

  },

  beforeDestroy () {
    try {
      this.editor.destroy()
      this.hideLinkMenu()
    } catch (e) { }
  },

  methods: {
    ...mapActions('Sidebar', ['updateSettingOptions']),
    ...mapMutations('Landing', ['textEditor']),

    save () {
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { text: this.text }))
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
    }
  }
}
</script>

<style lang="sass">
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

.menubar
  height: 6.4rem
  display: flex
  align-items: center
  padding: 0 8px

  position: absolute
  width: 43rem
  top: -66px
  left: calc(50% - 21.5rem)
  z-index: 9999

  background: $white
  border-radius: 4px
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25)

  &__button
    width: 4rem
    height: 4rem
    display: flex
    justify-content: center
    align-items: center

    background: transparent
    border-radius: 3px
    border: none

    color: $grey-middle

    svg
      fill: $grey-middle
      margin-bottom: 0

    &:hover
      background: rgba($cornflower-blue, .5)

    &.is-active
      color: #000000

      svg
        fill: #000000

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
