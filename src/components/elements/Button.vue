<template>
  <div class="b-button is-editable" ref="btn" @click.stop.stop="">

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

    <editor-content class="editor__content" ref="editor" :editor="editor" v-if="isActive"/>

    <vue-draggable-resizable
      v-if="!isActive"
      class="b-button__resize"
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
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Italic,
  Strike,
  Underline,
  Heading
} from 'tiptap-extensions'
import { merge } from 'lodash-es'

export default {
  name: 'Button',

  inject: ['$section'],

  components: {
    EditorContent,
    EditorMenuBar,
    VueDraggableResizable
  },

  data: () => {
    return {
      width: 0,
      height: 0,
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
      self.text = self.settingObjectOptions.text
      if (value && this.settingObjectElement === this.$refs.btn) {
        this.editor = new Editor({
          extensions: [
            new Bold(),
            new Italic(),
            new Strike(),
            new Underline(),
            new Heading({ levels: [1, 2, 3] })
          ],
          content: self.settingObjectOptions.text,
          onUpdate (state) {
            self.text = state.getHTML()
          }
        })

        this.isActive = true

        // set focus on text
        this.setTextFocus('btn', 'editor__content')
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
    }
  },

  beforeDestroy () {
    try {
      this.editor.destroy()
      this.hideLinkMenu()
    } catch (e) { }
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleShowStyler',
      'toggleResizeStop',
      'updateSettingOptions'
    ]),
    ...mapMutations('Landing', ['textEditor']),

    onResize (x, y, width, height) {
      this.$section.set(`$sectionData.${this.path}.styles.width`, width + 'px')
      this.$section.set(`$sectionData.${this.path}.styles.height`, height + 'px')

      this.toggleShowStyler(false)
    },

    onResizeStop (x, y, width, height) {
      this.toggleShowStyler(true)
      this.toggleResizeStop(true)
    },

    save () {
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { text: this.text }))
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

    async setTextFocus (refName, getEl) {
      let self = this

      await this.$nextTick()

      let t = self.$refs[refName].getElementsByClassName(getEl)
      let t1 = t[0].firstChild
      t1.focus()
    }
  },

  created () {
    this.width = parseInt(this.styles.width.split('px')[0]) || 320
    this.height = parseInt(this.styles.height.split('px')[0]) || 60
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

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
  transition: background-color, border 200ms
  & .contenteditable
    position: relative
    z-index: 9999
  &__resize
    display: none
    border: none !important

    top: -0.4rem !important
    right: -0.4rem !important
    bottom: -0.4rem !important
    left: -0.4rem !important

    border-radius: 0.5rem
    width: auto !important
    height: auto !important
    &_active
      border: 0.2rem dotted $white !important
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
  &.is-editable
    .styler-active
      border-color: $white
    #{$self}__resize
      display: block
      .is-mobile &,
      .is-tablet &
        display: none
  & span
    display: block
  .is-mobile &,
  .is-tablet &
    max-width: 90% !important
    margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px)
    &
      max-width: 90% !important
      margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px) and (min-height: 700px)
    &
      max-width: 60% !important
      margin: $size-step/2 auto !important
/deep/
  .b-handle
    position: absolute !important

    background: $dark-blue-krayola !important
    border: 0.2rem solid $white !important
    box-sizing: border-box !important
    box-shadow: 0px 2px 2px rgba($black, 0.15) !important
    border-radius: 1px !important

    height: $size-step/4 !important
    width: $size-step/4 !important

    transition: all 300ms linear !important
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
    &-tl
      top: -$size-step/8
      left: -$size-step/8
      cursor: nw-resize
    &-tm
      top: -$size-step/8
      left: 50%
      margin-left: -$size-step/16
      cursor: n-resize
    &-tr
      top: -$size-step/8
      right: -$size-step/8
      cursor: ne-resize
    &-ml
      top: 50%
      margin-top: -$size-step/16
      left: -$size-step/8
      cursor: w-resize
    &-mr
      top: 50%
      margin-top: -$size-step/16
      right: -$size-step/8
      cursor: e-resize
    &-bl
      bottom: -$size-step/8
      left: -$size-step/8
      cursor: sw-resize
    &-bm
      bottom: -$size-step/8
      left: 50%
      margin-left: -$size-step/16
      cursor: s-resize
    &-br
      bottom: -$size-step/8
      right: -$size-step/8
      cursor: se-resize
    &-tl:hover,
    &-tr:hover,
    &-bl:hover,
    &-br:hover
      transform: scale(1.4)

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
