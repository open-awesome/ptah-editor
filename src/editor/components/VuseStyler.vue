<template>
  <div class="b-styler is-editable"
       ref="styler"
       id="styler"
       v-if="$builder.isEditing"
       :class="{ 'is-visible': isVisible }"
       @click.stop="">

    <!-- Button -->
    <div class="b-styler__controls" v-if="type === 'button'">
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Button')">
        <icon-base name="style" width="12" height="15" />
      </a>
    </div>
    <div class="b-styler__controls" v-if="type === 'button'" ref="buttonModalProps">
      <a href="#" class="b-styler__control" @click.stop="setModalProps()">
        <icon-base name="link" width="18" height="18" />
      </a>
    </div>

    <!-- Text -->
    <div class="b-styler__controls" v-if="type === 'text'">
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Text')">
        <icon-base name="style" width="12" height="15" />
      </a>
    </div>

    <!-- Social settings -->
    <div class="b-styler__controls" v-if="type === 'networks'">
      <a href="#" class="b-styler__control" @click.stop="setControlPanel('Text')">
        <icon-base name="style" width="12" height="15" />
      </a>
    </div>

    <!-- Delete element -->
    <a href="#" class="b-styler__delete" title="delete" @click.stop="removeElement">
      <icon-base name="close" width="12" height="12"></icon-base>
    </a>

    <div class="" ref="button" v-show="type === 'button' && modalsProps['button'] === true">
      <div class="b-styler__modal">
          <div class="b-styler__modal-chapter">
            Select button target
          </div>
          <div>
            <base-text-field label="URL" placeholder="Type link here"/>
          </div>
          <div class="b-styler__modal-buttons">
            <BaseButton
              class="b-styler__modal-button"
              :color="'gray'"
              :transparent="true"
              size="middle"
              >
              Cancel
            </BaseButton>
            <BaseButton
              class="b-styler__modal-button"
              :color="'blue'"
              :transparent="false"
              size="middle"
              >
              Done
            </BaseButton>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import { isParentTo, randomPoneId, getPseudoTemplate, placeCaretAtEnd } from '../util'
import * as _ from 'lodash-es'
import { mapMutations, mapActions, mapState } from 'vuex'
import Popper from 'popper.js'

const DEFAULT_BACKGROUND_REPEAT = 'no-repeat'
const DEFAULT_BACKGROUND_POSITION = 'center center'
const DEFAULT_BACKGROUND_SIZE = 'contain'

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
    oldColorerColor: '',
    colorerColor: '',
    mouseTarget: '',
    currentOption: '',
    url: '',
    title: '',
    text: '',
    preview: '',
    image: '',
    gridValue: 0,
    isVisible: false,
    imageBgSelected: false,
    videoBgSelected: false,
    videoBackgroundSources: [],
    backgroundUrl: '',
    backgroundColor: '#ffffff',
    backgroundHoverColor: '#ffffff',
    backgroundOptions: {
      repeat: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
      positions: [
        'left top',
        'left center',
        'left bottom',
        'right top',
        'right center',
        'right bottom',
        'center top',
        'center center',
        'center bottom'
      ],
      sizes: ['auto', 'cover', 'contain']
    },
    backgroundSelectedOptions: {
      repeat: DEFAULT_BACKGROUND_REPEAT,
      position: DEFAULT_BACKGROUND_POSITION,
      size: DEFAULT_BACKGROUND_SIZE
    },
    backgroundSettingsShow: { video: false, image: false, link: false, color: false },
    isVideoBackgroundPoster: false,
    videoBackgroundPosterSource: '',
    isRequestProcess: false,
    textSelectColor: '#000',
    fontSize: null,
    fontFamily: null,
    borderRadius: 0,
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
    resizer: null,
    popperModalProps: null,
    modalsProps: {
      button: false
    }
  }),
  computed: {
    ...mapState('Sidebar', ['sandbox']),

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

    this.setInitialValue()

    // Restoring from a snapshot
    // to apply the pseudoclass to the element
    if (Object.keys(this.options.pseudo).length) {
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
    ...mapActions('Sidebar', ['setSettingElement', 'clearSettingObjectLight', 'setControlPanel']),
    ...mapActions('BuilderModalContent', ['setContent']),

    setInitialValue () {
      if (this.type === 'button') {
        // listen event change border-radius
        let br = this.section.get(`${this.name}.styles['border-radius']`)
        if (undefined !== br) {
          this.borderRadius = parseFloat(br)
        }
      }
      if (this.type === 'text' || this.type === 'button' || this.type === 'link') {
        // listen event change font-size
        let fs = this.section.get(`${this.name}.styles['font-size']`)
        if (undefined !== fs) {
          this.fontSize = parseFloat(fs)
        }

        // listen event change font-family
        let ff = this.section.get(`${this.name}.styles['font-family']`)
        if (undefined !== ff) {
          this.fontFamily = ff
        }
      }
      if (this.options.background === true) {
        this.backgroundUrl = this.options.styles['background-image']
        if (this.options.styles['background-image'] !== '') {
          this.imageBgSelected = true
        }
        this.backgroundSelectedOptions.repeat = this.options.styles['background-repeat'] || DEFAULT_BACKGROUND_REPEAT
        this.backgroundSelectedOptions.position = this.options.styles['background-position'] || DEFAULT_BACKGROUND_POSITION
        this.backgroundSelectedOptions.size = this.options.styles['background-size'] || DEFAULT_BACKGROUND_SIZE
      }
    },

    showStyler (event) {
      event.preventDefault()
      event.stopPropagation()

      let autoSizing = (data) => {
        data.styles.width = this.dimensions.width
        return data
      }

      // show inline styler
      if (!this.popper && this.type !== 'section') {
        this.popper = new Popper(this.el, this.$refs.styler, {
          placement: 'top',
          modifiers: {
            autoSizing: {
              enabled: true,
              fn: autoSizing
            }
          }
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
      this.clearSettingObjectLight()

      /* if (this.type === 'text') {
        this.el.contentEditable = 'true'
      }
      if (this.type === 'title') {
        this.el.contentEditable = 'true'
      }
      if (this.type === 'slogan') {
        this.el.contentEditable = 'true'
      } */

      placeCaretAtEnd(this.el)

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
      // TODO: this work incorrectly
      // document.addEventListener('blur', this.hideStyler);
      // this.currentOption = ''
    },
    hideStyler (event) {
      if (event && (event.target === this.el
        || event.target.parentNode.className === 'b-styler__control'
        || event.target.className === 'b-control-panel')) {
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

      if (this.popperModalProps) {
        this.popperModalProps.destroy()
        this.popperModalProps = null
        this.modalsProps[this.type] = false
      }

      this.setControlPanel(false)

      this.el.contentEditable = 'false'
      this.el.classList.remove('styler-active')

      this.isVisible = false

      document.removeEventListener('click', this.hideStyler, true)
      document.removeEventListener('blur', this.hideStyler, true)

      this.section.set(`${this.name}.text`, this.el.innerHTML)
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
    },

    setModalProps () {
      this.popperModalProps = new Popper(this.$refs[this.type + 'ModalProps'], this.$refs[this.type], {
        placement: 'top'
      })

      this.modalsProps[this.type] = !this.modalsProps[this.type]
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-styler
  display: flex
  justify-content: space-between
  align-items: flex-start
  height: 4rem
  z-index: 20

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
    height: auto
    padding: 2.3rem

    background: $white
    box-shadow: 0px 0.4rem 4rem rgba($black, 0.35)
    &-buttons
      display: flex
      justify-content: flex-end
      margin: $size-step 0 0
    &-chapter
      font-size: 1.6rem
      letter-spacing: -0.02em
      color: $dark-grey
      margin: 0 0 $size-step/2 0
    &_color *
      fill: $dark-blue-krayola
    &_color *
      fill: #4D7DD8
</style>
