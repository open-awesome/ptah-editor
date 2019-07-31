<template>
  <div class="intro">
    <button @click="goDemo" class="">DEMO</button>
    <router-link to="/dashboard/">Dashboard</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Intro',

  methods: {
    ...mapMutations('User', ['setGuestUser']),

    goDemo () {
      this.setGuestUser(true)
      this.$router.push({ path: `/editor/demo` })
    }
  }
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
