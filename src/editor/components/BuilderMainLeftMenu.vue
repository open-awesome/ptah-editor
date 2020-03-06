<template>
  <div class="b-main-left-menu"
    id="sectionsContents"
    :class="{'_expanded': isExpanded}"
  >
    <div class="b-main-left-menu-list">
      <div
        class="b-main-left-menu-list__item"
        v-for="item in mainLeftMenu.list"
        :key="item.name"
        @click="openPanels(item.panel)"
        :class="[
          { '_open' : isSectionsTreeExpanded && item.name === 'Sections' },
          { '_open' : modalContentID === item.panel }
        ]"
      >
        <span
          class="b-main-left-menu-list__item-icon"
        >
          <IconBase
            :name="item.icon"
            color="#A2A5A5"
          />
        </span>
        <span
          class="b-main-left-menu-list__item-text"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="b-main-left-menu-list__progress">
      <span
        class="b-main-left-menu-list__progress-icon"
      >
        <IconBase
          name="progress"
        />
      </span>
      <span
        class="b-main-left-menu-list__progress-text"
      >
          Progress
        </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BuilderMainLeftMenu',
  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapState('Sidebar', [
      'mainLeftMenu',
      'isExpanded',
      'isSectionsTreeExpanded'
    ]),

    modalContentID () {
      return this.$route.path.split('/')[4] || ''
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'toggleSectionsTreeMenu'
    ]),

    showSectionsTreeBar () {
      this.toggleSectionsTreeMenu()
    },

    closeSiteSettings () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    openPanels (panel) {
      this.toggleSidebar()

      if (panel === 'sectionsTree') {
        this.showSectionsTreeBar()
        return
      }

      if (this.modalContentID === panel) {
        this.closeSiteSettings()
      } else {
        this.$router.push(`/editor/${this.$route.params.slug}/settings/${panel}`)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-main-left-menu
  $this: &
  padding-top: 6rem
  width: 100%
  height: 100%

  display: flex
  flex-direction: column
  justify-content: space-between

  background-color: #f3f6f6
  transition: width 0.3s ease-in-out
  &-list
    height: 100%
    &__item,
    &__progress
      width: 100%
      height: 7.5rem

      display: flex
      flex-direction: column
      justify-content: center
      align-items: center

      cursor: pointer
      transition: background 0.1s ease-in-out
      border-left: transparent 2px solid
      user-select: none
      &:hover
        background: rgba(36, 206, 215, 0.1)
      &-icon
        display: flex
        justify-content: center
        align-items: center

        width: 32px
        height: 32px
        transition: 0.2s ease-in-out
        svg
          width: 24px
          height: 24px
          transition: 0.2s ease-in-out
      &-text
        font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif
        font-size: 9px
        font-weight: bold
        letter-spacing: 0.065em
        text-align: center
        text-transform: uppercase
        color: #A2A5A5

        padding-top: 2px
        width: 100%
        opacity: 0

        transition: opacity 0.3s ease-in-out
      #{$this}:hover &-text,
      #{$this}._expanded &-text
         opacity: 1
      &._open
        background-color: #fff
        border-left: $main-green 2px solid
        & .b-main-left-menu-list__item-icon
          width: 36px
          height: 36px

          align-items: flex-end
          &
            svg
              width: 28px
              height: 28px
              fill: #575A5F
        & .b-main-left-menu-list__item-text
          opacity: 0

</style>
