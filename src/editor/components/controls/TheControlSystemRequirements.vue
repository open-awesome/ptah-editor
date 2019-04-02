<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlSystemRequirements',

  components: {
    VuseIcon
  },

  data () {
    return {
      color: '',
      elWidth: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    requirements () {
      return this.settingObjectOptions.systemRequirements
    },

    rowsRequirements () {
      return this.settingObjectOptions.rowsRequirements
    },

    selectPlatform () {
      return this.settingObjectOptions.selectPlatform
    },

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    },

    colorFill () {
      return this.settingObjectOptions.colorFill
    }
  },

  methods: {
    visible (key) {
      this.requirements[key].visible = !this.requirements[key].visible

      if (this.requirements[key].visible === true) {
        this.selectPlatform.name = key
      } else {
        for (let p in this.requirements) {
          if (this.requirements[p].visible === true) {
            this.selectPlatform.name = p
          }
        }
      }
    },
    visibleRows (key) {
      this.rowsRequirements[key].visible = !this.rowsRequirements[key].visible
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
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
    <div>
      <div class="b-text-controls__control">
        <div class="b-text-controls__control-chapter">
          Supported systems
        </div>
        <div class="b-system-requirements">
          <div class="b-system-requirements__item is-editable"
            v-for="(value, key) in requirements" :key="key"
            :class="{ 'b-system-requirements__item_opacity' : false === requirements[key].visible, 'b-system-requirements__item_select' : requirements[key].expand }"
            >
            <span class="b-system-requirements__item-check"
              @click="visible(key)"
              title="Show / Hide"
              :class="{ 'b-system-requirements__item-check_color' : true === requirements[key].visible }"
              >
               <icon-base width="10" height="7" name="checkMark"
                 v-show="requirements[key].visible"
                 />
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
        <div class="b-text-controls__control-chapter">
          System components
        </div>
        <div class="b-system-requirements">
          <div class="b-system-requirements__item is-editable"
            v-for="(value, key) in rowsRequirements" :key="key"
            :class="{ 'b-system-requirements__item_opacity' : false === rowsRequirements[key].visible, 'b-system-requirements__item_select' : rowsRequirements[key].expand }"
            >

            <span class="b-system-requirements__item-check"
              @click="visibleRows(key)"
              title="Show / Hide"
              :class="{ 'b-system-requirements__item-check_color' : true === rowsRequirements[key].visible }"
              >
              <icon-base width="10" height="7" name="checkMark"
               v-show="rowsRequirements[key].visible"
                />
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
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: #272727
    display: flex
    align-items: center
    cursor: pointer
    margin: 1.6rem 0
  &__control
    margin-top: 2.2rem
    &-chapter
      font-size: 1.6rem
      font-weight: bold

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
