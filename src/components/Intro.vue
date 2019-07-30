<template>
  <div class="intro">
    <router-link to="/dashboard/">Dashboard</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'Intro'
}
</script>

<style lang="sass" scoped>
.intro
  display: flex
  align-items: center
  justify-content: center
  width: 100vw
  height: 100vh
  font-size: 4rem
</style>
