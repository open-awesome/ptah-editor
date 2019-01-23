<script>
import * as _ from 'lodash-es'
import { getPseudoTemplate, randomPoneId } from '../../util'
import { mapState, mapActions } from 'vuex'
import { getYoutubeVideoIdFromUrl } from '@editor/util'

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
      videoId: '',
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
      ],
      actionList: [
        { name: 'Open URL', value: '' },
        { name: 'Open video popup', value: 'ptah-d-video' }
      ],
      action: { name: 'Open URL', value: '' }
    }
  },

  watch: {
    elTarget (value) {
      let target = (value) ? '_blank' : '_self'
      this.$emit('setOption', ['target', target])
    },

    expand () {
      this.controlOpen = this.expand
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement'
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
    },

    videoLink () {
      return this.settingObjectOptions.video
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

    if (pBackgroundImage && pBackgroundImage !== 'none') {
      let images = pBackgroundImage.match(/url\(.+(?=\))/g) || []
      let result = images.map(url => url.replace(/url\(/, ''))[0]
      this.bgHoverImage = (result.match(/^("")|("")$/)) ? JSON.parse(result) : result
    }

    this.textH = pColor || this.styles['color']

    this.bgRepeat = pBackgroundRepeat || 'no-repeat'
    this.bgSize = pBackgroundSize || 'cover'

    this.animationList.forEach(function (item, i, arr) {
      if (self.animation.value !== undefined && self.animation.value === self.animationList[i].value) {
        self.animationClass = item
      }
    })

    this.controlOpen = this.expand

    this.videoId = this.videoLink || ''
    if (this.videoId.length) {
      this.action = { name: 'Open video popup', value: 'ptah-d-video' }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'updateText'
    ]),

    setUrl () {
      this.elLink['href'] = this.link
      this.setOption(['href', this.link])
    },

    changeTarget () {
      this.elLink['target'] = this.target === true ? '_blank' : '_self'
      this.setOption(['target', this.target])
    },

    setVideoUrl () {
      let ytId = getYoutubeVideoIdFromUrl(this.videoId)

      if (ytId) {
        // this.$emit('setAction', ['video', ytId])
        this.setElAction(['video', ytId])
      }
    },

    changeBgColor () {
      this.changePseudo('background-color', this.bgH.hex)
    },

    changeBgImage () {
      let bg = 'none'
      if (this.bgHoverImage !== null && this.bgHoverImage !== '') {
        bg = 'url(' + this.bgHoverImage + ')'
      }
      this.changePseudo('background-image', bg)
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
      this.settingObjectElement.dataset.pone = poneId

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
    },

    changeAction () {
      if (this.action.value === '') {
        this.setElAction(['href', this.link])
      }
    },

    setElAction (value) {
      let action = value[0]
      let classes = this.settingObjectOptions.classes

      classes.forEach((name, index) => {
        if (name.indexOf('ptah-d') > -1) {
          classes.splice(index, 1)
        }
      })

      if (action === 'href') {
        this.videoId = ''
        this.settingObjectElement.classList.remove('ptah-d-video')
        this.setOption(value)
        this.setOption(['video', false])
      } else {
        classes.push('ptah-d-video')
        this.settingObjectElement.dataset.video = value[1]
        this.setOption(value.slice())
      }
    },

    setOption (option) {
      this.updateText()
      let obj = {}
      obj[option[0]] = option[1]
      let merge = _.merge({}, this.settingObjectOptions, obj)
      delete merge.element
      this.updateSettingOptions(merge)
    }
  }
}
</script>

<template>
  <div class="b-link-controls">
    <div class="b-link-controls__header" @click="onClickTitle">
      <span>Action</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen"  :hasOverflow="controlOpen">
      <!-- action -->
      <div class="b-link-controls__control">
        <base-select label="Action" :options="actionList" v-model="action" @input="changeAction"></base-select>
      </div>

      <!-- open link -->
      <div class="b-link-controls__control" v-if="action.value === ''">
        <base-text-field v-model="link" label="URL" @input="setUrl" placeholder="Type link here"></base-text-field>
      </div>
      <div class="b-link-controls__control" v-if="action.value === ''">
        <input type="checkbox" id="target" v-model="target" @change="changeTarget"> <label for="target">open in new window</label>
      </div>

      <!-- video popup -->
      <div class="b-link-controls__control" v-if="action.value === 'ptah-d-video'">
        <base-text-field v-model="videoId" label="Video" @input="setVideoUrl" placeholder="Youtube video url"></base-text-field>
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
