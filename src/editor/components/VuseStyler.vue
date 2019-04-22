<template>
  <div class="b-styler is-editable"
    ref="styler"
    id="styler"
    v-if="$builder.isEditing"
    :class="{ 'is-visible': isVisible && !editText }"
    @click.stop=""
  >

    <div class="b-styler__col" v-if="type === 'button'">
      <!-- Button -->
      <div class="b-styler__controls">
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('Button')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </div>
      <div class="b-styler__controls" ref="buttonModalProps">
        <a href="#" class="b-styler__control" @click.stop="setModalProps()">
          <icon-base name="link" width="18" height="18" />
        </a>
      </div>
    </div>

    <div class="b-styler__controls">

      <!-- Text -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Text')" v-if="type === 'text'">
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

      <!-- Social settings -->
      <template v-if="type === 'available'">
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('AvailableSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('AvailableStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Age restrictions -->
      <template v-if="type === 'restrictions'">
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('RestrictionsSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('RestrictionsStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Timer -->
      <template v-if="type === 'timer'">
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('TimerSettings')">
          <icon-base name="settings" width="16" height="16" />
        </a>
        <a href="#" class="b-styler__control" @click.stop="setControlPanel('TimerStyle')">
          <icon-base name="style" width="12" height="15" />
        </a>
      </template>

      <!-- Image -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Image')" v-if="type === 'image'">
        <icon-base name="preview" width="14" height="16" />
      </a>

      <!-- Video -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Video')" v-if="type === 'video'">
        <icon-base name="settings" width="14" height="16" />
      </a>

      <!-- Icon with text -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Icon')" v-if="type === 'icon'">
        <icon-base name="style" width="12" height="15" />
      </a>

      <!-- Form -->
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Form')" v-if="type === 'form'">
        <icon-base name="style" width="12" height="15" />
      </a>

    </div>

    <!-- Delete element -->
    <div class="b-styler__controls" v-if="options.removable">
      <a href="#" class="b-styler__delete" title="delete" @click.stop="removeElement">
        <icon-base name="close" width="10" height="10"></icon-base>
      </a>
    </div>

    <!-- modals -->
    <div class="b-styler__modal"
       :class="modal.button.class"
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
        class: '_top',
        width: '400',
        height: '340'
      }
    },
    transform: {
      button: {
        x: 0,
        y: 0
      }
    }
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
    },

    poneId () {
      return randomPoneId()
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

    if (!!this.options.textLinkStyles && Object.keys(this.options.textLinkStyles).length) {
      this.changeTextLinkStyle(this.options.textLinkStyles)
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
    document.removeEventListener('click', this.hideStyler, true)
  },
  methods: {
    ...mapMutations('Sidebar', ['setSandboxPaths']),
    ...mapMutations('Landing', ['textEditor']),
    ...mapActions('Sidebar', ['setSettingElement', 'clearSettingObjectLight', 'setControlPanel', 'setSection']),

    showStyler (event) {
      let self = this

      event.preventDefault()
      event.stopPropagation()

      let autoSizing = (data) => {
        data.offsets.popper.left = data.offsets.reference.left
        if (self.options.removable) {
          data.styles.width = data.offsets.reference.width
        }
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
              },
              hide: {
                enabled: true
              }
            }
          })
        })
      }

      if (this.isCurrentStyler) {
        this.isCurrentStyler = false
        return
      }

      // hide modal settings
      this.isModalsPropsShow = false

      if (this.type !== 'section') this.setControlPanel(false)
      this.clearSettingObjectLight()

      // --- clear active classes
      document.querySelectorAll('.b-draggable-slot.active')
        .forEach(el => el.classList.remove('active'))

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
            options: _.get(this.section.data, this.path).element,
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
      const stopNames = [
        'b-styler__control',
        'b-control-panel',
        'menubar__button',
        'editor__content',
        'menubar is-hidden',
        'b-slot__settings'
      ]

      if (event && (event.target === this.el
        || this.checkStylerNodes(event, stopNames))) {
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

      // hide modal settings
      this.closeModal()

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

    setModalProps () {
      this.isModalsPropsShow = !this.isModalsPropsShow
      this.setPosition()
    },

    closeModal () {
      this.isModalsPropsShow = false
    },

    setPosition () {
      let pos = this.$refs.styler.getBoundingClientRect()

      if (pos.top < this.modal[this.type].height || pos.right < this.modal[this.width]) {
        this.modal[this.type].class = '_bottom'
      }
    },

    changeButtonProps (props) {
      if (props && props.behavior) {
        this.el.dataset.behavior = props.behavior
      }
      if (props && props.video) {
        this.el.dataset.video = props.video
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
  height: 4rem
  z-index: 20

  &.is-visible
    display: flex

  &__controls
    display: flex

  &__col
    display: flex
    flex-wrap: nowrap

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
      left: -2.5rem
    &._bottom
      top: 4rem
      right: -2.5rem

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
        left: 19%
        bottom: -0.75rem
        margin-left: -0.75rem

    &._bottom
      &:before,
      &:after
        right: 19%
        top: -0.75rem
        margin-right: -0.75rem

  &[x-out-of-boundaries]
    display: none !important
</style>
