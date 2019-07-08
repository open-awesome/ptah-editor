<template>
  <div class="control-carousel">
    <base-label>
      Banner settings
    </base-label>

    <p class="b-warning">
      <icon-base name="pling" color="#F68125"></icon-base>
      Slide looping isn't supported in developer mode
    </p>

    <div class="b-control">
      <base-range-slider
        v-model="count"
        label="Number of slides in the banner"
        step="1"
        min="2"
        max="6">
        {{count}}
      </base-range-slider>
    </div>

    <!-- pagination -->
    <div class="b-control">
      <base-switcher
        v-model="pagination"
        label="Show/hide pagination"/>

      <base-color-picker
        v-if="pagination"
        class="b-optional"
        label="Pagination color"
        v-model="paginationColor"/>

      <base-range-slider
        v-if="pagination"
        class="b-optional"
        v-model="navigationSize"
        label="Nav bullets size"
        step="1"
        min="5"
        max="50">
        {{settingObjectSection.data.mainStyle.swiper.navSize}}
      </base-range-slider>
    </div>

    <!-- navigation -->
    <div class="b-control">
      <base-switcher
        v-model="navigation"
        label="Show/hide navigation arrows"/>

      <base-color-picker
        v-if="navigation"
        class="b-optional"
        label="Navigation color"
        v-model="navigationColor"/>
    </div>

    <div class="b-control">
      <base-switcher
        v-model="autoplay"
        label="Autoplay"/>
      <base-range-slider
        v-if="autoplay !== false"
        class="b-optional"
        :value="settingObjectSection.data.mainStyle.swiper.autoplay.delay"
        label="Transition delay (ms)"
        @change="changeSwiperDelay"
        step="1000"
        min="1000"
        max="10000">
        {{settingObjectSection.data.mainStyle.swiper.autoplay.delay}}
      </base-range-slider>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'TheControlSectionBanner',

  data () {
    return {
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectSection'
    ]),

    autoplay: {
      get () {
        return !!this.settingObjectOptions.swiper.autoplay
      },

      set (value) {
        this.setAutoplay(value)
      }
    },

    navigation: {
      get () {
        return this.settingObjectOptions.swiper.showNavigation
      },

      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            showNavigation: value
          }
        }))
      }
    },

    navigationColor: {
      get () {
        return this.settingObjectOptions.swiper.navColor
      },

      set (value) {
        let color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            navColor: color
          }
        }))
      }
    },

    navigationSize: { // TODO: pagination size
      get () {
        return parseInt(this.settingObjectOptions.swiper.navSize)
      },

      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            navSize: `${value}px`
          }
        }))
      }
    },

    pagination: {
      get () {
        return this.settingObjectOptions.swiper.showPagination
      },

      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            showPagination: value
          }
        }))
      }
    },

    paginationColor: {
      get () {
        return this.settingObjectOptions.swiper.paginationColor
      },

      set (value) {
        let color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            paginationColor: color
          }
        }))
      }
    },

    count: {
      get () {
        return this.settingObjectOptions.count
      },

      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          count: value
        }))
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
    },

    changeSwiperDelay (delay) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, {
          swiper: {
            autoplay: {
              delay
            }
          }
        })
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.b-control
  border-bottom: 0.2rem dotted rgba(0, 0, 0, 0.15)
  padding-bottom: 2.5rem
  margin-bottom: 2.5rem

.b-optional
  margin-top: 1.5rem

.b-warning
  margin: 1rem 0 2rem
  font-size: 1.35rem
  color: $gray300

  svg
    float: left
    margin: 1rem .7rem 1rem 0
</style>
