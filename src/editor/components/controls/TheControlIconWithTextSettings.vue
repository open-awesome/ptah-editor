<script>
import { mapState, mapActions } from 'vuex'
import { get, merge } from 'lodash-es'
import { LIST_ICONS } from '../../util'

export default {
  name: 'ControlTextWithIconSettings',

  data () {
    return {
      iconName: {},
      color: '',
      value: '',
      left: 0,
      elWidthValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    icon () {
      return this.settingObjectOptions.icon
    },

    icons () {
      const options = LIST_ICONS.map((icon) => {
        return { iconName: icon, value: icon }
      })
      return {
        options
      }
    },

    colorFill () {
      return this.settingObjectOptions.colorFill
    },

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    },

    mediaSizeIconsWidth: {
      get () {
        let w = get(this.settingObjectOptions, `media['is-mobile']['sizeIcons']['width']`)

        if (w === undefined) w = get(this.settingObjectOptions, `sizeIcons['width']`)

        return w
      },

      set (value) {
        let props = {}
        let sizeIcons = {
          width: value
        }
        let media = {
          'is-mobile': {
            'sizeIcons': sizeIcons
          }
        }

        this.isMobile ? props = { 'media': media } : props = { 'sizeIcons': sizeIcons }

        this.updateSettingOptions(merge({}, this.settingObjectOptions, props))
      }
    },

    elWidth: {
      get () {
        let w = 0

        if (this.isMobile) {
          w = this.mediaSizeIconsWidth
        } else {
          w = this.sizeIcons.width
        }

        return w
      },

      set (value) {
        if (this.isMobile) {
          this.mediaSizeIconsWidth = value
        } else {
          this.sizeIcons.width = value
        }
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    visibleIcon () {
      let visible = !this.icon.visible

      this.update('visible', visible)
    },

    changeIcon () {
      let name = this.iconName
      let value = this.iconName

      this.update('name', name)
      this.update('value', value)
    },

    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      let colorFill = {}

      colorFill['color'] = color
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { colorFill }))
    },

    update (prop, value) {
      let icon = {}

      icon[prop] = value
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { icon }))
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
    this.color = this.colorFill.color

    const index = this.icons.options.findIndex(o => o.iconName === this.iconName)

    if (index > 5) {
      this.left = -(index - 4) * 4
    }
  }
}
</script>

<template>
  <div class="b-panel__col">
    <div class="b-panel__control" v-if="icon.visible && !isMobile">
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
          :minimum="32"
          :maximum="128"
          unit="px"
          @input="setWidthValue"
        />
      </base-range-slider>
    </div>
    <div class="b-panel__control" v-if="!isMobile">
      <base-color-picker
        :label="$t('c.iconsColor')"
        v-model="color"
        @change="changeColor"
      />
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
      min-width: 20rem
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
