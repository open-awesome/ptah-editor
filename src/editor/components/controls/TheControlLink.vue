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
      textH: '',
      animationList: [
        { name: 'none', value: '' },
        { name: 'tada', value: 'ptah-a-tada' },
        { name: 'fade', value: 'ptah-a-fade' },
        { name: 'shake', value: 'ptah-a-shake' },
        { name: 'bounce', value: 'ptah-a-bounce' }
      ],
      animationClass: {}
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

    classes () {
      return this.settingObjectOptions.classes
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
      this.changePseudoStyle('background-color', this.bgH.hex + '!important')
      this.pseudo['hover']['background-color'] = this.bgH.hex + ' !important'
    },

    changeTextColor () {
      this.changePseudoStyle('color', this.textH.hex + '!important')
      this.pseudo['hover']['color'] = this.textH.hex + ' !important'
    },

    changeAnimation () {
      this.selectAnimation(this.animationClass.value)
    },

    onClickTitle () {
      this.$emit('open', ['Link', !this.controlOpen])
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
      let animations = this.classes.list.slice(0)

      animations.forEach((name, index) => {
        // remove other animation classes
        if (name.indexOf('ptah-a') > -1) {
          animations.splice(index, 1)
        }
      })
      animations.push(className)

      this.classes.list = _.merge([], this.classes.list, animations)
      this.animation['value'] = animations[0]
    }
  },

  mounted () {
    let self = this
    let pBackgroundColor = this.pseudo['hover']['background-color']
    let pColor = this.pseudo['hover']['color']

    this.link = this.elLink.href
    this.target = this.elLink.target === '_blank'
    this.bgH = pBackgroundColor.split('!')[0] || this.styles['background-color']
    this.textH = pColor.split('!')[0] || this.styles['color']
    this.controlOpen = this.expand

    this.animationList.forEach(function (item, i, arr) {
      if (self.animation.value !== undefined && self.animation.value === self.animationList[i].value) {
        self.animationClass = item
      }
    })
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
