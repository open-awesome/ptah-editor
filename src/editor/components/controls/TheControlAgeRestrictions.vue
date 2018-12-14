<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlAgeRestrionctions',

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
      elWidth: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    restrictions () {
      return this.settingObjectOptions.ageRestrictions
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
      this.restrictions[key].visible = !this.restrictions[key].visible
    },
    changeWidth () {
      if (this.elWidth > 0) {
        this.sizeIcons['width'] = this.elWidth
      }
    },
    onClickTitle () {
      this.$emit('open', ['AgeRestrictions', !this.controlOpen])
    }
  },

  mounted () {
    this.elWidth = this.sizeIcons.width
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Setting restrictions</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-size-controls__control">
        <base-range-slider v-model="elWidth" label="Width icons" step="8" min="16" max="128" @change="changeWidth">
          {{elWidth}} px
        </base-range-slider>
      </div>
      <div class="b-text-controls__control">
        <div>Visible restrictions</div>
        <div class="b-age-restrictions">
          <div class="b-age-restrictions__item is-editable"
            v-for="(value, key) in restrictions" :key="key"
            :class="{ 'b-age-restrictions__item_opacity' : false === restrictions[key].visible }"
            >

            <span class="b-age-restrictions__item-eye"
              title="Show / Hide"
              @click="visible(key)"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <a class="b-age-restrictions__item-button"
              :title="restrictions[key].name"
              @click="visible(key)"
              >
              {{ restrictions[key].name }}
            </a>

            <div class="b-age-restrictions__item-select" v-if="restrictions[key].visible">
              <BaseSelect
                :options="restrictions[key].options"
                v-model="restrictions[key].selected"
                :value="restrictions[key].selected"
                >
              </BaseSelect>
            </div>
          </div>
        </div><!--/.b-age-restrictions-->
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

.b-age-restrictions
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
    margin: 0
    min-height: 4.5rem
    display: flex
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
      width: 10rem
      overflow: hidden

      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
    &-select
      width: 15rem
      position: absolute
      left: 4rem
      bottom: 1rem
    &-eye
      border: none
      background: transparent
      padding: 0 0.5rem
      display: inline-block
</style>
