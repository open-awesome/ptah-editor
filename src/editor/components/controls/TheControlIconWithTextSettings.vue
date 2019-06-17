<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

const LIST_ICONS = [
  'checkMark',
  'close',
  'plus'
]

export default {
  name: 'ControlTextWithIconSettings',

  data () {
    return {
      iconName: {},
      color: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    icon () {
      return this.settingObjectOptions.icon
    },

    icons () {
      const options = LIST_ICONS.map((icon) => {
        return { name: icon, value: icon }
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
      let name = this.iconName.value
      let value = this.iconName.value

      this.update('name', name)
      this.update('value', value)
    },

    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      let colorFill = {}

      colorFill['color'] = color
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { colorFill }))
    },

    update (prop, value) {
      let icon = {}

      icon[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { icon }))
    }
  },

  mounted () {
    this.iconName = this.icon
    this.color = this.colorFill.color
    this.elWidth = this.sizeIcons.width
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <div>Visible icon</div>
      <div class="b-icon-with-text">
        <div class="b-icon-with-text__item"
          :class="{ 'b-icon-with-text__item_opacity' : false === icon.visible }"
          @click="visibleIcon"
        >

          <span class="b-icon-with-text__item-check"
            title="Show / Hide"
            :class="{ 'b-icon-with-text__item-check_color' : true === icon.visible }"
            >
             <icon-base width="10" height="7" name="checkMark"
               v-show="icon.visible"
             />
          </span>

          <a class="b-icon-with-text__item-button"
            title="Visible icon"
            >
            Visible
          </a>

        </div>
      </div>
    </div>
    <div class="b-text-controls__control" v-if="icon.visible">
      <base-select label="Icon" :options="icons.options" :value="iconName" v-model="iconName" @input="changeIcon"></base-select>
    </div>
    <div class="b-text-controls__control" v-if="icon.visible">
      <base-range-slider v-model="sizeIcons.width" label="Width icons" step="2" min="14" max="34">
        {{ sizeIcons.width }} px
      </base-range-slider>
    </div>
    <div class="b-text-controls__control" v-if="icon.visible">
      <base-color-picker label="Color icon" v-model="color" @change="changeColor"></base-color-picker>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  margin-bottom: 1.6rem
  &__control
    margin-top: 2.2rem
.b-icon-with-text
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
