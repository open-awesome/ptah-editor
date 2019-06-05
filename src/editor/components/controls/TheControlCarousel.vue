<template>
  <div class="control-carousel">
    <base-label>
      Carousel settings
    </base-label>

    <base-switcher
      v-model="autoplay"
      label="Autoplay"
      v-if="settingObjectSection.name === 'AutoplayCarousel'"/>
    <br>
    <base-range-slider
      v-if="settingObjectSection.name === 'AutoplayCarousel' && autoplay !== false"
      :value="settingObjectSection.data.mainStyle.swiper.delay"
      :label="`Autoplay slides delay (${settingObjectSection.data.mainStyle.swiper.delay})`"
      @change="changeSwiperDelay"
      step="1000"
      min="1000"
      max="10000"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'TheControlCarousel',

  data () {
    return {
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement'
    ]),

    autoplay: {
      get () {
        return !!this.settingObjectOptions.swiper.autoplay
      },

      set (value) {
        this.setAutoplay(value)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setAutoplay (value) {
      if (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            loop: true,
            simulateTouch: false,
            autoplay: {
              disableOnInteraction: false,
              waitForTransition: false,
              delay: 2000
            }
          }
        }))
      } else {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            autoplay: false
          }
        }))
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
