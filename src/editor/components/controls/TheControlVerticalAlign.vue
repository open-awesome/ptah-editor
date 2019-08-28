<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {

  data: () => ({
    align: {
      list: [
        {
          iconName: 'groupTop',
          tooltipText: 'Top',
          value: 'flex-start'
        },
        {
          iconName: 'groupCenterVertical',
          tooltipText: 'Middle',
          value: 'center'
        },
        {
          iconName: 'groupBottom',
          tooltipText: 'Bottom',
          value: 'flex-end'
        }
      ],
      value: ''
    }
  }),

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    aligned () {
      this.updateStyle('align-items', this.align.value)
    },

    updateStyle (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    }
  },

  mounted () {
    this.align.value = this.styles['align-items']
  }
}
</script>

<template>
  <BaseButtonTabs :list="align.list" label="Vertical alignment" v-model="align.value" @change="aligned"/>
</template>
