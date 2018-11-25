<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      section: 'Head'
    }
  }
}
</script>

<style lang="sass">
@import 'assets/sass/app'
</style>
