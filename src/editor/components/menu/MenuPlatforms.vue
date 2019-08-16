<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    activeColor: '#2275D7',
    inactiveColor: 'rgba(51, 51, 51, 0.3)',
    items: [
      {
        name: 'is-mobile',
        icon: {
          name: 'platformMobile',
          width: 10,
          height: 17
        }
      },
      {
        name: 'is-laptop',
        icon: {
          name: 'platformLaptop',
          width: 20.5,
          height: 13.7
        }
      },
      {
        name: 'is-desktop',
        icon: {
          name: 'platformDesktop',
          width: 16,
          height: 12.5
        }
      }
    ]
  }),

  computed: {
    ...mapState('Sidebar', [
      'device'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'setDevice'
    ]),

    selectDevice (type) {
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
        :color="device === item.name ? activeColor : inactiveColor">
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
    &:hover
      svg
        fill: $dark-blue-krayola
    &_active
      color: $dark-blue-krayola
      opacity: 1
    &_mobile
      border-right: none
    &_laptop
    &_desktop
      border-left: none

</style>
