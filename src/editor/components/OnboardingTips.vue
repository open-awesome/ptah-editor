<script>
import Popper from 'popper.js'
import * as _ from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'OnboardingTips',

  props: {
    builder: {
      required: true
    }
  },

  data () {
    return {
      elements: [], // List of items with tips
      dict: [
        {
          name: '.b-age-restrictions',
          hint: this.$t('onboard.age')
        },
        {
          name: '.b-available-platforms',
          hint: this.$t('onboard.platforms')
        },
        {
          name: '.b-button',
          hint: this.$t('onboard.button')
        },
        /* {
          name: '.b-delimiter',
          hint: this.$t('onboard.spacer')
        }, */
        {
          name: '.b-text-icon',
          hint: this.$t('onboard.textIcon')
        },
        {
          name: '.b-logo',
          hint: this.$t('onboard.logo')
        },
        {
          name: '.b-image',
          hint: this.$t('onboard.image')
        },
        {
          name: '.b-social-networks',
          hint: this.$t('onboard.social')
        },
        {
          name: '.b-text',
          hint: this.$t('onboard.text')
        },
        {
          name: '.b-timer',
          hint: this.$t('onboard.timer')
        },
        {
          name: '.b-video',
          hint: this.$t('onboard.video')
        }
      ],
      tips: []
    }
  },

  computed: {
    ...mapState('Landing', [
      'onBoarding'
    ]),

    sections () {
      return this.builder.sections
    }
  },

  watch: {
    sections: function (val, oldVal) {
      if ((val.length !== oldVal.length) && this.onBoarding) {
        this.initTips()
      }
    },

    onBoarding: function (value) {
      if (value) {
        this.initTips()
      } else {
        this.tips.forEach(tip => tip.destroy())
      }
    }
  },

  methods: {
    initTips () {
      const container = document.getElementById('artboard')

      // Show tip for new items in the list
      this.dict.forEach((el) => {
        const node = this.getNode(el.name, container)

        if (!this.findInList(el.name) && node !== null) {
          this.elements.push(node)
          this.createTip(node, this.tipNode(el.hint))
        }
      })
    },

    createTip (referenceElement, popper) {
      const container = document.getElementById('artboard')
      const tip = new Popper(referenceElement, popper, {
        placement: 'right-start',
        modifiers: {
          flip: {
            behavior: ['left-start', 'top']
          },
          preventOverflow: {
            boundariesElement: container
          }
        }
      })

      this.tips.push(tip)
    },

    tipNode (text) {
      const newNode = document.createElement('div')
      newNode.innerHTML = `<div class="b-onboarding-tip__inner">${text}</div>`
      newNode.classList.add('b-onboarding-tip')
      this.$root.$el.appendChild(newNode)

      return newNode
    },

    findInList (elName) {
      this.elements.forEach((el) => {
        if (el.classList.contains(elName)) {
          return true
        }
      })

      return false
    },

    // get reference element node
    getNode (className, container) {
      // exclude header
      if (_.some(this.builder.sections, ['isHeader', true])) {
        const header = document.querySelector('.b-section-header')

        return Array
          .from(container.querySelectorAll(className))
          .filter((node) => {
            return !header.contains(node)
          })[0] || null
      } else {
        return container.querySelector(className)
      }
    }
  }
}
</script>

<template>
  <div></div>
</template>

<style lang="sass">
.b-onboarding-tip
  z-index: 99

  &__inner
    background: rgba(0, 0, 0, 0.4)
    color: rgba(255, 255, 255, .4)
    font-size: 1.6rem
    font-family: 'Lato'
    line-height: 1.9rem
    padding: 1.1rem
    position: relative
    max-width: 22rem

  &:after
    content: ''
    display: block
    position: absolute

  &[x-placement^="right"]
    .b-onboarding-tip__inner
      margin-left: 28px
    &:after
      width: 28px
      height: 17px
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAATCAYAAACHrr18AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEySURBVHgBvZTNbYNAEIVnAQlxSwkpAXfgdBAqcDgBp5AKnA4SHxDiR0KpIHYFSQdOCS4hZ0CQN5GIHNvYxl72k1YaCVaf3s7sEimkKIqbJEnuuRY0MnEc3xqGMWvbdoplYy1N03waRczJ6rp+3JK9sTAIgs/uH6lipJvquj7vk21j0JV06ZqmeYBog3plWZbjuu73sX0XizthWZYhhF9Ybl86aeI0TVn4LIRYIukEwg0NZJCYJxQ9LCAjJHSGJNzl7OHilJCFKBee573SlZxMzL2squoFpY2kd5cc62AxHy16+YGkK9/3JyQRre9DFEW2pmlrlAtIQ5LMQXGe5zM8c+84WkdGPw+xN1zdEMns50lxlmVzfoHGlv4Tq5Qyvz3mnqqUMoLvKa7MWqX0D76vpJgfPtnTbmLOFr0AAAAASUVORK5CYII=')
      left: 0px
      top: 20px
</style>
