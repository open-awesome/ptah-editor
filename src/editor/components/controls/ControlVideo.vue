<template>
<div class="b-video-control">

  <header @click="toggleDropdown" class="b-video-control__header">
    <h6 class="b-video-control__title">Video</h6>
    <icon-base
        :class="{ closed: !opened }"
        name="arrowDropDown"
        width="8"
        height="8"
        class="b-video-control__icon"/>
  </header>

  <base-dropdown :isOpened="opened" :hasOverflow="opened" class="b-video-control__dropdown">
    <base-uploader :value="src" @change="changeSrc" type="video" class="b-video-control__uploader"/>
  </base-dropdown>

</div>
</template>

<script>
export default {
  name: 'ControlVideo',

  props: {
    src: String,
    expand: Boolean
  },

  data () {
    return {
      opened: false
    }
  },

  watch: {
    expand: {
      immediate: true,
      handler (value) {
        this.opened = value
      }
    }
  },

  methods: {
    toggleDropdown () {
      this.$emit('toggle', ['Video', !this.opened])
    },

    changeSrc (value) {
      this.$emit('change', value || '')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-video-control

  &__header
    margin-bottom: .8rem

    display: flex
    align-items: center

    font-size: 2.2rem
    color: #272727
    cursor: pointer

  &__title
    margin: 0
    font-weight: normal

  &__icon
    margin-left: .5rem
    margin-bottom: -.5rem

    transform: rotate(180deg)

    &.closed
      transform: rotate(0deg)
</style>
