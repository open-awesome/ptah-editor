import { mapState, mapActions, mapMutations } from 'vuex'
import { Editor } from 'tiptap'
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
import { merge, set } from 'lodash-es'

export default {
  data () {
    return {
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

      if (!self.storeEl) {
        return
      }

      self.text = self.storeText
      if (value && this.settingObjectElement === this.currentEl) {
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
          content: self.storeText,
          onUpdate (state) {
            self.text = state.getHTML()
          }
        })

        this.isActive = true

        // set focus on text
        this.setTextFocus('editor__content')
        // set menu position
        this.setPosition()
      } else {
        if (this.editor !== null) this.editor.destroy()
        this.hideLinkMenu()
        this.isActive = false
      }
    },

    text () {
      this.save()
    }
  },

  computed: {
    ...mapState('Landing', ['textEditorActive']),
    ...mapState('Sidebar', ['settingObjectOptions', 'settingObjectElement'])
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
      this.updateSettingOptions(merge({}, this.settingObjectOptions, set({}, this.savePath, this.text)))
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

    async setTextFocus (getEl) {
      let self = this

      await this.$nextTick()

      let t = self.$refs[this.refName].getElementsByClassName(getEl)
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

      let el = this.currentEl
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
