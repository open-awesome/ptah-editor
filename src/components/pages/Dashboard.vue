<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'landings'
    ])
  },
  methods: {
    ...mapActions([
      'fetchLandings'
    ]),
    openLanding (item) {
      // add log
      this.$router.push({ path: `/editor/${item.slug}` })
    }
  },
  created () {
    this.fetchLandings()
  }
}
</script>

<template>
  <div class="b-page__content dashboard">
    <figure v-for="(item, index) in landings" :key="index" class="dashboard__item" @click="openLanding(item)">
      {{item.slug}}
    </figure>
    <figure class="dashboard__item" @click="$router.push({ path: '_sandbox' })">
      Sandbox
    </figure>
  </div>
</template>

<style lang="sass">
.dashboard
  width: 1000px
  padding: 40px
  display: flex
  flex-wrap: wrap
  font-family: Helvetica Neue, Helvetica, Arial
  &__item
    width: 200px
    height: 100px
    display: flex
    cursor: pointer
    background: #323c47
    color: #18d88b
    font-size: 30px
    justify-content: center
    align-items: center
    margin: 10px
</style>
