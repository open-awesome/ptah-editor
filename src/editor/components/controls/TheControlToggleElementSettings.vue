<script>
import { merge } from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import { LIST_ICONS } from '../../util'

export default {
  name: 'ControlToggleElementSettings',

  data () {
    return {
      iconName: '',
      color: '',
      left: 0,
      elWidthValue: 0
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

    elWidth: {
      get () {
        return this.settingObjectOptions.sizeIcons.width
      },

      set (value) {
        let sizeIcons = {}

        sizeIcons['width'] = value
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { sizeIcons: sizeIcons }))
      }
    },

    icon () {
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
        return { iconName: icon, value: icon }
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
      let name = this.iconName
      let value = this.iconName

      this.updateIcon('name', name)
      this.updateIcon('value', value)
    },

    changeColor () {
      this.elColor = this.color
    },

    update (prop, value) {
      let el = {}

      el[prop] = value
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { el }))
    },

    updateIcon (prop, value) {
      let el = { icon: {} }

      el['icon'][prop] = value
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { el }))
    },

    changeLeft (x) {
      this.left += x
    },

    setWidth (value) {
      this.elWidthValue = value
    },

    setWidthValue (value) {
      this.elWidth = value
    }
  },

  mounted () {
    this.iconName = this.icon.name
    this.color = this.elColor
    this.elWidthValue = this.elWidth

    const index = this.icons.options.findIndex(o => o.iconName === this.iconName)

    if (index > 5) {
      this.left = -(index - 4) * 4
    }
  }
}
</script>

<template>
  <div>
    <div class="b-panel__control" v-if="!isMobile">
      <div class="b-panel__row">
        <base-caption>
          Icon settings
        </base-caption>
        <div class="b-panel__col">
          <base-switcher
            v-model="elIconVisible"
          />
        </div>
      </div>
    </div>
    <div class="b-panel__control" v-if="elIconVisible && !isMobile">
      <div class="b-panel__col">
        <base-label>
          Choose icon
        </base-label>
        <div class="b-panel__control">
          <div class="b-icons-list">
            <div class="b-icons-list__content">
              <BaseButtonTabs
                class="b-icons-list__tabs"
                type="buttons"
                :list="icons.options"
                v-model="iconName"
                @change="changeIcon"
                :style="[{'left': left + 'rem'}]"
              />
            </div>
            <span
              v-show="left !== 0"
              class="b-icons-list__arrow _left"
              @click="changeLeft(4)"
            >
              <IconBase name="arrowRight" />
            </span>
            <span
              v-show="left >= -((icons.options.length - 6) * 4)"
              class="b-icons-list__arrow _right"
              @click="changeLeft(-4)"
            >
              <IconBase name="arrowRight" />
            </span>
          </div>
        </div>
        <div class="b-panel__control">
          <base-range-slider
            position-label="left"
            v-model="elWidth"
            :label="$t('c.width')"
            step="8"
            min="16"
            max="128"
            @change="setWidth"
          >
            <base-number-input
              :value="elWidthValue"
              :minimum="16"
              :maximum="128"
              unit="px"
              @input="setWidthValue"
            />
          </base-range-slider>
        </div>
        <div class="b-text-controls__control" v-if=" !isMobile">
          <base-color-picker
            label="Color icon"
            v-model="color"
            @change="changeColor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .b-icons-list
    height: 5rem
    padding: 0 2rem
    overflow: hidden
    position: relative
    &__content
      width: 20rem
      height: 5rem
      overflow: hidden
      position: relative
    &__tabs
      width: 100%
      position: absolute
      top: 0

      transition: left .3s
      /deep/
        .b-base-button-tabs__row
          justify-content: flex-start !important
          flex-wrap: nowrap !important
          & svg
            stroke: none !important
    &__arrow
      position: absolute
      top: 30%
      width: 10px
      height: 10px
      cursor: pointer

      & svg
        fill: #00ADB6
      &._left
        left: 0.5rem
        & svg
          transform: rotate(-180deg)
      &._right
        right: 1rem
</style>
