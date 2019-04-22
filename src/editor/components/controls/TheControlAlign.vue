<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  data: () => ({
    flex: {
      left: ['align-items', 'flex-start'],
      center: ['align-items', 'center'],
      right: ['align-items', 'flex-end']
    },
    text: {
      left: ['text-align', 'left'],
      center: ['text-align', 'center'],
      right: ['text-align', 'right']
    },
    align: {
      list: [
        {
          iconName: 'alignLeft',
          tooltipText: 'Align left',
          value: 'left'
        },
        {
          iconName: 'alignCenter',
          tooltipText: 'Align center',
          value: 'center'
        },
        {
          iconName: 'alignRight',
          tooltipText: 'Align right',
          value: 'right'
        }
      ],
      value: ''
    }
  }),

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    box () {
      return this.settingObjectOptions.box
    },
    styles () {
      return this.settingObjectOptions.styles
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    aligned () {
      if (this.box) {
        this.updateStyle('align-items', this.flex[this.align.value][1])
      } else {
        this.updateStyle('text-align', this.text[this.align.value][1])
      }
    },

    updateStyle (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    }
  },

  mounted () {
    if (this.box) {
      this.align.value = this.styles['align-items']
    } else {
      this.align.value = this.styles['text-align']
    }
  }
}
</script>

<template>
  <BaseButtonTabs :list="align.list" v-model="align.value" @change="aligned"/>
</template>
