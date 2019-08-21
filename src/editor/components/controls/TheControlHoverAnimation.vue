<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TheControlHoverAnimation',

  data () {
    return {
      link: '',
      animationList: [
        { name: 'none', value: '' },
        { name: 'tada', value: 'ptah-a-tada' },
        { name: 'fade', value: 'ptah-a-fade' },
        { name: 'shake', value: 'ptah-a-shake' },
        { name: 'bounce', value: 'ptah-a-bounce' }
      ],
      animationClass: {}
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    animation () {
      return this.settingObjectOptions.animation
    },

    classes: {
      get: function () {
        return this.settingObjectOptions.classes
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { classes: newValue }))
      }
    }
  },

  created () {
    let self = this

    this.animationList.forEach(function (item, i, arr) {
      if (self.animation.value !== undefined && self.animation.value === self.animationList[i].value) {
        self.animationClass = item
      }
    })
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeAnimation () {
      this.selectAnimation(this.animationClass.value)
    },
    /**
     * Add animation to element
     */
    selectAnimation (className) {
      let animations = this.classes.slice(0)

      animations.forEach((name, index) => {
        // remove other animation classes
        if (name.indexOf('ptah-a') > -1) {
          animations.splice(index, 1)
        }
      })
      animations.push(className)

      this.classes = _.merge([], this.classes, animations)
      this.animation['value'] = animations[0]
    }
  }
}
</script>

<template>
  <div class="b-hover-animation-control">
    <base-select :label="$t('c.hoverAnim')" :options="animationList" v-model="animationClass" @input="changeAnimation" />
  </div>
</template>

<style lang="sass" scoped>
.b-hover-animation-control
  margin-top: 2.2rem
</style>
