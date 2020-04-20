<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    inactiveColor: '#A2A5A5',
    items: [
      {
        name: 'is-mobile',
        icon: {
          name: 'platformMobile',
          width: 25,
          height: 25
        }
      },
      /*
      {
        name: 'is-laptop',
        icon: {
          name: 'platformLaptop',
          width: 20.5,
          height: 13.7
        }
      },
      */
      {
        name: 'is-desktop',
        icon: {
          name: 'platformDesktop',
          width: 28,
          height: 25
        }
      }
    ]
  }),

  computed: {
    ...mapState('Sidebar', [
      'device',
      'mainGreenColor'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'setControlPanel',
      'setDevice',
      'toggleSidebar',
      'toggleSectionsTreeMenu'
    ]),

    selectDevice (type) {
      this.setControlPanel(false)
      this.toggleSectionsTreeMenu(true)
      this.setDevice(type)
    }
  }
}
</script>

<template>
  <div class="b-menu-platforms">
    <button
      v-for="(item, index) in items"
      class="b-menu-platforms__button"
      tooltip-position="bottom"
      :key="index"
      :tooltip="`on ${item.name}`"
      :class="[
        `b-menu-platforms__button_${item.name}`,
        {'b-menu-platforms__button_active': device === item.name}
      ]"
      @click.prevent="selectDevice(item.name)">
      <icon-base
        :name="item.icon.name"
        :width="item.icon.width"
        :height="item.icon.height"
        :color="device === item.name ? mainGreenColor : inactiveColor">
      </icon-base>
    </button>
  </div>
</template>

<style lang="sass" scoped>
.b-menu-platforms
  width: 14rem
  height: 5.6rem
  border:
  padding: 1rem
  display: flex
  align-items: center
  justify-content: center
  &__button
    background-color: transparent

    padding: 0
    width: 4rem
    height: 4rem
    border: none

    display: flex
    align-items: center
    justify-content: center

    outline: none
    cursor: pointer
    & svg
      transition: 0.3s ease-in-out
    &:hover
      svg
        fill: $main-green
    &_active
      color: $main-green
    &_mobile
      border-right: none
    &_laptop,
    &_desktop
      border-left: none
    @media only screen and (max-width: 1280px)
      &
        width: 2rem
        height: 2rem
        margin: 0 .5rem

</style>
