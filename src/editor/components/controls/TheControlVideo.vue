<template>
<div class="b-video-control">

  <header @click="onClickTitle" class="b-video-control__header">
    <span>Video</span>
    <i :class="{ 'dropped': !controlOpen }">
    <icon-base
        :class="{ closed: !controlOpen }"
        name="arrowDropDown"
        width="8"
        height="8"
        class="b-video-control__icon"/>
    </i>
  </header>

  <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <!-- VideoUrl -->
      <div class="b-video-control__control">
        <BaseUploadInput
          v-model="vUrl"
          label="Video URL"
          @upload="updateSimpleValue('videoUrl', vUrl)"
        />
      </div>

      <div class="b-video-control__description">
        YouTube video url or any mp4 file url is allowed.
      </div>

      <div class="b-video-control__control">
        <BaseSwitcher
          v-model="vLoop"
          label="Loop"
          @change="updateSimpleValue('loop', vLoop)"
        />
      </div>
  </base-dropdown>

</div>
</template>

<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TheControlVideo',

  props: {
    expand: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      vUrl: '',
      vLoop: ''
    }
  },

  watch: {
    expand: {
      immediate: true,
      handler (value) {
        this.controlOpen = value
      }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    videoUrl: {
      get: function () {
        return this.settingObjectOptions.videoUrl
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { 'videoUrl': newValue }))
      }
    },

    loop: {
      get: function () {
        return this.settingObjectOptions.loop
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { 'loop': newValue }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    onClickTitle () {
      console.log(1)
      this.$emit('open', ['Video', !this.controlOpen])
    },

    updateSimpleValue (propName, value) {
      this[propName] = value
    }
  },

  mounted () {
    this.vUrl = this.videoUrl
    this.vLoop = this.loop
    this.controlOpen = this.expand
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-video-control
  &__header
    margin-bottom: .8rem

    display: flex
    align-items: center

    font-size: 2.2rem
    color: $dark-grey
    cursor: pointer
  &__title
    margin: 0
    font-weight: normal
    color: $dark-grey
  &__icon
    margin-left: .5rem
    margin-bottom: -.5rem

    transform: rotate(180deg)
    &.closed
      transform: rotate(0deg)

  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: $dark-grey
    display: flex
    align-items: center
    cursor: pointer
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
      & svg
        display: inline-block
        vertical-align: baseline
        margin-bottom: 0.2rem
  &__description
    padding: $size-step/8 0
    font-size: 1.2rem
    color: $dark-grey
  &__control
    margin-top: 2.2rem
</style>
