<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlTextWithIcon',

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

    icon () {
      return this.settingObjectOptions.icon
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
    visibleIcon () {
      this.icon.visible = !this.icon.visible
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
    },
    onClickTitle () {
      this.$emit('open', ['IconWithText', !this.controlOpen])
    }
  },

  mounted () {
    this.color = this.colorFill.color
    this.elWidth = this.sizeIcons.width
    this.controlOpen = this.expand
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Icon settings</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-size-controls__control">
        <base-range-slider v-model="sizeIcons.width" label="Width icons" step="2" min="4" max="34">
          {{ sizeIcons.width }} px
        </base-range-slider>
      </div>
      <div class="b-text-controls__control">
        <base-color-picker label="Color icons" v-model="color" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-text-controls__control">
        <div>Visible icon</div>
        <div class="b-icon-with-text">
          <div class="b-icon-with-text__item"
            :class="{ 'b-icon-with-text__item_opacity' : false === icon.visible }"
            @click="visibleIcon"
            >

            <span class="b-icon-with-text__item-eye"
              title="Show / Hide"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <span>
              Visible
            </span>

          </div>
        </div>
      </div>
      <div class="b-text-controls__control">
        <base-text-field v-model="icon.text" label="Text here" placeholder="Enter text here"></base-text-field>
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
.b-icon-with-text
  margin: 0.8rem 0
  &__item
    color: #4D7DD8
    fill: #4D7DD8
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: #000
      fill: #000
    &-eye
      border: none
      background: transparent
      padding: 0 0.5rem
      display: inline-block
      fill: inherit

</style>
