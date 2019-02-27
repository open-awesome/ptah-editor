<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      createWindow: false
    }
  },

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
      this.$router.push({ path: `/editor/${item._id}` })
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
      <figure class="b-dashboard__item create" @click="createWindow = true">
        <div class="b-dashboard__item-cell b-dashboard__item--create">
          <icon-base name="plus" width="40" height="40" color="#2275D7"></icon-base>
          <figcaption>{{ $t('d.createNew') }}</figcaption>
        </div>
      </figure>

      <figure v-for="(item, index) in landings" :key="index" class="b-dashboard__item" @click="openLanding(item)">
        <div class="b-dashboard__item-cell">
          <div class="b-dashboard__item-cell-top"></div>
          <div class="b-dashboard__item-cell-bottom">
            {{ item.name }}
          </div>
        </div>
      </figure>
    </div>

    <transition name="slide-fade">
      <div class="b-create" v-if="createWindow">
        <div class="b-create__inner">

        </div>
      </div>
    </transition>
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
    &--create
      justify-content: center
      align-items: center
      background: $white
      padding-top: 4rem
      figcaption
        margin-top: 4.6rem
        font-size: 1.6rem
        color: $dark-blue-krayola
        letter-spacing: -0.02em

.b-create
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background-color: rgba($dark-blue, 0.2)

  &__inner
    position: absolute
    left: 50%
    top: 50%
    margin-left: -$size-step*29/2
    margin-top: -$size-step*16/2
    width: $size-step*29
    height: $size-step*16
    z-index: 10

    background: $white

    display: flex
    flex-direction: column
    justify-content: stretch

// Animations
.slide-fade
  &-enter-active
    transition: all .2s ease

  &-leave-active
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    opacity: 0
    transform: translateX(-0.8rem)
</style>
