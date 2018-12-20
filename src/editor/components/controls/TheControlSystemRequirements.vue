<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlSystemRequirements',

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
      requirements: {},
      requirementsRows: {}
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    systemRequirements () {
      return this.settingObjectOptions.systemRequirements
    },

    rowsRequirements () {
      return this.settingObjectOptions.rowsRequirements
    },

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    },

    colorFill () {
      return this.settingObjectOptions.colorFill
    }
  },

  watch: {
    expand () {
      this.controlOpen = this.expand
    }
  },

  methods: {
    visible (key) {
      this.requirements[key].visible = !this.requirements[key].visible
    },
    visibleRows (key) {
      this.requirementsRows[key].visible = !this.requirementsRows[key].visible
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
    },
    onClickTitle () {
      this.$emit('open', ['SystemRequirements', !this.controlOpen])
    }
  },

  mounted () {
    this.color = this.colorFill.color
    this.elWidth = this.sizeIcons.width
    this.requirements = this.systemRequirements
    this.requirementsRows = this.rowsRequirements
    this.controlOpen = this.expand
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Table settings</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-size-controls__control">
        <base-range-slider v-model="sizeIcons.width" label="Width icons" step="8" min="16" max="128">
          {{ sizeIcons.width }} px
        </base-range-slider>
      </div>
      <div class="b-text-controls__control">
        <base-color-picker label="Color icons" v-model="color" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-text-controls__control">
        <div>OS</div>
        <div class="b-system-requirements">
          <div class="b-system-requirements__item is-editable"
            v-for="(value, key) in requirements" :key="key"
            :class="{ 'b-system-requirements__item_opacity' : false === requirements[key].visible }"
            >

            <span class="b-socials-requirements__item-eye"
              @click="visible(key)"
              title="Show / Hide"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <a class="b-system-requirements__item-button"
              @click="visible(key)"
              :title="key"
              >
              {{ key }}
            </a>

          </div>
        </div><!--/.b-system-requirements-->
      </div>
      <div class="b-text-controls__control">
        <div>Requirements</div>
        <div class="b-system-requirements">
          <div class="b-system-requirements__item is-editable"
            v-for="(value, key) in requirementsRows" :key="key"
            :class="{ 'b-system-requirements__item_opacity' : false === requirementsRows[key].visible }"
            >

            <span class="b-socials-requirements__item-eye"
              @click="visibleRows(key)"
              title="Show / Hide"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <a class="b-system-requirements__item-button"
              @click="visibleRows(key)"
              :title="key"
              >
              {{ key }}
            </a>

          </div>
        </div><!--/.b-system-requirements-->
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
    margin: 1.6rem 0
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
  &__control
    margin-top: 2.2rem

.b-system-requirements
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
  &__item
    position: relative
    margin: 0.5rem 0
    display: block
    color: #4D7DD8
    fill: #4D7DD8
    display: flex
    justify-content: flex-start
    align-items: center
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
      text-align: left
      width: 15rem
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
    &-set-link
      &-modal
        width: 24rem
        background: #fff
        position: absolute
        right: -25rem
        top: -1.5rem
        z-index: 1
        box-shadow: 0px 0.4rem 1rem rgba(0, 0, 0, 0.35)
        padding: 1.6rem
        &:before
          content: ""
          position: absolute
          width: 1.4rem
          height: 1.4rem
          top: 1.7rem
          left: -.7rem
          background: #FFFFFF
          transform: rotate(-45deg)
          z-index: 2
      &_color *
        fill: #4D7DD8
</style>
