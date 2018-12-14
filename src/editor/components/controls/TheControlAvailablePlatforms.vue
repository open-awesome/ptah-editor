<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlAvailablePlatforms',

  components: {
    VuseIcon
  },

  props: {
    expand: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      color: '',
      elWidth: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    platforms () {
      return this.settingObjectOptions.availablePlatforms
    },

    colorFill () {
      return this.settingObjectOptions.colorFill
    },

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    }
  },

  watch: {
    expand () {
      this.controlOpen = this.expand
    }
  },

  methods: {
    visible (key) {
      this.platforms[key].visible = !this.platforms[key].visible
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
    },
    changeWidth () {
      if (this.elWidth > 0) {
        this.sizeIcons['width'] = this.elWidth
      }
    },
    onClickTitle () {
      this.$emit('open', ['AvailablePlatforms', !this.controlOpen])
    }
  },

  mounted () {
    this.color = this.colorFill.color
    this.elWidth = this.sizeIcons.width
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Icons settings</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-size-controls__control">
        <base-range-slider v-model="elWidth" label="Width icons" step="8" min="16" max="128" @change="changeWidth">
          {{elWidth}} px
        </base-range-slider>
      </div>
      <div class="b-text-controls__control">
        <base-color-picker label="Color icons" v-model="color" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-text-controls__control">
        <div>Visible platforms</div>
        <div class="b-available-platforms">
          <div class="b-available-platforms__item is-editable"
            v-for="(value, key) in platforms" :key="key"
            :class="{ 'b-available-platforms__item_opacity' : false === platforms[key].visible }"
            @click="visible(key)"
            >

            <span class="b-socials__item-eye"
              title="Show / Hide"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <a class="b-available-platforms__item-button"
              :title="platforms[key].name"
              >
              {{ platforms[key].name }}
            </a>

          </div>
        </div><!--/.b-available-platforms-->
      </div>
    </base-dropdown>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
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

.b-available-platforms
  width: 100%
  max-width: 100rem
  margin: 1rem auto
  display: inline-block
  min-height: 5rem
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &-chapter
    font-size: 2rem
    text-align: center
    display: block
    width: 100%
    &__text
      display: inline-block
      margin: 2rem 0
  &__item
    position: relative
    margin: 0.5rem 0
    display: block
    color: #4D7DD8
    fill: #4D7DD8
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: #000
      fill: #000
    &-button
      padding: 0 1rem
      border: none
      position: relative
      display: inline-block
      user-select: none
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
    &-eye
      border: none
      background: transparent
      padding: 0 0.5rem
      display: inline-block
</style>
