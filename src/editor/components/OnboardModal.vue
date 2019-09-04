<template>
  <transition name="boardal">
    <div class="boardal">
      <div class="boardal__mask" v-if="hasMask" @click="clickMask"></div>
      <div class="boardal__wrapper">
        <slot></slot>
        <div class="boardal__x" v-if="hasX" @click="clickX">&times;</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OnboardModal',

  props: [
    'hasX',
    'hasMask',
    'canClickMask'
  ],

  methods: {
    clickX: function () {
      this.$emit('toggle')
    },
    clickMask: function () {
      if (this.canClickMask) {
        this.$emit('toggle')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.boardal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &__mask {
    background: rgba(#000,.65);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  &__wrapper {
    position: relative;
    width: 65vw;
    max-width: 60em;
    min-width: 30em;
    max-height: 65vh;
    height: 30em;
    background: #fff;
    color: #333;
    display: flex;
    flex-direction: var(--cross, column);
    border-radius: .2em;
    box-shadow: 0 0 0 1px rgba(0,0,0,.2), 0 1em 2em -1em;
  }
  &__x {
    cursor: pointer;
    font-size: 2em;
    line-height: .5;
    opacity: .15;
    &:hover {
      opacity: .65;
    }
  }
  &-enter-active,
  &-leave-active {
    transition: opacity .25s
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

// modal content sliders
article {
  flex: 1 1 100%;
  height: 100%;
  display: flex;
  flex-direction: var(--axis, row);
  overflow: hidden;
}
section {
  width: 100%;
  visibility: hidden;
  flex: 0 0 100%;
  padding: 2em;
  overflow: auto;
  will-change: transform;
  transform: translate(var(--x, 0%), var(--y, 0%));
  transition: transform 300ms ease-out;
  position: relative;
  h2,h3,h4 {
    margin-top: 0;
  }
  &.current {
    visibility: visible;
  }
}
footer {
  position: relative;
  text-align: right;
  display: flex;
  flex-direction: var(--axis-reverse, row-reverse);
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0 1px rgba(#000, .1);
  background: rgba(#000, .05);
  &:not(:empty) {
    padding: 1em;
  }
}

.step-dots {
  display: flex;
  flex-direction: var(--axis, row);
}
.step-dot {
  cursor: pointer;
  width: 1em;
  height: 1em;
  margin: .5ch;
  border-radius: 1em;
  background: currentColor;
  opacity: .2;
  transition: transform 100ms ease-out, opacity 150ms linear;
  &.active {
    opacity: .7;
    box-shadow: 0 0 1em -.25em;
  }
  &:hover {
    transform: scale(1.2)
  }
}
.forward-actions,
.back-actions {
  flex: 1;
  display: flex;
  flex-direction: var(--axis, row);
}
.forward-actions {
  justify-content: flex-end;
  // text-align: right;
}
.back-actions {
  justify-content: flex-start;
  // text-align: left;
}

</style>
