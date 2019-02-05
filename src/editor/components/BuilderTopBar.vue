<script>
import MenuPlatforms from './menu/MenuPlatforms.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    MenuPlatforms
  },

  props: {
    landingName: {
      required: true
    }
  },

  data: () => ({
    device: null
  }),

  computed: {
    ...mapState(['currentLanding'])
  },

  methods: {
    ...mapActions('Sidebar', [
      'clearSettingObject'
    ]),

    setDevice (type) {
      this.$emit('setDevice', type)
    },

    backToLandings ($event) {
      this.clearSettingObject()
      this.$emit('backToLandings', $event)
    }
  }
}
</script>

<template>
<div class="b-top-bar">

  <div class="b-top-bar__right">
    <div class="b-top-bar-right-menu">
      <div class="b-top-bar-right-menu__left">
        <div class="b-page__header-menu">
          <icon-base name="hamburger" :color="colorHamburger"></icon-base>
        </div>
        <div class="b-page__header-crumbs">
          <span class="b-page__header-crumbs-home b-page__header-crumbs-link"
                @click="backToLandings"
            >
            <icon-base name="home" :color="colorHome"></icon-base>
          </span>
          <span class="b-page__header-crumbs-link" @click="backToLandings">
            All sites
          </span>
          <span class="b-page__header-crumbs-arrow">
            →
          </span>
          <span>
            {{ landingName }}
          </span>
        </div>
      </div>
      <div class="b-top-bar-right-menu__middle">
        <MenuPlatforms
          @setDevice="setDevice"
          ></MenuPlatforms>
      </div>
      <div class="b-top-bar-right-menu__right">
        <BaseButton
          :color="'gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('save', $event)"
          tooltip="click for save"
          tooltip-position="bottom"
          >
          {{ $t('nav.save') }}
        </BaseButton>
        <BaseButton
          :color="'gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('preview', $event)"
          tooltip="click for preview"
          tooltip-position="bottom"
          >
          {{ $t('nav.preview') }}
        </BaseButton>
        <BaseButton
          :color="'gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('export', $event)"
          tooltip="click for export"
          tooltip-position="bottom"
          >
          {{ $t('nav.export') }}
        </BaseButton>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
.b-top-bar
  width: 100%
  height: 100%
  padding: 2.4rem 3.2rem

  display: flex
  align-items: center
  justify-content: center
  &__left
    order: 1
    width: 17rem
  &__right
    order: 2
    flex-grow: 1
  &-right-menu
    display: flex
    align-items: center
    justify-content: space-between
    &__left
      order: 1
      width: 50%
      display: flex
      align-items: center
      justify-content: flex-start
    &__middle
      order: 2
      width: 14rem
    &__right
      order: 3
      width: 50%
      text-align: right

.b-page__header-crumbs
  color: $dark-grey
  opacity: 0.5
  &-arrow
    padding: 0 1rem
  &-link
    opacity: 0.5
    &:hover
      opacity: 1 !important
      cursor: pointer
</style>
