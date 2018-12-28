<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlSectionProducts',

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
      count: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    products () {
      return this.settingObjectOptions.products
    }

  },

  watch: {
    expand () {
      this.controlOpen = this.expand
    }
  },

  methods: {
    visible (key) {
      this.products[key].visible = !this.products[key].visible
    },

    onClickTitle () {
      this.$emit('open', ['Products', !this.controlOpen])
    }
  },

  mounted () {
    this.controlOpen = this.expand
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Products settings</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-text-controls__control">
        <div>Visible products</div>
        <div class="b-products">
          <div class="b-products__item is-editable"
            v-for="(value, key) in products" :key="key"
            :class="{ 'b-products__item_opacity' : false === products[key].visible }"
            @click="visible(key)"
            >

            <span class="b-socials__item-eye"
              title="Show / Hide"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <a class="b-products__item-button"
              :title="products[key].name"
              >
              {{ key }}
            </a>

          </div>
        </div><!--/.b-products-->
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
    margin: 0.5rem 0
    display: block
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
</style>
