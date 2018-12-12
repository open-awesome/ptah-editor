<script>
import { mapState, mapActions } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'
// import * as _ from 'lodash-es'

export default {
  name: 'ControlAvailablePlatforms',

  components: {
    VuseIcon
  },

  data () {
    return {
      platforms: []
    }
  },

  props: {
    content: {
      type: Object
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ])
  },

  created () {
    this.platforms = this.content
  },

  watch: {
    content (newValue, oldValue) {
      this.platforms = this.newValue
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSectionData',
      'updateSettingOptions'
    ]),
    visible (key) {
      this.platforms[key].visible = !this.platforms[key].visible
      this.$emit('setOption', ['availablePlatforms', this.platforms])
    }
  }
}
</script>

<template>
  <div class="b-available-platforms">
    <div class="b-available-platforms__item is-editable"
      v-for="(value, key) in platforms" :key="key"
      :class="{ 'b-available-platforms__item_opacity' : false === platforms[key].visible }"
      >

      <button class="b-socials__item-eye"
              @click="visible(key)"
              title="Show / Hide"
        >
        <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
      </button>

      <a class="b-available-platforms__item-button"
        :title="platforms[key].name"
        >
        <VuseIcon :name="key"></VuseIcon>
      </a>

    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-available-platforms
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
  &-chapter
    font-size: 2rem
    text-align: center
    display: block
    width: 100%
    &__text
      display: inline-block
      margin: 2rem 0
  &__item
    position: relative
    margin: 1rem
    display: block
    &_opacity
      opacity: 0.2
    &-button
      width: 5rem
      height: 5rem
      padding: 1rem
      border: none
      position: relative
      display: inline-block
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
         fill: #000
    &-eye
      position: absolute
      top: -2rem
      left: -2rem
      z-index: 1

</style>
