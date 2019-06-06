<template>
  <div class="b-styler is-editable"
    ref="styler"
    id="styler"
    v-if="$builder.isEditing"
    :class="{ 'is-visible': isVisible && !editText && isShowStyler }"
    @click.stop=""
  >

    <div class="b-styler__controls">
      <!-- Button -->
      <template v-if="type === 'button'">

        <a href="#" class="b-styler__control"
           tooltip="Edit text"
           tooltip-position="bottom"
           @click.stop="setPanels('Button', true)"
          >
          <icon-base name="edit" width="12" height="15" />
        </a>

        <a href="#" class="b-styler__control"
           tooltip="Button settings"
           tooltip-position="bottom"
           @click.stop="setControlPanel('ButtonSettings')">
          <icon-base name="cog" width="12" height="15" />
        </a>

        <a href="#" class="b-styler__control"
           tooltip="Button link"
           tooltip-position="bottom"
           @click.stop="setModalProps()" ref="buttonModalProps">
          <icon-base name="link" width="18" height="18" />
        </a>
      </template>

      <!-- Text element -->
      <template v-if="type === 'text'">
        <a href="#" class="b-styler__control b-styler__control_text"
          tooltip="Edit"
          tooltip-position="bottom"
          @click.stop="setPanels('Text', true)"
          >
          <icon-base name="edit" width="12" height="15" />
        </a>
      </template>

      <!-- Inline text -->
      <a href="#" class="b-styler__control"
         tooltip="Edit"
         tooltip-position="bottom"
         @click.stop="setPanels(false, true)"
         v-if="type === 'inline'">
        <icon-base name="edit" width="12" height="15" />
      </a>

      <!-- Networks settings -->
      <template v-if="type === 'networks'">
        <a href="#" class="b-styler__control"
           tooltip="Add/remove networks"
           tooltip-position="bottom"
           @click.stop="setControlPanel('NetworksSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Networks icons style"
           tooltip-position="bottom"
           @click.stop="setControlPanel('NetworksStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Available settings -->
      <template v-if="type === 'available'">
        <a href="#" class="b-styler__control"
           tooltip="Add/remove platform"
           tooltip-position="bottom"
           @click.stop="setControlPanel('AvailableSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Icons style"
           tooltip-position="bottom"
           @click.stop="setControlPanel('AvailableStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Age restrictions -->
      <template v-if="type === 'restrictions'">
        <a href="#" class="b-styler__control"
           tooltip="Restrictions settings"
           tooltip-position="bottom"
           @click.stop="setControlPanel('RestrictionsSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Icon size & block style"
           tooltip-position="bottom"
           @click.stop="setControlPanel('RestrictionsStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Timer -->
      <template v-if="type === 'timer'">
        <a href="#" class="b-styler__control"
           tooltip="Timer settings"
           tooltip-position="bottom"
           @click.stop="setControlPanel('TimerSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Timer style"
           tooltip-position="bottom"
           @click.stop="setControlPanel('TimerStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Image -->
      <template v-if="type === 'image'">
        <a href="#" class="b-styler__control"
           tooltip="Image link"
           tooltip-position="bottom"
           @click.stop="setControlPanel('ImageLink')" v-if="options.hasLink">
          <icon-base name="link" width="14" height="16" />
        </a>
        <a href="#" class="b-styler__control"
          tooltip="Set/change image"
          tooltip-position="bottom"
          @click.stop="setControlPanel('ImageSettings')">
          <icon-base name="style" width="14" height="16" />
        </a>
      </template>

      <!-- Video -->
      <a href="#" class="b-styler__control"
         tooltip="Video settings"
         tooltip-position="bottom"
         @click.stop="setControlPanel('VideoSettings')"
         v-if="type === 'video'">
        <icon-base name="settings" width="14" height="16" />
      </a>

      <!-- Icon with text -->
      <template v-if="type === 'iconWithText'">
        <a href="#" class="b-styler__control"
           tooltip="Text edit"
           tooltip-position="bottom"
           @click.stop="setPanels('IconWithText', true)">
          <icon-base name="edit" width="12" height="15" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Element settings"
           tooltip-position="bottom"
           @click.stop="setControlPanel('IconWithTextSettings')">
          <icon-base name="settings" width="12" height="15" />
        </a>
      </template>

      <!-- Toggle element -->
      <template v-if="type === 'toggleElement'">
        <a href="#" class="b-styler__control"
           tooltip="Edit texts"
           tooltip-position="bottom"
           @click.stop="setControlPanel('ToggleElementEdit')">
          <icon-base name="edit" width="12" height="15" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Element settings"
           tooltip-position="bottom"
           @click.stop="setControlPanel('ToggleElementSettings')">
          <icon-base name="settings" width="12" height="15" />
        </a>
      </template>

      <!-- Form -->
      <template v-if="type === 'form'">
        <a href="#" class="b-styler__control"
           tooltip="Form settings"
           tooltip-position="bottom"
           @click.stop="setControlPanel('FormSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control"
           tooltip="Form styles"
           tooltip-position="bottom"
           @click.stop="setControlPanel('FormStyles')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Duplicate element -->
      <template v-if="options.removable">
        <a href="#" class="b-styler__control"
           tooltip="Clone element"
           tooltip-position="bottom"
           @click.stop="duplicateElement">
          <icon-base name="clone"  width="14" height="16"></icon-base>
        </a>
      </template>

    </div>

    <!-- Delete element -->
    <div class="b-styler__controls" v-if="options.removable">
      <a href="#" class="b-styler__control b-styler__control_del" title="delete" @click.stop="removeElement">
        <icon-base name="close" width="10" height="10"></icon-base>
      </a>
    </div>

    <!-- Modals -->
    <div class="b-styler__modal"
       :class="[ modal.button.classV, modal.button.classH ]"
       ref="buttonModal"
       v-if="type === 'button' && isModalsPropsShow === true"
       v-click-outside="closeModal"
       @clic.stop=""
       :style="{ 'transform' : 'translate3d(' + transform.button.x +  'px' + ', ' + transform.button.y + 'px, 0)' }"
      >
      <div class="b-styler__modal-close"
        @click="setModalProps">
        <icon-base
          name="close"
          color="#c4c4c4"
          width="12"
          height="12"
        />
      </div>
      <div class="b-styler__modal-chapter">
        Select button target
      </div>
      <div class="b-styler__modal-content">
        <modal-button :builder="$builder" @changeProps="changeButtonProps"/>
      </div>
      <div class="b-styler__modal-buttons">
        <BaseButton
          class="b-styler__modal-button"
          :color="'blue'"
          :transparent="false"
          size="middle"
          @click.stop="setModalProps()"
          >
          Done
        </BaseButton>
      </div>
    </div>

  </div>
</template>

<script>
import { isParentTo, randomPoneId, getPseudoTemplate, getLinkStyles, composedPath } from '../util'
import * as _ from 'lodash-es'
import { mapMutations, mapActions, mapState } from 'vuex'
import Popper from 'popper.js'

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
    isModalsPropsShow: false,
    modal: {
      button: {
        classV: '_top',
        classH: '_right',
        width: 400,
        height: 340
      }
    },
    transform: {
      button: {
        x: 0,
        y: 0
      }
    },
    timer: 0,
    prevent: false
  }),
  computed: {
    ...mapState('Sidebar', ['sandbox', 'settingObjectOptions', 'isShowStyler', 'isResizeStop', 'isDragStop']),
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
      handler: function (val, oldVal) {
        if (this.popper) {
          this.popper.update()
        }
      },
      deep: true
    },
    isResizeStop: {
      handler: function (val, oldVal) {
        if (val === true) this.el.addEventListener('click', this.showStyler)
      }
    },
    isDragStop: {
      handler: function (val, oldVal) {
        if (val) {
          this.showStylerAfterDragEl()
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

    this.el.addEventListener('click', this.showStyler)
    this.el.addEventListener('dblclick', this.dblclick)

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

    if (this.options.video && this.options.link.type === 'video') {
      this.el.classList.add('ptah-d-video')
      this.el.dataset.video = this.options.video
    }

    if (this.options.hasLink && this.options.link && this.options.link.action === '') {
      this.el.classList.add('js-element-link')
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

    if (this.options.link && this.options.link.behavior) {
      this.el.dataset.behavior = this.options.link.behavior
    }

    this.proportions = Math.min(this.el.offsetWidth / this.el.offsetHeight)
  },

  beforeDestroy () {
    this.hideStyler()
    this.$refs.styler.remove()
    this.el.classList.remove('is-editable')
    this.el.removeEventListener('click', this.showStyler)
    this.el.removeEventListener('dblclick', this.dblclick)
    document.removeEventListener('click', this.hideStyler, true)
  },

  methods: {
    ...mapMutations('Sidebar', ['setSandboxPaths']),
    ...mapMutations('Landing', ['textEditor']),
    ...mapActions('Sidebar', ['setSettingElement', 'clearSettingObjectLight', 'setControlPanel', 'setSection', 'toggleResizeStop', 'toggleDragStop']),

    setPanels (panel, isEditText) {
      this.setControlPanel(panel)

      if (isEditText) {
        this.editText = isEditText
      }
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

      // hide modal settings
      this.isModalsPropsShow = false

      this.setControlPanel(false)
      this.clearSettingObjectLight()

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
          // this.setSettingSection(this.section)
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

      document.addEventListener('click', this.hideStyler, true)
    },

    showStyler (event) {
      let self = this

      event.preventDefault()
      event.stopPropagation()

      self.stylerInit(event)

      this.timer = setTimeout(function () {
        if (!self.prevent) {
          document.addEventListener('click', self.hideStyler, true)
        }
        self.prevent = false
      }, 150)
    },

    hideStyler (event) {
      const stopNames = [
        'b-styler__control_text',
        'b-control-panel',
        'menubar__button',
        'editor__content',
        'menubar is-hidden'
      ]

      if ((event && (event.target === this.el || this.checkStylerNodes(event, stopNames))) || this.isResizeStop) {
        this.isCurrentStyler = true

        if (this.isResizeStop) this.isCurrentStyler = false
        this.toggleResizeStop(false)

        return
      }

      if (event && MouseEvent && isParentTo(event.target, this.$el)) {
        return
      }

      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }

      // hide modal settings
      this.closeModal()

      // hide panel
      this.setControlPanel(false)

      this.el.contentEditable = 'false'
      this.el.classList.remove('styler-active')

      this.isVisible = false
      this.editText = false

      document.removeEventListener('click', this.hideStyler, true)
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
      this.components.splice(index, 1)
      this.clearSettingObjectLight()
      this.hideStyler()
    },

    duplicateElement () {
      let el = _.cloneDeep(_.get(this.section.data, this.path))
      el.key = randomPoneId()
      this.components = [...this.components, el]
    },

    setModalProps () {
      this.isModalsPropsShow = !this.isModalsPropsShow
      this.setPosition()
    },

    closeModal () {
      this.isModalsPropsShow = false
    },

    setPosition () {
      let pos = this.el.getBoundingClientRect()
      let widthBoard = document.getElementById('artboard').clientWidth
      let widthSidebar = document.getElementById('sidebar').clientWidth
      let heightTopbar = document.getElementById('topbar').clientHeight
      let right = widthBoard - (pos.right - widthSidebar)

      if (pos.top < (this.modal[this.type].height + heightTopbar)) {
        this.modal[this.type].classV = '_bottom'
      } else {
        this.modal[this.type].classV = '_top'
      }

      if (right < this.modal[this.type].width) {
        this.transform[this.type].x = -(this.modal[this.type].width - 55)
        this.modal[this.type].classH = '_left'
      } else {
        this.transform[this.type].x = 0
        this.modal[this.type].classH = '_right'
      }
    },

    changeButtonProps (props) {
      if (props && props.behavior) {
        this.el.dataset.behavior = props.behavior
      }
      if (props && props.video) {
        this.el.dataset.video = props.video
      }
    },

    showStylerAfterDragEl () {
      if (undefined !== this.options['isDragged'] && this.options['isDragged']) {
        delete this.options['isDragged']

        this.isVisible = false
        this.isCurrentStyler = false
        this.toggleDragStop(false)

        this.el.addEventListener('click', this.showStyler)
        this.el.click()
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

      if (this.type === 'text' || this.type === 'button' || this.type === 'iconWithText') {
        this.editText = true
        this.setControlPanel(name)
      } else {
        if (this.type === 'inline') {
          this.setControlPanel(name + 'Edit')
        } else {
          this.setControlPanel(name + 'Settings')
        }

        this.initPopper()
      }
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-styler
  display: none
  justify-content: space-between
  align-items: flex-start
  height: 2.6rem
  z-index: 20
  margin: 0 0 0 -0.2rem

  &.is-visible
    display: flex

  &__controls
    display: flex

  &__col
    display: flex
    flex-wrap: nowrap

  &__control
    width: $size-step/1.8
    height: $size-step/1.8

    display: flex
    align-items: center
    justify-content: center

    width: $size-step/1.5
    height: $size-step/1.5

    background: $dark-blue-krayola
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)

    cursor: pointer
    & svg
      fill:  $white
      width: 14px
      height: 14px

    &:hover, .active
      background: $white
      svg
        fill: $dark-blue-krayola

    &_del
      margin-right: -0.2rem
      background: $black
      svg
        fill: $white
        margin-bottom: 0
      &:hover, .active
        background: $black
        svg
          fill: $orange

    &_link
      svg
        width: 18px
        height: 18px

  &__modal
    width: 40rem
    height: 34rem
    padding: 0 0 $size-step/1.45

    position: absolute

    background: $white
    box-shadow: 0px 0.4rem 4rem rgba($black, 0.35)
    &-buttons
      position: absolute
      right: 0
      left: 0
      bottom: 0
      z-index: 3

      background: $white

      display: flex
      justify-content: flex-end
      padding-bottom: $size-step/1.45
      margin: $size-step $size-step/2.5 0
    &-chapter
      font-size: 1.6rem
      font-weight: bold
      letter-spacing: -0.02em
      color: $dark-grey

      background: $white

      padding: $size-step/1.45 0 0
      margin: 0 $size-step/1.45
    &-content
      margin: $size-step/2 $size-step/1.45
    &_color *
      fill: $dark-blue-krayola
    &_color *
      fill: #4D7DD8
    &-close
      position: absolute
      top: $size-step/1.45
      right: $size-step/1.45

      cursor: pointer

    &._top
      bottom: 4rem
    &._bottom
      top: 4rem
    &.right
      right: calc(100% - 40px)
    &._left
      left: 40px
    &:before
      content: ""
      position: absolute
      width: 1.5rem
      height: 1.5rem

      background: $white
      transform: rotate(-45deg)
      z-index: 2
    &:after
      content: ""
      position: absolute
      width: 1.5rem
      height: 1.5rem

      background: $white
      transform: rotate(-45deg)
      box-shadow: 0 0 2rem 0 rgba($black, 0.35)
      z-index: -1

    &._top
      &:before,
      &:after
        bottom: -0.75rem

    &._bottom
      &:before,
      &:after
        top: -0.75rem

    &._right
      &:before,
      &:after
        left: 9%
        margin-left: -0.75rem

    &._left
      &:before,
      &:after
        right: 15%
        margin-right: -0.75rem

  &[x-out-of-boundaries]
    display: none !important
</style>
