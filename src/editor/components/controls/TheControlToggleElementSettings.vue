<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

const LIST_ICONS = [
  'checkMark',
  'close',
  'plus'
]

export default {
  name: 'ControlToggleElementSettings',

  data () {
    return {
      icon: {},
      color: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    elColor: {
      get () {
        return this.settingObjectOptions.el.color
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()}` : value
        this.update('color', color)
      }
    },

    elSize: {
      get () {
        return this.settingObjectOptions.el.size
      },

      set (value) {
        this.update('size', value)
      }
    },

    elIcon () {
      return this.settingObjectOptions.el.icon
    },

    elIconVisible: {
      get () {
        return this.settingObjectOptions.el.isIconVisible
      },

      set (value) {
        this.update('isIconVisible', value)
      }
    },

    icons () {
      const options = LIST_ICONS.map((icon) => {
        return { name: icon, value: icon }
      })
      return {
        options
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    visibleIcon () {
      this.elIconVisible = !this.elIconVisible
    },

    changeIcon () {
      this.elIcon.name = this.icon.name
      this.elIcon.value = this.icon.value
    },

    changeColor () {
      this.elColor = this.color
    },

    update (prop, value) {
      let el = {}

      el[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { el }))
    }
  },

  mounted () {
    this.icon = this.elIcon
    this.color = this.elColor
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control" v-if="!isMobile">
      <div class="b-icon-with-text">
        <div class="b-toggle-element-settings__item"
          :class="{ 'b-toggle-element-settings__item_opacity' : false === elIconVisible }"
          >
          <span class="b-toggle-element-settings__item-check"
            @click="visibleIcon"
            title="Show / Hide"
            :class="{ 'b-toggle-element-settings__item-check_color' : true === elIconVisible }"
            >
            <icon-base width="10" height="7" name="checkMark"
              v-show="elIconVisible"
            />
          </span>
          <a class="b-toggle-element-settings__item-button"
            @click="visibleIcon"
            >
            Show icon
          </a>
        </div>
      </div>
    </div>
    <div class="b-text-controls__control" v-if="elIconVisible">
      <base-range-slider v-model="elSize" label="Width icons" step="1" min="14" max="32">
        {{ elSize }} px
      </base-range-slider>
    </div>
    <div class="b-text-controls__control" v-if="elIconVisible && !isMobile">
      <base-select label="Icon" :options="icons.options" :value="icon" v-model="icon" @input="changeIcon"/>
    </div>
    <div class="b-text-controls__control" v-if="elIconVisible && !isMobile">
      <base-color-picker label="Color icon" v-model="color" @change="changeColor"/>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__control
    margin-top: 1rem
.b-toggle-element-settings
  margin: 0.8rem 0
  &__item
    position: relative

    margin: $size-step/2 0
    min-height: $size-step/2

    display: flex
    justify-content: flex-start
    align-items: center

    font-size: 1.6rem
    line-height: 2.4rem
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: $black
      fill: $black
    &-button
      padding: 0 $size-step/2
      border: none
      position: relative
      display: inline-block
      user-select: none
      text-align: left
      width: 20rem
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
    &-check
      width: 2rem
      height: 2rem

      border: 0.2rem solid $grey
      border-radius: 0.3rem
      background: transparent
      text-align: center

      display: inline-block
      & svg
        fill: $dark-grey
        vertical-align: middle

        position: relative
        top: -0.5rem
      &_color
        border: 0.2rem solid rgba($cornflower-blue, 0.5)

</style>
