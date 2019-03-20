<template>
  <div class="b-styler is-editable"
       ref="styler"
       id="styler"
       v-if="$builder.isEditing"
       :class="{ 'is-visible': isVisible && !editText }"
       @click.stop="">

    <div class="b-styler__controls">
      <!-- Button -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Button')"  v-if="type === 'button'">
        <icon-base name="style" width="12" height="15" />
      </a>

      <!-- Text -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Text')"  v-if="type === 'text'">
        <icon-base name="style" width="12" height="15" />
      </a>

      <!-- Text editor -->
      <a href="#" class="b-styler__control" @click.stop="editText = true" v-if="type === 'text'">
        <icon-base name="edit" width="12" height="15" />
      </a>

      <!-- Inline text -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('InlineText')" v-if="type === 'inline'">
        <icon-base name="cog" width="12" height="15" />
      </a>

      <!-- Social settings -->
      <template v-if="type === 'networks'">
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('SocialSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('SocialStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Available platforms -->
      <a href="#" class="b-styler__control"
         @click.stop="setControlPanel('AvailablePlatforms')"
         v-if="type === 'available'">
        <icon-base name="settings" width="16" height="16" />
      </a>

      <!-- Age restrictions -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Restrictions')" v-if="type === 'restrictions'">
        <icon-base name="settings" width="16" height="16" />
      </a>

      <!-- Timer -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('TimerSettings')" v-if="type === 'timer'">
        <icon-base name="settings" width="16" height="16" />
      </a>

      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Image')" v-if="type === 'image'">
        <icon-base name="preview" width="14" height="16" />
      </a>

    </div>

    <!-- Delete element -->
    <div class="b-styler__controls">
      <a href="#" class="b-styler__delete" title="delete" @click.stop="removeElement">
        <icon-base name="close" width="10" height="10"></icon-base>
      </a>
    </div>

  </div>
</template>

<script>
import { isParentTo, randomPoneId, getPseudoTemplate } from '../util'
import * as _ from 'lodash-es'
import { mapMutations, mapActions, mapState } from 'vuex'
import Popper from 'popper.js'

export default {
  name: 'Styler',
  props: {
    el: {
      required: true,
      validator: function (value) {
        return (
          typeof HTMLElement === 'object' ? value instanceof HTMLElement
            : value && typeof value === 'object' && value !== null && value.nodeType === 1 &&
              typeof value.nodeName === 'string'
        )
      }
    },
    type: {
      // @todo fix it properly
      // Somewhere deep inside there is undefined value passed through
      // causing String type check to fail
      // type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    section: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    label: String
  },
  data: () => ({
    isCurrentStyler: false,
    currentOption: '',
    title: '',
    gridValue: 0,
    isVisible: false,
    dimensions: {
      width: null,
      height: null
    },
    proportions: null,
    keepProportions: true,
    showPseudoBg: false,
    pseudoStyles: {},
    animation: { name: 'none', className: '' },
    animationList: [
      { name: 'none', className: '' },
      { name: 'tada', className: 'ptah-a-tada' },
      { name: 'fade', className: 'ptah-a-fade' },
      { name: 'shake', className: 'ptah-a-shake' },
      { name: 'bounce', className: 'ptah-a-bounce' }
    ]
  }),
  computed: {
    ...mapState('Sidebar', ['sandbox', 'settingObjectOptions']),
    ...mapState('Landing', ['textEditorActive']),

    // find path to element
    path () {
      let path = _.split(this.name, '.')[1]
      return _.toPath(path)
    },
    components: {
      set (value) {
        this.section.set(this.sandbox.components, value)
      },
      get () {
        return this.section.get(this.sandbox.components) || []
      }
    },
    editText: {
      set (value) {
        this.textEditor(value)
      },

      get () {
        return this.textEditorActive
      }
    }
  },

  created () {
    this.dimensions.width = this.el.offsetWidth
    this.dimensions.height = this.el.offsetHeight
  },
  mounted () {
    if (this.$builder && !this.$builder.isEditing) return

    this.el.addEventListener('click', this.showStyler)

    if (this.type === 'section') {
      this.el.id = `section_${this.section.id}`
    }

    // this.setInitialValue()

    // Restoring from a snapshot
    // to apply the pseudoclass to the element
    if (!!this.options.pseudo && Object.keys(this.options.pseudo).length) {
      _.forEach(this.options.pseudo, (styles, pseudo) => {
        this.changePseudoStyle(styles, pseudo)
      })
    }

    // Apply animation to element
    if (this.options.classes !== undefined && this.options.classes.length) {
      this.options.classes.forEach((name, index) => {
        if (name.indexOf('ptah-a-') > -1) {
          this.animation = _.find(this.animationList, ['className', name])
        }

        if (name.indexOf('ptah-d-video') > -1) {
          this.el.dataset.video = this.options.video
        }
      })
    }

    if (this.options.video) {
      this.el.classList.add('ptah-d-video')
      this.el.dataset.video = this.options.video
    }

    this.proportions = Math.min(this.el.offsetWidth / this.el.offsetHeight)
  },
  beforeDestroy () {
    this.hideStyler()
    this.$refs.styler.remove()
    this.el.classList.remove('is-editable')
    this.el.removeEventListener('click', this.showStyler)
    document.removeEventListener('click', this.hideStyler, true)
  },
  methods: {
    ...mapMutations('Sidebar', ['setSandboxPaths']),
    ...mapMutations('Landing', ['textEditor']),
    ...mapActions('Sidebar', ['setSettingElement', 'clearSettingObjectLight', 'setControlPanel']),
    ...mapActions('BuilderModalContent', ['setContent']),

    showStyler (event) {
      console.log('show', this.type)
      event.preventDefault()
      event.stopPropagation()

      if (this.type !== 'section') this.setControlPanel(false)
      this.clearSettingObjectLight()

      let autoSizing = (data) => {
        data.offsets.popper.left = data.offsets.reference.left
        data.styles.width = this.dimensions.width
        return data
      }

      // show inline styler
      if (!this.popper && this.type !== 'section') {
        this.$nextTick(function () {
          this.popper = new Popper(this.el, this.$refs.styler, {
            placement: 'top',
            modifiers: {
              autoSizing: {
                enabled: true,
                fn: autoSizing,
                order: 840
              }
            }
          })
        })
      }

      if (this.isCurrentStyler) {
        this.isCurrentStyler = false
        return
      }

      // --- clear active classes
      document.querySelectorAll('.b-draggable-slot.active')
        .forEach(el => el.classList.remove('active'))

      this.setContent(null)

      if (this.isVisible) return
      this.isVisible = true

      setTimeout(() => {
        if (this.$props.type === 'section') {
          // Do not show section settings on click
          // this.setSettingSection(this.section)
        } else {
          // --- if section has components or slots
          let keys = Object.keys(this.section.data)
          let hasSlotsData = (
            keys.some(key => Boolean(~key.indexOf('components'))) ||
            keys.some(key => Boolean(~key.indexOf('container')))
          )
          if (hasSlotsData) {
            let target = event.target.closest('.b-draggable-slot')
            if (target) {
              target.classList.add('active')
            }
            // --- TODO: bad idea
            // --- fix in future
            // --- coz data storage is unstable
            let match = this.path[0].match(/\d+(?!\d+)/)
            let index = (match) ? match[0] : ''
            this.setSandboxPaths({
              components: `$sectionData.components${index}`,
              container: `$sectionData.container${index}`
            })
          }
          this.setSettingElement({
            type: this.$props.type, // TODO: $props.type !== type ?
            label: this.$props.label,
            name: this.name,
            options: _.get(this.section.data, this.path).element || this.options,
            section: this.section,
            element: this.el
          })
          this.el.classList.add('styler-active')
          // --- rm class/es from menu items
          document
            .querySelectorAll('.b-menu-subitem_selected')
            .forEach(el => el.classList.remove('b-menu-subitem_selected'))
        }
      }, 0)

      document.addEventListener('click', this.hideStyler, true)
    },
    hideStyler (event) {
      const evPath = event ? event.path || (event.composedPath && event.composedPath()) : []
      const stopNames = [
        'b-styler__control',
        'b-control-panel',
        'menubar__button',
        'editor__content',
        'menubar is-hidden'
      ]

      if (event && (event.target === this.el
        || this.checkStylerNodes(evPath, stopNames))) {
        this.isCurrentStyler = true
        return
      }

      if (event && isParentTo(event.target, this.$el)) {
        return
      }

      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }

      this.setControlPanel(false)

      this.el.contentEditable = 'false'
      this.el.classList.remove('styler-active')

      this.isVisible = false
      this.editText = false

      document.removeEventListener('click', this.hideStyler, true)
      document.removeEventListener('blur', this.hideStyler, true)
    },

    checkStylerNodes (path, classes) {
      let m = false
      classes.forEach((className) => {
        if (Array.from(path).filter((el) => el.className === className).length) m = true
      })
      return m
    },

    /**
     * Add style to pseudocalss
     * @param style {object}
     * @param pseudoClass {string}
     */
    changePseudoStyle (style, pseudoClass = 'hover') {
      let poneId = ''
      let pseudoClassValue = {}
      pseudoClassValue[pseudoClass] = style
      poneId = randomPoneId()
      this.el.dataset.pone = poneId
      _.merge(this.pseudoStyles, pseudoClassValue)
      this.options.pseudo = this.pseudoStyles

      let styleTemplate = getPseudoTemplate(poneId, this.pseudoStyles)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    /**
     * Remove
     * @param index
     */
    removeElement () {
      let index = this.path[1]
      this.components.splice(index, 1)
      this.clearSettingObjectLight()
      this.hideStyler()
    }
  }
}
</script>

<style lang="sass">
.b-styler
  display: none
  justify-content: space-between
  align-items: flex-start
  height: 4rem
  z-index: 20

  &.is-visible
    display: flex

  &__controls
    display: flex

  &__control
    width: 3.2rem
    height: 3.2rem
    display: flex
    align-items: center
    justify-content: center

    border-radius: 50%
    background: $white
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)
    margin-right: .4rem

    svg
      fill: $dark-blue-krayola
      margin-bottom: 0

    &:hover, .active
      background: $dark-blue-krayola

      svg
        fill: $white
        margin-bottom: 0

  &__delete
    width: 3.2rem
    height: 3.2rem
    display: flex
    align-items: center
    justify-content: center

    border-radius: 50%
    background: rgba(82, 105, 166, 0.25)

    &:hover, .active
      background: $dark-blue-krayola

    svg
      fill: $white
      margin-bottom: 0
</style>
