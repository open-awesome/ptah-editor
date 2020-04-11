<template>
  <div class="progress">
    <div class="progress__battery">
      <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M36 0H0V36H36V0ZM24.0049 6C25.0996 6 26 6.90039 26 7.99512V19.5V31.0049C26 32.0996 25.0996 33 23.9902 33H12.9951C12.4443 33 11.9424 32.7715 11.5801 32.4062C11.2217 32.0449 11 31.5488 11 31.0049V19.5V7.99512C11 6.90039 11.9004 6 12.9951 6H15.5V3H21.5V6H24.0049Z"/>
      </svg>
    </div>
    <div class="progress__bar-container">
      <div class="progress__bar" :style="{ 'height': height}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressIcon',

  props: {
    progress: {
      type: String,
      required: true
    }
  },

  computed: {
    height () {
      return `${this.progress}%`
    }
  }
}
</script>

<style lang="sass" scoped>
$s: 3.2rem

.progress
  width: $s
  height: $s
  position: relative
  padding: .3rem 0
  background: rgba(0, 173, 182, 0.3)

  &__battery
    width: $s
    height: $s
    position: absolute
    top: 0
    z-index: 2

    svg
      width: $s
      height: $s

  &__bar-container
    position: relative
    margin: 0 0 .6rem
    height: $s - .6rem

  &__bar
    position: absolute
    width: 3.2rem
    height: 0
    bottom: 0
    background: $main-green

</style>
