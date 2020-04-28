<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  data: () => ({
    flex: {
      'left': ['justify-content', 'flex-start'],
      'center': ['justify-content', 'center'],
      'right': ['justify-content', 'flex-end'],
      'flex-start': ['justify-content', 'left'],
      'flex-end': ['justify-content', 'right']
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
      'settingObjectOptions',
      'isMobile'
    ]),

    box () {
      return this.settingObjectOptions.box
    },

    styles () {
      return this.settingObjectOptions.styles
    },

    mediaStyles () {
      let device = 'is-mobile'
      let media = { 'is-mobile': {} }
      let stylesMedia = this.settingObjectOptions.media

      if (stylesMedia === undefined) {
        stylesMedia = media
      }

      if (stylesMedia[device]) {
        for (let key in this.styles) {
          media[device][key] = stylesMedia[device][key] !== undefined ? stylesMedia[device][key] : this.styles[key]
        }
      } else {
        media[device] = this.styles
      }

      return media
    },

    mediaTextAlign: {
      get () {
        let w = _.get(this.settingObjectOptions, `media['text-align']`)

        if (w === undefined) w = _.get(this.settingObjectOptions, `styles['text-align']`)

        return w
      },

      set (value) {
        let props = {}
        let styles = {
          'text-align': value
        }
        let media = {
          'is-mobile': styles
        }

        this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
      }
    },

    mediaJustifyContent: {
      get () {
        let w = _.get(this.settingObjectOptions, `media['justify-content']`)

        if (w === undefined) w = _.get(this.settingObjectOptions, `styles['justify-content']`)

        return w
      },

      set (value) {
        let props = {}
        let styles = {
          'justify-content': value
        }
        let media = {
          'is-mobile': styles
        }

        this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
      }
    },

    textAlign: {
      get () {
        let w = 0

        if (this.isMobile) {
          w = this.mediaTextAlign
        } else {
          w = this.styles['text-align']
        }

        return w
      },

      set (value) {
        if (this.isMobile) {
          this.mediaTextAlign = value
        } else {
          this.styles['text-align'] = value
        }
      }
    },

    justifyContent: {
      get () {
        let w = 0

        if (this.isMobile) {
          w = this.mediaJustifyContent
        } else {
          w = this.styles['justify-content']
        }

        return w
      },

      set (value) {
        if (this.isMobile) {
          this.mediaJustifyContent = value
        } else {
          this.styles['justify-content'] = value
        }
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    aligned () {
      if (this.box) {
        this.updateStyle('justify-content', this.flex[this.align.value][1])
      } else {
        this.updateStyle('text-align', this.text[this.align.value][1])
      }
    },

    updateStyle (prop, value) {
      let props = {}
      let media = {}
      let styles = {}

      styles[prop] = value
      media['is-mobile'] = {}
      media['is-mobile'][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    }
  },

  mounted () {
    let styles = this.isMobile ? this.mediaStyles['is-mobile'] : this.styles

    if (this.box) {
      this.align.value = this.flex[styles['justify-content']][1]
    } else {
      this.align.value = styles['text-align']
    }
  }
}
</script>

<template>
  <div class="b-panel__control">
    <div class="b-panel__col" v-if="!isMobile">
      <div class="b-panel__row" v-if="!isMobile">
        <base-label>
          Text align
        </base-label>
        <div class="b-panel__col _m-0">
          <BaseButtonTabs
            type="buttons"
            :list="align.list"
            v-model="align.value"
            @change="aligned"
          />
        </div>
      </div>
    </div>
  </div>
</template>
