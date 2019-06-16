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
import { mapState, mapActions, mapMutations } from 'vuex'
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
  name: 'Form',

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
      height: 0,
      editor: null,
      text: null,
      isActive: false,
      linkUrl: null,
      linkMenuIsActive: false,
      posMenu: {
        top: '-38px',
        bottom: 'auto'
      }
    }
  },

  watch: {
    textEditorActive (value) {
      let self = this

      if (!self.settingObjectOptions.buttonText) {
        return
      }

      self.text = self.settingObjectOptions.buttonText
      if (value && this.settingObjectElement === this.$refs.form) {
        this.editor = new Editor({
          extensions: [
            new Bold(),
            new Italic(),
            new Strike(),
            new Underline(),
            new Heading({ levels: [1, 2, 3] })
          ],
          content: self.settingObjectOptions.buttonText,
          onUpdate (state) {
            self.text = state.getHTML()
          }
        })

        this.isActive = true

        // set focus on text
        this.setTextFocus('form', 'editor__content')
        // set menu position
        this.setPosition()
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
    ...mapState(['currentLanding']),
    ...mapState('Landing', ['textEditorActive']),
    ...mapState('Sidebar', ['settingObjectOptions', 'settingObjectElement']),

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
      'updateSettingOptions'
    ]),

    ...mapMutations('Landing', [
      'textEditor'
    ]),

    save () {
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { buttonText: this.text }))
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

      // stop drop to this container
      this.stopDrop(t1)
    },

    stopDrop (t1) {
      t1.addEventListener('drop', function (e) {
        e.preventDefault()
        return false
      }, true)

      t1.addEventListener('dragover', function (e) {
        e.preventDefault()
        return false
      }, true)
    },

    async setPosition () {
      await this.$nextTick()

      let el = this.$refs.form
      let menu = el.getElementsByClassName('menubar')[0]
      let pos = el.getBoundingClientRect()
      let heightTopbar = document.getElementById('topbar').clientHeight

      if (pos.top < (menu.clientHeight + heightTopbar)) {
        this.posMenu.top = 'auto'
        this.posMenu.bottom = '-38px'
      } else {
        this.posMenu.top = '-38px'
        this.posMenu.bottom = 'auto'
      }
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
