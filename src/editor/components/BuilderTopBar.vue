<template>
  <div class="b-top-bar" id="topbar">
    <div class="b-top-bar__padd">
      <div class="b-top-bar-menu">
        <div class="b-top-bar-menu__left">
          <div class="b-top-bar-menu__crumbs">
            <span class="b-top-bar-menu__crumbs-home b-top-bar-menu__crumbs-link"
              :tooltip="homeTooltipText"
              tooltip-position="bottom"
              @click="backToLandings"
              >
              <IconBase
                name="home"
                width="20"
                height="17"
                color="#575A5F"
              />
              <span>My board</span>
            </span>
            <span class="b-top-bar-menu__crumbs-arrow">
              <IconBase
                name="arrowToRight"
                width="16"
                height="8"
                color="#575A5F"
              />
            </span>
            <span :title="landingName">
              {{ landingName | truncate(35, '...') }}
            </span>
          </div>
        </div>
        <div class="b-top-bar-menu__middle"
          :class="{'b-top-bar-menu__middle-margin' : isExpanded }"
          >
          <MenuPlatforms
            @setDevice="setDevice"
          />
        </div>
        <div class="b-top-bar-menu__right">
          <BaseButton
            @click="openHelpPage"
            color="yellow-transparent"
            size="small"
          >
            {{ $t('nav.help') }}
            <IconBase
              name="help"
              width="12"
              height="12"
            />
          </BaseButton>
          <BaseButton
            @click="$emit('preview', $event)"
            color="main-green-transparent"
            size="small"
            :disabled="builder.sections.length === 0"
          >
            {{ $t('nav.preview') }}
          </BaseButton>
          <BaseButton
             @click="$emit('export', $event)"
             color="main-green"
             size="small"
             :disabled="builder.sections.length === 0"
          >
            {{ $t('nav.publish') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

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
    },
    builder: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    device: null
  }),

  computed: {
    ...mapState(['currentLanding']),
    ...mapState('Sidebar', [
      'isExpanded'
    ]),

    ...mapState('Landing', [
      'onBoarding'
    ]),

    modalContentID () {
      return this.$route.path.split('/')[4] || ''
    },

    isGuest () {
      return localStorage.getItem('guest') !== null
    },

    homeTooltipText () {
      return this.isGuest ? 'Back to main' : this.$t('nav.backToDashbord')
    }
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
    },

    closeSiteSettings () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    async itemClick (item, event) {
      await this.$nextTick()

      this.$emit(item, event)
    },

    openHelpPage () {
      window.open(process.env.VUE_APP_HELP)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-top-bar
  width: 100%
  height: 100%
  padding: 0 0 0 2.4rem

  display: flex
  align-items: center
  justify-content: center

  min-width: 98rem
  &__padd
    width: 100%
  &-menu
    display: flex
    align-items: center
    justify-content: space-between
    &__left
      order: 1
      width: 45%
      display: flex
      align-items: center
      justify-content: flex-start
    &__middle
      order: 2
      width: 8rem
      &-margin
        margin: 0 0 0 33rem
    &__right
      order: 3
      width: 45%
      text-align: right
      padding-right: .5rem

      display: flex
      justify-content: flex-end
      button
        margin: 0 1rem
        @media only screen and (max-width: 1100px)
          &
            margin: 0.5rem
            padding: 0.5rem

    &__crumbs
      display: flex

      color: $dark-grey
      font-weight: 600
      padding: 0
      white-space: nowrap
      &-home
        padding: 0 $size-step/4
        & svg
          margin-right: 2rem
      &-arrow
        padding: 0 1rem
      &-link
        display: flex
        &:hover
          cursor: pointer
</style>
