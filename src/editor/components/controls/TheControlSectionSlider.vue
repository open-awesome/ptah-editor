<template>
  <div class="b-control-slider">
    <div class="b-panel__control">
      <div class="b-panel__col">
        <base-range-slider
          v-model="count"
          :label="$t('c.sliderNumber')"
          step="1"
          min="2"
          max="6"
        @change="setCount"
        >
          <base-number-input
            class="b-control-height__number-input"
            :value="countValue"
            :minimum="2"
            :maximum="6"
            @input="setCountValue"
          />
        </base-range-slider>
      </div>
    </div>

    <div class="b-panel__control">
      <div class="b-panel__row">
        <base-caption>
          Pagination
        </base-caption>
        <div class="b-panel__col">
          <base-switcher
            v-model="pagination"
          />
        </div>
      </div>
      <div class="b-panel__col">
        <div class="b-panel__control">
          <base-color-picker
            v-if="pagination"
            class="b-optional"
            :label="$t('c.pagiColor')"
            v-model="paginationColor"
          />
        </div>
        <div class="b-panel__control">
          <base-range-slider
            v-if="pagination"
            class="b-optional"
            v-model="navigationSize"
            :label="$t('c.pagiSize')"
            step="1"
            min="5"
            max="50"
            @change="setNavigationSize"
          >
            <base-number-input
              class="b-control-height__number-input"
              :value="navigationSizeValue"
              :minimum="5"
              :maximum="50"
              @input="setNavigationSizeValue"
            />
          </base-range-slider>
        </div>
      </div>
    </div>

    <div class="b-panel__control">
      <div class="b-panel__row">
        <base-caption>
          Navigation arrows
        </base-caption>
        <div class="b-panel__col">
          <base-switcher
            v-model="navigation"
           />
        </div>
      </div>
      <div class="b-panel__col">
        <base-color-picker
          v-if="navigation"
          class="b-optional"
          :label="$t('c.navColor')"
          v-model="navigationColor"
        />
      </div>
    </div>

    <div class="b-panel__control">
      <div class="b-panel__row">
        <base-caption>
          Autoplay
        </base-caption>
        <div class="b-panel__col">
          <base-switcher
            v-model="autoplay"
           />
        </div>
      </div>
      <div class="b-panel__col" v-if="autoplay !== false">
        <base-range-slider
          class="b-optional"
          :value="delay"
          :label="$t('c.transDelay')"
          @change="setDelay"
          step="1"
          min="1"
          max="10"
        >
          <base-number-input
            class="b-control-height__number-input"
            :value="delayValue"
            :minimum="1"
            :maximum="9"
            unit="seс"
            @input="setDelayValue"
          />
        </base-range-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'TheControlSectionSlider',

  data () {
    return {
      countValue: 0,
      navigationSizeValue: 0,
      delayValue: 0
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
    },

    delay: {
      get () {
        const delay = this.settingObjectOptions.swiper.autoplay ? this.settingObjectOptions.swiper.autoplay.delay : 2000
        return delay / 1000
      },

      set (value) {
        const delay = value * 1000
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          swiper: {
            autoplay: {
              delay
            }
          }
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
              delay: this.delay * 1000
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

    setCount (value) {
      this.countValue = value
    },

    setCountValue (value) {
      this.count = value
    },

    setNavigationSize (value) {
      this.navigationSizeValue = value
    },

    setNavigationSizeValue (value) {
      this.navigationSize = value
    },

    setDelay (value) {
      this.delayValue = value
    },

    setDelayValue (value) {
      this.delay = value
    }
  },

  mounted () {
    this.countValue = this.count
    this.navigationSizeValue = this.navigationSize
    this.delayValue = this.delay
  }
}
</script>
