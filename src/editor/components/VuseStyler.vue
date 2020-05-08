<template>
  <div class="b-styler is-editable"
    ref="styler"
    id="styler"
    v-if="$builder.isEditing"
    :class="[
      { 'is-visible': isVisible && !editText },
      { 'is-show-modal': isShowModal || isShowModalButton}
    ]"
    @click.stop=""
    :path="`${name}-${section.id}`"
  >

    <div class="b-styler__controls"
      :class="[
        { '_hover-del': hoverBy === 'element-del'}
      ]"
    >
      <!-- Button -->
      <template v-if="type === 'button'">

        <a href="#" class="b-styler__control"
           @click.stop="setPanels('Button', true)"
          >
          <icon-base name="edit" width="12" height="15" />
        </a>

        <a href="#" class="b-styler__control"
           @click.stop="toggleModalButton" ref="modalProps">
          <icon-base name="link" width="18" height="18" />
        </a>
      </template>

      <!-- Text element -->
      <template v-if="type === 'text'">
        <a href="#" class="b-styler__control b-styler__control_text"
          @click.stop="setPanels('Text', true)"
          >
          <icon-base name="edit" width="12" height="15" />
        </a>
      </template>

      <!-- Inline text -->
      <a href="#" class="b-styler__control"
         @click.stop="setPanels(false, true)"
         v-if="type === 'inline'">
        <icon-base name="edit" width="12" height="15" />
      </a>

      <!-- Networks settings -->
      <template v-if="type === 'networks'">
        <a href="#" class="b-styler__control"
           @click.stop="setControlPanel('Networks')">
          <icon-base name="edit" width="16" height="16" />
        </a>
      </template>

      <!-- Available settings -->
      <template v-if="type === 'available'">
        <a href="#" class="b-styler__control"
           @click.stop="setControlPanel('Available')">
          <icon-base name="edit" width="16" height="16" />
        </a>
      </template>

      <!-- Age restrictions -->
      <template v-if="type === 'restrictions'">
        <a href="#" class="b-styler__control"
           @click.stop="setControlPanel('Restrictions')">
          <icon-base name="edit" width="16" height="16" />
        </a>
      </template>

      <!-- Timer -->
      <template v-if="type === 'timer'">
        <a href="#" class="b-styler__control"
           @click.stop="setControlPanel('Timer')">
          <icon-base name="edit" width="16" height="16" />
        </a>
      </template>

      <!-- Image -->
      <template v-if="type === 'image'">
        <a href="#" class="b-styler__control"
          @click.stop="setControlPanel('Image')">
          <icon-base name="edit" width="14" height="16" />
        </a>
        <a href="#" class="b-styler__control"
           @click.stop="toggleModalButton" v-if="!options.belongsGallery">
          <icon-base name="link" width="18" height="18" />
        </a>
      </template>

      <!-- Video -->
      <a href="#" class="b-styler__control"
         @click.stop="setControlPanel('Video')"
         v-if="type === 'video'">
        <icon-base name="edit" width="14" height="16" />
      </a>

      <!-- Iframe -->
      <a href="#" class="b-styler__control"
         @click.stop="setControlPanel('Iframe')"
         v-if="type === 'iframe'">
        <icon-base name="edit" width="14" height="16" />
      </a>

      <!-- Icon with text -->
      <template v-if="type === 'iconWithText'">
        <a href="#" class="b-styler__control"
           @click.stop="setPanels('IconWithText', true)">
          <icon-base name="edit" width="12" height="15" />
        </a>
      </template>

      <!-- Toggle element -->
      <template v-if="type === 'toggleElement'">
        <a href="#" class="b-styler__control"
           @click.stop="setPanels('ToggleElement', true)">
          <icon-base name="edit" width="12" height="15" />
        </a>
      </template>

      <!-- Form -->
      <template v-if="type === 'form'">
        <a href="#" class="b-styler__control"
           @click.stop="setPanels('Form', true)">
          <icon-base name="edit" width="16" height="16" />
        </a>
      </template>

      <!-- Duplicate element -->
      <template v-if="options.removable">
        <a href="#" class="b-styler__control"
           @click.stop="duplicateElement">
          <icon-base name="clone"  width="14" height="16"></icon-base>
        </a>
      </template>

      <!-- Copy el -->
      <a href="#" class="b-styler__control b-styler__control_copy"
        v-if="options.copyStyles"
        @click.stop="copyStylesBuffer"
        >
        <icon-base name="copy" width="10" height="10"></icon-base>
      </a>

      <!-- Paste el -->
      <a href="#" class="b-styler__control b-styler__control_paste"
        v-if="type === stylesBuffer.type"
        @click.stop="pasteStylesBuffer"
        >
        <icon-base name="paste" width="10" height="10"></icon-base>
      </a>

      <!-- Delete element -->
      <a href="#" class="b-styler__control b-styler__control_del"
         v-if="options.removable"
         @click.stop="removeElement"
         @mouseover="mouseoverDelEl"
         @mouseleave.self="mouseleaveDelEl"
      >
        <icon-base name="delete" width="10" height="10"></icon-base>
      </a>

    </div>
  </div>
</template>

<script>
import { isParentTo, randomPoneId, getPseudoTemplate, getLinkStyles, composedPath } from '../util'
import * as _ from 'lodash-es'
import { mapMutations, mapActions, mapState } from 'vuex'
import Popper from 'popper.js'
import VueScrollTo from 'vue-scrollto'
import ModalButton from './modals/TheModalButton'

export default {
  name: 'Styler',

  components: {
    ModalButton
  },

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
    popper: null,
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
    ],
    timer: 0,
    prevent: false
  }),
  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectOptions',
      'isResizeStop',
      'isDragStop',
      'stylesBuffer',
      'isShowModal',
      'isShowModalButton',
      'hoverBy'
    ]),
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
    },

    poneId () {
      return randomPoneId()
    }
  },

  watch: {
    settingObjectOptions: {
      handler: function (val) {
        if (this.popper) {
          this.popper.update()
        }
        if (val.link && val.link.behavior) {
          this.el.dataset.behavior = val.link.behavior
        }
        if (val.video && val.link.action.value === 'ptah-d-video') {
          this.el.classList.add('ptah-d-video')
          this.el.dataset.video = this.options.video
        } else {
          this.el.classList.remove('ptah-d-video')
        }
      },
      deep: true
    },

    isDragStop: {
      handler: function (val, oldVal) {
        if (val) {
          this.isVisible = false
        }
      }
    },

    textEditorActive: {
      handler: function (val) {
        if (val === false && this.isCurrentStyler) {
          this.setControlPanel(false)
        }
      }
    }
  },

  created () {
    this.dimensions.width = this.el.offsetWidth
    this.dimensions.height = this.el.offsetHeight
  },

  mounted () {
    if (this.$builder && !this.$builder.isEditing) return

    this.el.addEventListener('mousedown', this.showStyler)
    this.el.addEventListener('dblclick', this.dblclick)
    this.el.addEventListener('click', this.elClick)

    if (this.type === 'section') {
      this.el.id = `section_${this.section.id}`
    }

    // Restoring from a snapshot
    // to apply the pseudoclass to the element
    if (!!this.options.pseudo && Object.keys(this.options.pseudo).length) {
      _.forEach(this.options.pseudo, (styles, pseudo) => {
        this.changePseudoStyle(styles, pseudo)
      })
    }

    if (!!this.options.textLinkStyles && Object.keys(this.options.textLinkStyles).length) {
      this.changeTextLinkStyle(this.options.textLinkStyles)
    }

    if (this.options.hasLink && this.options.link && this.options.link.action === '') {
      this.options.classes.push('js-element-link')
    }

    // Apply animation to element
    if (this.options.classes !== undefined && this.options.classes.length) {
      this.options.classes.forEach((name) => {
        if (name.indexOf('ptah-a-') > -1) {
          this.animation = _.find(this.animationList, ['className', name])
        }

        if (name.indexOf('ptah-d-video') > -1) {
          this.el.dataset.video = this.options.video
        }
      })
    }

    this.proportions = Math.min(this.el.offsetWidth / this.el.offsetHeight)
  },

  beforeDestroy () {
    this.hideStyler()
    this.$refs.styler.remove()
    this.el.classList.remove('is-editable')
    this.el.removeEventListener('mousedown', this.showStyler)
    this.el.removeEventListener('click', this.elClick)
    this.el.removeEventListener('dblclick', this.dblclick)
    document.removeEventListener('mousedown', this.hideStyler, true)
  },

  methods: {
    ...mapMutations('Sidebar', ['setSandboxPaths']),
    ...mapMutations('Landing', ['textEditor']),
    ...mapActions('Sidebar', [
      'clearSettingObjectLight',
      'setSettingElement',
      'setControlPanel',
      'setSection',
      'toggleResizeStop',
      'toggleDragStop',
      'updateSettingOptions',
      'updateStylesBuffer',
      'toggleSectionsTreeMenu',
      'toggleSidebar',
      'toggleModalButton',
      'setHoverBy'
    ]),

    setPanels (panel, isEditText) {
      this.setControlPanel(panel)

      if (isEditText) {
        this.editText = isEditText
      }
    },

    elClick (event) {
      if (!event.target.classList.contains('b-button__resize') && !this.editText) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
    },

    stylerInit (event) {
      const stopNames = [
        'b-draggable-slot',
        'b-draggable-slot active',
        'ProseMirror',
        'editor__content'
      ]

      if (this.isCurrentStyler && !this.checkStylerNodes(event, stopNames)) {
        this.isCurrentStyler = false
        return
      }

      if (this.textEditorActive) {
        return
      }

      this.initPopper()

      this.setControlPanel(false)

      // --- clear active classes
      document.querySelectorAll('.b-draggable-slot.active')
        .forEach(el => el.classList.remove('active'))

      if (this.isVisible) return
      if (this.$props.type !== 'section') {
        this.isVisible = true
      }

      setTimeout(() => {
        if (this.$props.type === 'section') {
          // Do not show section settings on click
          // this.toggleSectionsTreeMenu(true)
        } else {
          // --- if section has components or slots
          let keys = Object.keys(this.section.data)
          let hasSlotsData = (
            keys.some(key => Boolean(~key.indexOf('components'))) ||
            keys.some(key => Boolean(~key.indexOf('container')))
          )
          if (hasSlotsData) {
            let target = null

            if (event.target !== null) {
              target = event.target.closest('.b-draggable-slot')
            }

            if (target !== null) {
              target.classList.add('active')
            }
            // --- TODO: bad idea
            // --- fix in future
            // --- coz data storage is unstable
            let name = this.path[0]
            let index = name.split('components')[1]
            this.setSandboxPaths({
              components: `$sectionData.components${index}`,
              container: `$sectionData.container${index}`
            })
          }

          this.setElement()
        }
      }, 0)
    },

    initPopper () {
      let self = this

      let autoSizing = (data) => {
        data.offsets.popper.left = data.offsets.reference.left
        if (self.options.removable) {
          data.styles.width = data.offsets.reference.width
        }
        return data
      }

      let applyReactStyle = (data) => {
        data.styles.width = data.offsets.reference.width
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
              },
              hide: {
                enabled: true
              },
              applyStyle: { enabled: true },
              applyReactStyle: {
                enabled: true,
                fn: applyReactStyle,
                order: 900
              }
            }
          })
        })
      }
    },

    setElement () {
      this.setSettingElement({
        type: this.$props.type, // TODO: $props.type !== type ?
        label: this.$props.label,
        name: this.name,
        options: _.get(this.section.data, this.path).element,
        section: this.section,
        element: this.el
      })
      this.el.classList.add('styler-active')
      // --- rm class/es from menu items
      document
        .querySelectorAll('.b-menu-subitem_selected')
        .forEach(el => el.classList.remove('b-menu-subitem_selected'))

      document.addEventListener('mousedown', this.hideStyler, true)
    },

    showStyler (event) {
      if (event.target.classList.contains('b-upload--alternative')) {
        return
      }

      let self = this

      self.stylerInit(event)

      this.timer = setTimeout(function () {
        if (!self.prevent) {
          document.addEventListener('mousedown', self.hideStyler, true)
        }
        self.prevent = false
      }, 150)
    },

    hideStyler (event) {
      const stopNames = [
        'b-styler__control_text',
        'b-control-panel',
        'menubar__button',
        'menubar__button is-active',
        'editor__content',
        'menubar is-hidden',
        'b-handle',
        'b-handle b-handle-tl',
        'b-handle b-handle-tm',
        'b-handle b-handle-tr',
        'b-handle b-handle-mr',
        'b-handle b-handle-br',
        'b-handle b-handle-bm',
        'b-handle b-handle-bl',
        'b-handle b-handle-ml'
      ]

      if ((event && (event.target === this.el || this.checkStylerNodes(event, stopNames))) && this.isDragStop === false) {
        this.isCurrentStyler = true

        if (`$sectionData.${this.isResizeStop}` === this.settingObjectOptions.name) {
          this.toggleResizeStop(false)
        }

        return
      }

      if (event && MouseEvent && isParentTo(event.target, this.$el) && this.isDragStop === false) {
        this.isCurrentStyler = true
        return
      }

      this.isCurrentStyler = false

      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }

      // hide panel
      this.setControlPanel(false)
      // this.toggleSidebar(true)
      this.toggleSectionsTreeMenu(true)

      this.el.contentEditable = 'false'
      this.el.classList.remove('styler-active')

      this.isVisible = false
      this.editText = false

      document.removeEventListener('mousedown', this.hideStyler, true)
      document.removeEventListener('blur', this.hideStyler, true)
    },

    checkStylerNodes (event, classes) {
      let m = false
      let path = event.path ? event.path : composedPath(event.target)

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
      let pseudoClassValue = {}
      pseudoClassValue[pseudoClass] = style
      this.el.dataset.pone = this.poneId
      _.merge(this.pseudoStyles, pseudoClassValue)
      this.options.pseudo = this.pseudoStyles

      let styleTemplate = getPseudoTemplate(this.poneId, this.pseudoStyles)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    changeTextLinkStyle (style) {
      this.el.dataset.pone = this.poneId
      let styleTemplate = getLinkStyles(this.poneId, style)
      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    /**
     * Remove
     * @param index
     */
    removeElement () {
      let index = this.path[1]
      const components = [...this.components]
      this.clearSettingObjectLight()

      this.hideStyler()

      components.splice(index, 1)
      this.components = components
    },

    duplicateElement () {
      let el = _.cloneDeep(_.get(this.section.data, this.path))
      el.key = randomPoneId()
      this.components = [...this.components, el]

      this.selectElement()
    },

    async selectElement () {
      await this.$nextTick()

      let idSection = this.section.id
      let section = document.getElementById(`section_${idSection}`)
      let nameArray = this.sandbox.components.split('.')[1]
      let el = section.querySelector(`[path="${nameArray}[${this.components.length - 1}].element"]`)

      let resize = el.querySelector(`.resizable.vdr`)

      if (resize) {
        el = resize
      }

      el.id = `section${idSection}${nameArray}${this.components.length - 1}`
      this.clickOnElement(el)
    },

    clickOnElement (el) {
      let machineEvent = new Event('mousedown', { bubbles: true })
      el.dispatchEvent(machineEvent)

      this.scrollTo(el)
    },

    scrollTo (element) {
      let options = {
        container: '.b-builder-layout-content__main .vb-content',
        duration: 500,
        easing: 'ease',
        offset: -80,
        force: true,
        cancelable: true,
        onStart: false,
        onDone: false,
        onCancel: false,
        x: false,
        y: true
      }

      VueScrollTo.scrollTo(`#${element.getAttribute('id')}`, 500, options)
    },

    copyStylesBuffer () {
      let element = { type: this.type, options: this.settingObjectOptions }

      this.updateStylesBuffer(element)
    },

    pasteStylesBuffer () {
      let type = this.stylesBuffer.type
      let options = this.stylesBuffer.options

      delete options['name']
      delete options['sectionName']

      if (this.type === type) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, options))
      }
    },

    async dblclick (event) {
      let name = _.upperFirst(_.camelCase(this.type))

      // clear timer after dbl click
      clearTimeout(this.timer)

      this.prevent = true

      if (this.type === 'section' || this.type === 'delimiter') {
        return
      }

      // set props element
      this.setElement()

      await this.$nextTick()

      if (this.type !== 'inline') {
        this.setControlPanel(name)
      }

      if (this.type === 'text' || this.type === 'inline' || this.type === 'button' || this.type === 'iconWithText' || this.type === 'form' || this.type === 'toggleElement') {
        this.editText = true
      } else {
        this.initPopper()
      }
    },

    mouseoverDelEl  () {
      this.setHoverBy('element-del')
      this.el.classList.add('_hover-red')
    },

    mouseleaveDelEl () {
      this.el.classList.remove('_hover-red')
      this.setHoverBy('element')
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-styler
  display: none
  justify-content: center
  align-items: flex-start
  height: 3.8rem
  z-index: 20
  margin: -0.6rem 0 0

  &.is-show-modal
    z-index: -1

  &.is-visible
    display: flex

  &__controls
    display: flex
    background: $main-yellow
    border-radius: .5rem

    transition: background-color .1s
    &._hover-del
      background: #D36083

  &__col
    display: flex
    flex-wrap: nowrap

  &__control
    width: 3.4rem
    height: 3.4rem
    margin: 0 .9rem

    display: flex
    align-items: center
    justify-content: center

    border-radius: 50%

    cursor: pointer
    transition: all .3s
    & svg
      fill:  $white
      width: 20px
      height: 20px

    &:hover, .active
      background: rgba(255, 255, 255, 0.35)

  &[x-out-of-boundaries]
    display: none !important
</style>
