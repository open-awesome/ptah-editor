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
          @click="visible(key)"
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
