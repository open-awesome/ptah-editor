<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'ControlBox',

  data () {
    return {
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
      'settingObjectOptions'
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
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    getStyleNumberValue (prop) {
      let s = this.settingObjectOptions.styles[prop] || 0
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
      let [styles, property] = [{}, this[group][prop]]
      if (value === '') value = 0
      styles[property] = value + 'px'
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    }
  }
}
</script>

<template>
  <div class="control-box">
    <!-- preview -->
    <div class="control-box__element-edge">
      <div class="control-box__content-edge">
      </div>
    </div>
    <div class="control-box__title-m" v-if="!hideMargin">Margin</div>
    <div class="control-box__title-p" v-if="!hidePadding">Padding</div>
    <!-- CONTROLS -->
    <!-- margin -->
    <template v-if="!hideMargin">
      <base-number-field v-model="marginLeft" class="ctrl ctrl__m-left" pattern=""></base-number-field>
      <base-number-field v-model="marginRight" class="ctrl ctrl__m-right"></base-number-field>
      <base-number-field v-model="marginTop" class="ctrl ctrl__m-top"></base-number-field>
      <base-number-field v-model="marginBottom" class="ctrl ctrl__m-bottom"></base-number-field>
    </template>
    <!-- padding -->
    <template v-if="!hidePadding">
      <base-number-field v-model="paddingLeft" class="ctrl ctrl__p-left"></base-number-field>
      <base-number-field v-model="paddingRight" class="ctrl ctrl__p-right"></base-number-field>
      <base-number-field v-model="paddingTop" class="ctrl ctrl__p-top"></base-number-field>
      <base-number-field v-model="paddingBottom" class="ctrl ctrl__p-bottom"></base-number-field>
    </template>
    <!-- locks -->
    <a href="#"
       class="control-box__lock control-box__lock--margin"
       :class="{ 'active': lockMargins }"
       @click.prevent="lockMargins = !lockMargins"
       v-if="!hideMargin"
      >
      <icon-base name="lock"></icon-base>
    </a>
    <a href="#"
       class="control-box__lock control-box__lock--padding"
       :class="{ 'active': lockPaddings }"
       @click.prevent="lockPaddings = !lockPaddings"
       v-if="!hidePadding"
      >
      <icon-base name="lock"></icon-base>
    </a>
  </div>
</template>

<style lang="sass" scoped>
  .control-box
    width: 236px
    height: 213px
    box-sizing: border-box
    border: 2px dotted #999999
    margin: 0
    padding: 2px
    position: relative

    display: flex
    justify-content: center
    align-items: center

    font-size: 1.4rem

    &__element-edge
      width: 153px
      height: 126px
      border: 2px solid #6D6D6D

      display: flex
      justify-content: center
      align-items: center

    &__content-edge
      width: 68px
      height: 38px
      border: 2px dotted #999999

    &__title-m
      position: absolute
      top: 4px
      left: 5px

    &__title-p
      position: absolute
      top: 45px
      left: 45px

    &__lock
      position: absolute
      color: #C6C6C6
      text-decoration: none

      &.active
        color: $dark-blue-krayola

      &--margin
        right: 8px
        bottom: 8px

      &--padding
        right: 49px
        bottom: 52px

  .ctrl
    position: absolute
    width: 2.6rem

    &__m-left
      left: 7px
      top: calc(50% - 13px)

    &__m-right
      right: 7px
      top: calc(50% - 13px)

    &__m-top
      right: calc(50% - 13px)
      top: 4px

    &__m-bottom
      right: calc(50% - 13px)
      bottom: 4px

    &__p-left
      top: calc(50% - 13px)
      left: 49px

    &__p-right
      top: calc(50% - 13px)
      right: 47px

    &__p-top
      right: calc(50% - 13px)
      top: 51px

    &__p-bottom
      right: calc(50% - 13px)
      bottom: 52px
</style>
