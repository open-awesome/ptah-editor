<template>
  <div class="b-confirm-overlay">
    <div class="b-confirm">
      <a tabindex="0" href="#" @click="$emit('close')" class="b-confirm__close">&times;</a>
      <h3>{{title}}</h3>

      <div class="b-confirm__content">
        <slot>
        </slot>
      </div>

      <div class="b-confirm__footer">
        <base-button size="middle" @click="$emit('close')">{{ $t('nav.cancel') }}</base-button>
        <base-button size="middle" color="orange" @click="$emit('confirm'), $emit('close')">OK</base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseConfirm',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.b-confirm-overlay
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center

  background: rgba(32, 60, 95, 0.35)

  z-index: 900

.b-confirm
  width: 45rem
  height: 20rem
  border-radius: 2px
  padding: 2.4rem
  position: relative

  font-family: Lato
  background: #FFFFFF

  h3
    font-style: normal
    font-weight: bold
    font-size: 1.6rem
    line-height: 1.9rem
    letter-spacing: -0.02em
    color: $dark-grey
    margin-bottom: 1.7rem

  &__content
    font-size: 1.4rem
    line-height: 2.4rem
    letter-spacing: -0.02em

  &__footer
    margin-top: 3rem
    display: flex
    justify-content: flex-end

    button
      border-radius: 1000px !important

  &__close
    position: absolute
    top: 2rem
    right: 2.4rem
    color: #E1E1E1
    font-size: 2.4rem
    text-decoration: none
</style>
