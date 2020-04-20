<script>
import { mapState, mapActions } from 'vuex'
import { camelCase, merge } from 'lodash-es'

export default {
  name: 'ControlBox',

  data () {
    return {
      isLoading: false,
      lockMargins: false,
      lockPaddings: false,
      padding: {
        paddingTop: 'padding-top',
        paddingRight: 'padding-right',
        paddingBottom: 'padding-bottom',
        paddingLeft: 'padding-left'
      },
      margin: {
        marginTop: 'margin-top',
        marginRight: 'margin-right',
        marginBottom: 'margin-bottom',
        marginLeft: 'margin-left'
      }
    }
  },

  props: {
    hideMargin: {
      type: Boolean,
      default: false
    },
    hidePadding: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'device',
      'isMobile'
    ]),

    marginLeft: {
      get () {
        return this.getStyleNumberValue('margin-left')
      },

      set (value) {
        this.setter('margin', 'marginLeft', value)
      }
    },

    marginRight: {
      get () {
        return this.getStyleNumberValue('margin-right')
      },

      set (value) {
        this.setter('margin', 'marginRight', value)
      }
    },

    marginTop: {
      get () {
        return this.getStyleNumberValue('margin-top')
      },

      set (value) {
        this.setter('margin', 'marginTop', value)
      }
    },

    marginBottom: {
      get () {
        return this.getStyleNumberValue('margin-bottom')
      },

      set (value) {
        this.setter('margin', 'marginBottom', value)
      }
    },

    paddingLeft: {
      get () {
        return this.getStyleNumberValue('padding-left')
      },

      set (value) {
        this.setter('padding', 'paddingLeft', value)
      }
    },

    paddingRight: {
      get () {
        return this.getStyleNumberValue('padding-right')
      },

      set (value) {
        this.setter('padding', 'paddingRight', value)
      }
    },

    paddingTop: {
      get () {
        return this.getStyleNumberValue('padding-top')
      },

      set (value) {
        this.setter('padding', 'paddingTop', value)
      }
    },

    paddingBottom: {
      get () {
        return this.getStyleNumberValue('padding-bottom')
      },

      set (value) {
        this.setter('padding', 'paddingBottom', value)
      }
    },

    isMain () {
      return this.settingObjectElement.classList.contains('ptah-g-main')
    },

    isChild () {
      return this.settingObjectElement.classList.contains('ptah-g-child')
    },

    isTextTooltipMain () {
      return this.isMain ? this.$t('s.sectionOfGroup') : ''
    },

    tooltipMain () {
      return this.isMain ? 'tooltip' : ''
    },

    isTextTooltipChild () {
      return this.isChild ? this.$t('s.sectionOfGroup') : ''
    },

    tooltipChild () {
      return this.isChild ? 'tooltip' : ''
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    getStyleNumberValue (prop) {
      let props = {}
      let s = {}
      let styles = this.settingObjectOptions.styles
      let stylesMedia = {}

      if (this.settingObjectOptions.media && this.settingObjectOptions.media['is-mobile']) {
        stylesMedia = this.settingObjectOptions.media['is-mobile']
      } else {
        stylesMedia[prop] = styles[prop]
      }

      if (this.isMobile) {
        props = stylesMedia
      } else {
        props = styles
      }

      s = props[prop]

      if (s === undefined) {
        // get values from node
        let style = window.getComputedStyle(this.settingObjectElement)
        s = style[camelCase(prop)]
      }

      if (this.isMain && (prop === 'padding-bottom' || prop === 'margin-top')) {
        let style = window.getComputedStyle(this.settingObjectElement)
        s = style[camelCase(prop)]
      }

      if (this.isChild && prop === 'margin-top') {
        let style = window.getComputedStyle(this.settingObjectElement)
        s = style[camelCase(prop)]
      }
      return parseInt(s)
    },

    setter (group, prop, value) {
      if ((group === 'padding' && this.lockPaddings) || (group === 'margin' && this.lockMargins)) {
        Object.keys(this[group]).forEach((key) => this.update(group, key, value))
      } else {
        this.update(group, prop, value)
      }
    },

    update (group, prop, value) {
      let [props, styles, media, property] = [{}, {}, {}, this[group][prop]]
      if (value === '') value = 0

      styles[property] = value + 'px'
      media['is-mobile'] = {}
      media['is-mobile'][property] = value + 'px'

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

      this.updateSettingOptions(merge({}, this.settingObjectOptions, props))
    }
  },

  mounted () {
    setTimeout(() => {
      this.isLoading = true
    }, 150)
  }
}
</script>

<template>
<div>
  <div v-if="isLoading">
    <base-caption help="Set margins and paddings">
      {{ $t('c.editIndents') }}
    </base-caption>
    <div class="control-box">

      <!-- preview -->
      <div class="control-box__element-edge">
        <div class="control-box__content-edge">
          <IconBase name="backgroundGrey" />
        </div>
      </div>
      <div class="control-box__title-m" v-if="!hideMargin">
        {{ $t('c.margin') }}
      </div>
      <div class="control-box__title-p" v-if="!hidePadding">
        {{ $t('c.padding') }}
      </div>
      <!-- CONTROLS -->
      <!-- margin -->
      <template v-if="!hideMargin">
        <base-number-field v-model="marginLeft" class="ctrl ctrl__m-left" pattern="" />
        <base-number-field v-model="marginRight" class="ctrl ctrl__m-right" />
        <base-number-field v-model="marginTop" class="ctrl ctrl__m-top"
          :disabled="isChild"
          :[tooltipChild]="isTextTooltipChild"
          tooltip-position="top"
        />
        <base-number-field v-model="marginBottom" class="ctrl ctrl__m-bottom" />
      </template>
      <!-- padding -->
      <template v-if="!hidePadding">
        <base-number-field v-model="paddingLeft" class="ctrl ctrl__p-left" />
        <base-number-field v-model="paddingRight" class="ctrl ctrl__p-right" />
        <base-number-field v-model="paddingTop" class="ctrl ctrl__p-top" />
        <base-number-field v-model="paddingBottom" class="ctrl ctrl__p-bottom"
          :disabled="isMain"
          :[tooltipMain]="isTextTooltipMain"
          tooltip-position="bottom"
        />
      </template>
      <!-- locks -->
      <a href="#"
         class="control-box__lock control-box__lock--margin"
         :class="{ 'active': lockMargins }"
         @click.prevent="lockMargins = !lockMargins"
         v-if="!hideMargin"
        >
        <IconBase name="chain" />
      </a>
      <a href="#"
         class="control-box__lock control-box__lock--padding"
         :class="{ 'active': lockPaddings }"
         @click.prevent="lockPaddings = !lockPaddings"
         v-if="!hidePadding"
        >
        <IconBase name="chain" />
      </a>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.control-box
  $this: &

  width: 100%
  max-width: 24rem
  height: 22rem
  margin: 0 0 0 1rem

  box-sizing: border-box
  border: 1px dashed #00ADB6
  border-radius: 5px
  background: rgba(88, 199, 205, 0.1)

  position: relative

  display: flex
  justify-content: center
  align-items: center

  font-size: 1rem
  transition: border-color 0.1s ease
  &:hover
    border-color: $main-green
    #{$this}__element-edge
      border-color: $main-green

  &__element-edge
    width: 17.4rem
    height: 13.6rem
    background: #FFFFFF
    border-radius: .5rem
    border: .2rem solid #00ADB6

    display: flex
    justify-content: center
    align-items: center
    transition: border-color 0.1s ease

  &__content-edge
    width: 9.4rem
    height: 4.0rem
    background: rgba(88, 199, 205, 0.3)
    border: .1rem dashed #00ADB6
    border-radius: .5rem

    display: flex
    justify-content: center
    align-items: center
    & svg
      fill: $main-green

  &__title-m
    position: absolute
    top: .7rem
    left: 1.5rem

  &__title-p
    position: absolute
    top: 5.2rem
    left: 6rem

  &__lock
    position: absolute
    color: #C6C6C6
    text-decoration: none
    transition: color 0.1s ease
    &.active
      color: $main-green

    &:hover
      color: rgba($main-green, 0.8)

    &--margin
      right: .8rem
      bottom: .8rem

    &--padding
      right: 4.9rem
      bottom: 5.2rem

.ctrl
  position: absolute
  width: 2.6rem

  /deep/
    input
      font-size: 1.2rem
      text-align: center

  &__m-left
    left: .5rem
    top: calc(50% - 1.3rem)

  &__m-right
    right: .5rem
    top: calc(50% - 1.3rem)

  &__m-top
    right: calc(50% - 1.3rem)
    top: 1.1rem

  &__m-bottom
    right: calc(50% - 1.3rem)
    bottom: 1.6rem

  &__p-left
    top: calc(50% - 1.3rem)
    left: 4rem

  &__p-right
    top: calc(50% - 1.3rem)
    right: 4rem

  &__p-top
    right: calc(50% - 1.3rem)
    top: 5.8rem

  &__p-bottom
    right: calc(50% - 1.3rem)
    bottom: 6.3rem
</style>
