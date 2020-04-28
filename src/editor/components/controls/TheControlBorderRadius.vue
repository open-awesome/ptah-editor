<script>
import { mapState, mapActions } from 'vuex'
import { merge } from 'lodash-es'

export default {
  data () {
    return {
      elRadiusValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    elRadius: {
      get () {
        return parseInt(this.styles['border-radius']) || 0
      },

      set (radius) {
        let styles = {
          'border-radius': `${radius}px`
        }
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { styles }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', ['updateSettingOptions']),

    setElRadius (value) {
      this.elRadiusValue = value
    },

    setElRadiusValue (value) {
      this.elRadius = value
    }
  }
}
</script>

<template>
  <div class="b-panel__control">
    <base-caption>
      {{ $t('c.corner') }}
    </base-caption>
    <div class="b-panel__col">
      <base-range-slider
        position-label="left"
        v-model="elRadius"
        step="1"
        min="0"
        max="100"
        :label="$t('c.radius')"
        @change="setElRadius"
      >
        <base-number-input
          :value="elRadiusValue"
          :minimum="0"
          :maximum="100"
          unit="%"
          @input="setElRadiusValue"
        />
      </base-range-slider>
    </div>
  </div>
</template>
