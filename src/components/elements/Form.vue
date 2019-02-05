<template>
  <form class="b-form ptah-form">
    <input type="email" :placeholder="placeholder">
    <button type="submit">{{ buttonText }}</button>
  </form>
</template>

<script>
export default {
  name: 'Form',

  inject: ['$section'],

  props: {
    path: {
      type: String
    }
  },

  computed: {
    placeholder () {
      return this.$section.get(`$sectionData.${this.path}.placeholder`)
    },

    buttonText () {
      return this.$section.get(`$sectionData.${this.path}.buttonText`)
    }
  }
}
</script>
