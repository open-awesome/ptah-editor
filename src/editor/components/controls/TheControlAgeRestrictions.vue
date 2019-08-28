<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlAgeRestrictions',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    restrictions () {
      return this.settingObjectOptions.ageRestrictions
    }
  },

  methods: {
    visible (key) {
      this.restrictions[key].visible = !this.restrictions[key].visible
    }
  }
}
</script>

<template>
  <div class="b-age-restrictions">
    <div class="b-age-restrictions__item is-editable"
      v-for="(value, key) in restrictions" :key="key"
      :class="{ 'b-age-restrictions__item_opacity' : false === restrictions[key].visible, 'b-age-restrictions__item_select' : restrictions[key].expand }"
      >

      <span class="b-age-restrictions__item-check"
        title="Show / Hide"
        @click="visible(key)"
        :class="{ 'b-age-restrictions__item-check_color' : true === restrictions[key].visible }"
        >
          <icon-base width="10" height="7" name="checkMark"
            v-show="restrictions[key].visible"
          />
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
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-age-restrictions
  width: 100%
  max-width: 100rem
  margin: 0 auto
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
      width: 10rem
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
    &-select
      width: 15rem
</style>
