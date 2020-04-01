<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlSectionProducts',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    products () {
      return this.settingObjectOptions.products
    },

    selectProduct () {
      return this.settingObjectOptions.selectProduct
    }

  },

  methods: {
    visible (key) {
      this.products[key].visible = !this.products[key].visible

      if (this.products[key].visible === true) {
        this.selectProduct.name = key
        return
      }

      for (let p in this.products) {
        if (this.products[p].visible === true) {
          this.selectProduct.name = p
        }
      }
    }
  }
}
</script>

<template>
  <div class="b-products">
    <div class="b-products__item is-editable"
      v-for="(value, key) in products" :key="key"
      :class="{ 'b-products__item_opacity' : false === products[key].visible }"
      @click="visible(key)"
      >

        <span class="b-products__item-check"
          title="Show / Hide"
          :class="{ 'b-products__item-check_color' : true === products[key].visible }"
          >
            <icon-base width="10" height="7" name="checkMark"
              v-show="products[key].visible"
            />
        </span>

        <a class="b-products__item-button"
          :title="products[key].name"
          >
          {{ key }}
        </a>

      </div>
  </div><!--/.b-products-->
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-products
  width: 100%
  max-width: 100rem
  margin: 0
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
    min-height: 3.8rem

    display: flex
    justify-content: flex-start
    align-items: center

    font-size: 1.4rem
    line-height: 1.9rem
    cursor: pointer
    &:after
      content: ''
      height: 1.8rem
      width: 1.8rem
      position: absolute
      top: 50%
      left: 0.9rem
      margin:  -0.9rem 0 0 0

      border-radius: 100%
      background: #00ADB6
      transition: all .3s cubic-bezier(.2,.85,.4,1.275)
      opacity: 0
    &:hover
      &:after
        height: 4.4rem
        width: 4.4rem
        top: 50%
        left: -1.4rem
        margin:  -2.2rem 0 0 0

        opacity: 0.08
    &_opacity
      opacity: 0.2
      color: $black
      fill: $black
      &:after
        background: #A2A5A5
      &:hover
        &:after
          opacity: .2
          background: #A2A5A5

      &:before
        content: ''
        height: 1.8rem
        width: 1.8rem
        position: absolute
        top: 50%
        left: .9rem
        margin:  -0.9rem 0 0 -0.9rem

        border-radius: 100%
        animation: ripples .8s ease-in-out
    &-button
      padding: 0 0 0 2rem
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
      width: 1.8rem
      height: 1.8rem

      border: 0.3rem solid $grey
      border-radius: 0.3rem
      background: transparent
      text-align: center

      display: flex
      justify-content: center
      align-items: center
      & svg
        fill: $dark-grey
      &_color
        background: $main-green
        border: 0.3rem solid $main-green
        & svg
          fill: #ffffff

@keyframes ripples
  0%
    background: adjust_color($main-green, $alpha: -0.5)
  100%
    width: 4.8rem
    height: 4.8rem
    opacity: 0
    margin:  -2.4rem 0 0 -2.4rem

@keyframes ripples-o
  0%
    background: adjust_color(#A2A5A5, $alpha: -0.5)
  100%
    width: 4.8rem
    height: 4.8rem
    opacity: 0
    margin:  -2.4rem 0 0 -2.4rem
</style>
