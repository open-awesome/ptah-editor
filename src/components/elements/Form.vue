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

        <span class="menubar__close" @click.stop="close">
          <icon-base name="close" width="14" height="14" />
        </span>

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

</style>
