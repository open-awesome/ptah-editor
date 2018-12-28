<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import { getYoutubeVideoIdFromUrl } from '@editor/util'

export default {
  props: {
    link: {
      type: String,
      required: true
    },
    videoLink: {
      type: [String, Boolean]
    },
    target: {
      type: [String, Boolean]
    },
    hoverBgColor: {
      type: String
    },
    hoverTextColor: {
      type: String
    },
    animationClass: {
      type: String
    },
    expand: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      elLink: '',
      elTarget: '',
      videoId: '',
      bgHoverColor: '',
      textHoverColor: '',
      animationList: [
        { name: 'none', value: '' },
        { name: 'tada', value: 'ptah-a-tada' },
        { name: 'fade', value: 'ptah-a-fade' },
        { name: 'shake', value: 'ptah-a-shake' },
        { name: 'bounce', value: 'ptah-a-bounce' }
      ],
      animation: {},
      actionList: [
        { name: 'Open URL', value: '' },
        { name: 'Open video popup', value: 'ptah-d-video' }
      ],
      action: { name: 'Open URL', value: '' }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement'
    ])
  },

  created () {
    this.elLink = this.link
    this.elTarget = this.target === '_blank'
    this.bgHoverColor = this.hoverBgColor
    this.textHoverColor = this.hoverTextColor
    this.animation = this.animationClass
    this.controlOpen = this.expand
    this.videoId = this.videoLink
    if (this.videoId.length) {
      this.action = { name: 'Open video popup', value: 'ptah-d-video' }
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

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'updateText'
    ]),

    setUrl () {
      // this.$emit('setAction', ['href', this.elLink])
      this.setElAction(['href', this.elLink])
    },

    setVideoUrl () {
      let ytId = getYoutubeVideoIdFromUrl(this.videoId)

      if (ytId) {
        // this.$emit('setAction', ['video', ytId])
        this.setElAction(['video', ytId])
      }
    },

    changeBgColor () {
      this.$emit('setPseudo', { 'background-color': this.bgHoverColor.hex + '!important' })
    },

    changeTextColor () {
      this.$emit('setPseudo', { 'color': this.textHoverColor.hex + '!important' })
    },

    changeAinmation () {
      this.$emit('setClass', this.animation.value)
    },

    onClickTitle () {
      this.$emit('open', ['Link', !this.controlOpen])
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
        this.setOption(value)
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
        <base-select label="Action" :options="actionList" v-model="action"></base-select>
      </div>

      <!-- open link -->
      <div class="b-link-controls__control" v-if="action.value === ''">
        <base-text-field v-model="elLink" label="URL" @input="setUrl" placeholder="Type link here"></base-text-field>
      </div>
      <div class="b-link-controls__control" v-if="action.value === ''">
        <input type="checkbox" id="target" v-model="elTarget"> <label for="target">open in new window</label>
      </div>

      <!-- video popup -->
      <div class="b-link-controls__control" v-if="action.value === 'ptah-d-video'">
        <base-text-field v-model="videoId" label="Video" @input="setVideoUrl" placeholder="Youtube video url"></base-text-field>
      </div>

      <div class="b-link-controls__control">
        <base-color-picker label="Background hover color" v-model="bgHoverColor" @change="changeBgColor"></base-color-picker>
      </div>
      <div class="b-link-controls__control">
        <base-color-picker label="Text hover color" v-model="textHoverColor" @change="changeTextColor"></base-color-picker>
      </div>
      <div class="b-link-controls__control">
        <base-select label="Animation" :options="animationList" v-model="animation" @input="changeAinmation"></base-select>
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
