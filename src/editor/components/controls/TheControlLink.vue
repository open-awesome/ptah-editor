<script>
import * as _ from 'lodash-es'
import { getPseudoTemplate, randomPoneId } from '../../util'
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    expand: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      link: '',
      target: '',
      bgH: '',
      bgHoverImage: '',
      textH: '',
      animationList: [
        { name: 'none', value: '' },
        { name: 'tada', value: 'ptah-a-tada' },
        { name: 'fade', value: 'ptah-a-fade' },
        { name: 'shake', value: 'ptah-a-shake' },
        { name: 'bounce', value: 'ptah-a-bounce' }
      ],
      animationClass: {},
      bgRepeat: '',
      bgSize: '',
      list: [
        { text: 'No-repeat', value: 'no-repeat' },
        { text: 'Repeat', value: 'repeat' }
      ],
      sizeList: [
        { text: 'Tile', value: 'cover' },
        { text: 'Fill', value: 'contain' }
      ]
    }
  },

  watch: {
    expand () {
      this.controlOpen = this.expand
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    elLink () {
      return this.settingObjectOptions.link
    },

    animation () {
      return this.settingObjectOptions.animation
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
    },

    classes: {
      get: function () {
        return this.settingObjectOptions.classes
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { classes: newValue }))
      }
    }

  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setUrl () {
      this.elLink['href'] = this.link
    },

    changeTarget () {
      this.elLink['target'] = this.target === true ? '_blank' : '_self'
    },

    changeBgColor () {
      this.changePseudo('background-color', this.bgH.hex)
    },

    changeBgImage () {
      this.changePseudo('background-image', 'url(' + this.bgHoverImage + ')')
    },

    changeRepeat () {
      this.changePseudo('background-repeat', this.bgRepeat)
    },

    changeSize () {
      this.changePseudo('background-size', this.bgSize)
    },

    changeTextColor () {
      this.changePseudo('color', this.textH.hex)
    },

    changeAnimation () {
      this.selectAnimation(this.animationClass.value)
    },

    onClickTitle () {
      this.$emit('open', ['Link', !this.controlOpen])
    },

    changePseudo (attr, style, pseudoClass = 'hover') {
      if (style !== '') {
        this.changePseudoStyle(attr, style + '!important')
        this.pseudo[pseudoClass][attr] = style + '!important'
      }
    },

    /**
     * Add style to pseudocalss
     * @param attr {string}
     * @param style {string}
     * @param pseudoClass {string}
     */
    changePseudoStyle (attr, style, pseudoClass = 'hover') {
      const poneId = randomPoneId()
      this.pseudo[pseudoClass][attr] = style
      this.settingObjectOptions.element.dataset.pone = poneId

      let styleTemplate = getPseudoTemplate(poneId, this.settingObjectOptions.pseudo)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    /**
     * Add animation to element
     */
    selectAnimation (className) {
      let animations = this.classes.slice(0)

      animations.forEach((name, index) => {
        // remove other animation classes
        if (name.indexOf('ptah-a') > -1) {
          animations.splice(index, 1)
        }
      })
      animations.push(className)

      this.classes = _.merge([], this.classes, animations)
      this.animation['value'] = animations[0]
    }
  },

  created () {
    let self = this
    let pBackgroundColor = this.pseudo['hover']['background-color'].split('!')[0]
    let pBackgroundImage = this.pseudo['hover']['background-image'].split('!')[0]
    let pBackgroundRepeat = this.pseudo['hover']['background-repeat'].split('!')[0]
    let pBackgroundSize = this.pseudo['hover']['background-size'].split('!')[0]
    let pColor = this.pseudo['hover']['color'].split('!')[0]

    this.link = this.elLink.href
    this.target = this.elLink.target === '_blank'

    this.bgH = pBackgroundColor || this.styles['background-color']
    this.bgHoverImage = pBackgroundImage.length > 0 ? pBackgroundImage.match(/url\(.+(?=\))/g).map(url => url.replace(/url\(/, ''))[0] : ''

    this.textH = pColor || this.styles['color']

    this.bgRepeat = pBackgroundRepeat || 'no-repeat'
    this.bgSize = pBackgroundSize || 'cover'

    this.animationList.forEach(function (item, i, arr) {
      if (self.animation.value !== undefined && self.animation.value === self.animationList[i].value) {
        self.animationClass = item
      }
    })

    this.controlOpen = this.expand
  }
}
</script>

<template>
  <div class="b-link-controls">
    <div class="b-link-controls__header" @click="onClickTitle">
      <span>Link</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen"  :hasOverflow="controlOpen">
      <div class="b-link-controls__control">
        <base-text-field v-model="link" label="URL" @input="setUrl" placeholder="Type link here"></base-text-field>
      </div>
      <div class="b-link-controls__control">
        <input type="checkbox" id="target" v-model="target" @change="changeTarget"> <label for="target">open in new window</label>
      </div>
      <div class="b-link-controls__control">
        <base-color-picker label="Background hover color" v-model="bgH" @change="changeBgColor"></base-color-picker>
      </div>
      <div class="b-link-controls__control">
        <base-uploader
          v-model="bgHoverImage"
          @change="changeBgImage"
          label="Background hover image">
        </base-uploader>
      </div>
      <div class="b-link-controls__control">
        <BaseButtonTabs :list="list" v-model="bgRepeat" @change="changeRepeat"/>
      </div>
      <div class="b-link-controls__control">
        <BaseButtonTabs :list="sizeList" v-model="bgSize" @change="changeSize"/>
      </div>
      <div class="b-link-controls__control">
        <base-color-picker label="Text hover color" v-model="textH" @change="changeTextColor"></base-color-picker>
      </div>
      <div class="b-link-controls__control">
        <base-select label="Animation" :options="animationList" v-model="animationClass" @input="changeAnimation"></base-select>
      </div>
    </base-dropdown>
  </div>
</template>

<style lang="sass" scoped>
  .b-link-controls
    &__header
      font-size: 1.6rem
      height: 3.2rem
      color: #272727
      display: flex
      align-items: center
      cursor: pointer
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__control
      margin-top: 2.2rem
      input[type="checkbox"]
        position: relative
        bottom: -1px
      label
        color: #272727
        font-size: 1.6rem
</style>
