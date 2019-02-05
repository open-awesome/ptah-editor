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
  <div class="b-page__content">
    <div class="b-dashboard">
      <figure v-for="(item, index) in landings" :key="index" class="b-dashboard__item" @click="openLanding(item)">
        <div class="b-dashboard__item-cell">
          <div class="b-dashboard__item-cell-top"></div>
          <div class="b-dashboard__item-cell-bottom">
            {{ item.slug }}
          </div>
        </div>
      </figure>
      <!-- figure class="b-dashboard__item" @click="$router.push({ path: '_sandbox' })">
        Sandbox
      </figure -->
    </div>
  </div>
</template>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-dashboard
  width: 100%
  max-width: $large /* $large: 1440px */
  padding: $size-step*1.5 /* $size-step: 3.2rem */
  margin: 0 auto

  font-family: 'Lato', Helvetica Neue, Helvetica, Arial

  display: flex
  flex-wrap: wrap
  &__item
    width: 33%
    padding: 0
    margin: 0
    &-cell
      max-width: 13*$size-step
      height: 8*$size-step
      margin: $size-step/2

      background: $ligth-grey
      box-shadow: 0 ($size-step/8) $size-step rgba($black, 0.25)

      font-size: $size-step/2
      cursor: pointer

      display: flex
      flex-direction: column
      justify-content: center
      align-items: stretch
      &-top
        height: 100%
      &-bottom
        height: 2.5 * $size-step
        padding: $size-step/2 $size-step/1.33
        background-color: $white
        color: $dark-grey
</style>
