<template>
  <component class="b-base-heading" :is="`h${this.level}`" :class="`b-base-heading_h${level}`">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    /** Heading level (h1-h6) */
    level: {
      required: true,
      type: String,
      validator (value) {
        const values = ['1', '2', '3', '4', '5', '6']
        return values.indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-base-heading
  padding: 0
  margin: 0
  color: #474747

  &_h2
    font-size: 2rem
    line-height: 4rem

</style>
