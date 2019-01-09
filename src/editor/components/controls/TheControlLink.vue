<script>
import { mapState } from 'vuex'

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

  created () {
    this.link = this.elLink
    this.target = this.elTarget === '_blank'
    this.bgH = this.bghover
    this.textH = this.textHover
    this.animationClass = this.animation
    this.controlOpen = this.expand
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
      'settingObjectOptions'
    ]),

    elLink () {
      return this.settingObjectOptions.elLink
    },

    elTarget () {
      return this.settingObjectOptions.elTarget
    },

    bgHover () {
      return this.settingObjectOptions.bgHover
    },

    textHover () {
      return this.settingObjectOptions.textHover
    },

    animation () {
      return this.settingObjectOptions.animation
    }

  },

  methods: {
    setUrl () {
      this.elLink.href = this.link
    },

    changeTarget () {
      this.elLink.target = this.target
    },

    changeBgColor () {
      this.$emit('setPseudo', { 'background-color': this.bgH.hex + '!important' })
    },

    changeTextColor () {
      this.$emit('setPseudo', { 'color': this.textH.hex + '!important' })
    },

    changeAinmation () {
      this.$emit('setClass', this.animationClass.value)
    },

    onClickTitle () {
      this.$emit('open', ['Link', !this.controlOpen])
    }
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
        <base-select label="Animation" :options="animationList" v-model="animationClass" @input="changeAinmation"></base-select>
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
