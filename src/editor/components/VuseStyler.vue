<template>
  <div class="styler is-editable" ref="styler" id="styler" v-if="$builder.isEditing" :class="{ 'is-visible': isVisible }"
       @click.stop="">
  </div>
</template>

<script>
import { isParentTo, randomPoneId, getPseudoTemplate, placeCaretAtEnd } from '../util'
import * as _ from 'lodash-es'
import { mapMutations, mapActions } from 'vuex'

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
    }
  },
  data: () => ({
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
    resizer: null
  }),
  computed: {
    dmsToFixed () {
      return {
        width: parseInt(this.dimensions.width).toFixed(0),
        height: parseInt(this.dimensions.height).toFixed(0)
      }
    },
    // find path to element
    path () {
      let path = _.split(this.name, '.')[1]
      return _.toPath(path)
    },
    isArrayEl () {
      if (this.type === 'section' || this.type === 'header') return false
      return this.name.indexOf('[') > 0
    },
    isFirstInArray () {
      return parseInt(this.path[1]) === 0
    },
    isLastInArray () {
      return (parseInt(this.path[1]) + 1) === this.section.data[this.path[0]].length
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
      })
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
    ...mapMutations('Sidebar', ['toggleSandboxSidebar', 'setSandboxPaths']),
    ...mapActions('Sidebar', ['setSettingElement', 'clearSettingObjectLight']),
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
    /**
     * create/clone element in componetns
     */
    addItem (event) {
      let newObj = null
      let path = _.split(this.name, '.')[1]
      let devObj = this.section.data.defObj
      let obj = null

      if (path.indexOf('[') > 0) {
        path = _.toPath(path)
      }

      if (event === 'clone') {
        newObj = JSON.parse(JSON.stringify(this.section.data[path[0]][parseInt(path[1])]))
      } else if (event === 'create' && devObj[path[0]] !== undefined) {
        newObj = JSON.parse(JSON.stringify(this.section.data.defObj[path[0]]))
      }

      obj = Object.assign({}, newObj)
      this.section.data[path[0]].push(obj)
    },
    showStyler (event) {
      // --- clear active classes
      document.querySelectorAll('.b-draggable-slot.active')
        .forEach(el => el.classList.remove('active'))

      event.preventDefault()
      event.stopPropagation()

      this.toggleSandboxSidebar(false)
      this.setContent(null)
      this.clearSettingObjectLight()

      if (this.type === 'text') {
        this.el.contentEditable = 'true'
      }
      if (this.type === 'title') {
        this.el.contentEditable = 'true'
      }
      if (this.type === 'link') {
        this.el.contentEditable = 'true'
      }
      if (this.type === 'button') {
        this.el.contentEditable = 'true'
      }

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
            this.toggleSandboxSidebar(true)
          }
          this.setSettingElement({
            type: this.$props.type, // TODO: $props.type !== type ?
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
      this.el.contentEditable = 'false'
      if (event && isParentTo(event.target, this.$el)) {
        return
      }

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
    }
  }
}
</script>
