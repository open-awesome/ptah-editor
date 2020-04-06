<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import ControlTable from './../controls/TheControlTable.vue'
import ControlTableBody from './../controls/TheControlTableBody.vue'

export default {
  name: 'ControlSystemRequirementsStyle',

  components: {
    ControlTable,
    ControlTableBody
  },

  data () {
    return {
      colorDef: '',
      colorAct: '',
      elWidth: 0,
      sizeIconsValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    requirements () {
      return this.settingObjectOptions.systemRequirements
    },

    rowsRequirements () {
      return this.settingObjectOptions.rowsRequirements
    },

    selectPlatform () {
      return this.settingObjectOptions.selectPlatform
    },

    sizeIcons: {
      get () {
        let props = `sizeIcons`
        let size = ''

        if (this.isMobile) props = `media['is-mobile']['sizeIcons']`

        size = _.get(this.settingObjectOptions, `${props}['width']`)

        if (size === undefined) size = _.get(this.settingObjectOptions, `sizeIcons['width']`)

        return size
      },
      set (value) {
        this.update('width', value)
      }
    },

    colorIcons () {
      return this.settingObjectOptions.colorIcons
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    visible (key) {
      this.requirements[key].visible = !this.requirements[key].visible

      if (this.requirements[key].visible === true) {
        this.selectPlatform.name = key
      } else {
        for (let p in this.requirements) {
          if (this.requirements[p].visible === true) {
            this.selectPlatform.name = p
          }
        }
      }
    },

    visibleRows (key) {
      this.rowsRequirements[key].visible = !this.rowsRequirements[key].visible
    },

    changeColor (prop, color) {
      const c = color ? `rgba(${Object.values(color.rgba).toString()})` : color
      this.colorIcons[prop] = c

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { colorIcons: this.colorIcons }))
    },

    update (prop, value) {
      let props = {}
      let sizeIcons = {}
      let device = 'is-mobile'
      let media = { 'is-mobile': { 'sizeIcons': sizeIcons } }

      sizeIcons[prop] = value
      media[device]['sizeIcons'][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'sizeIcons': sizeIcons }

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    },

    setSize (value) {
      this.sizeIconsValue = value
    },

    setSizeValue (value) {
      this.sizeIcons = value
    }
  },

  mounted () {
    this.colorIcons.default !== undefined ? this.colorDef = this.colorIcons.default : this.color = 'rgba(0, 0, 0, 1)'
    this.colorIcons.active !== undefined ? this.colorAct = this.colorIcons.active : this.color = 'rgba(255, 255, 255, 1)'

    this.sizeIconsValue = this.sizeIcons
  }
}
</script>

<template>
  <div>
    <div class="b-panel__control">
      <base-caption>
        Icon settings
      </base-caption>
      <div class="b-panel__col">
        <div class="b-panel__control" v-if="!isMobile">
          <base-color-picker
            label="Icon color"
            v-model="colorDef"
            @change="changeColor('default', colorDef)"
          />
        </div>
        <div class="b-panel__control" v-if="!isMobile">
          <base-color-picker
            label="Active color"
            v-model="colorAct"
            @change="changeColor('active', colorAct)"
          />
        </div>
        <div class="b-panel__control">
          <base-range-slider
            position-label="left"
            v-model="sizeIcons"
            label="Size"
            step="1"
            min="16"
            max="72"
            @change="setSize"
          >
            <base-number-input
              :value="sizeIconsValue"
              :minimum="16"
              :maximum="72"
              unit="px"
              @input="setSizeValue"
            />
          </base-range-slider>
        </div>
      </div>
    </div>
    <div>
      <div class="b-panel__control">
        <control-table/>
      </div>
    </div>
    <div>
      <div class="b-panel__control">
        <control-table-body/>
      </div>
    </div>
  </div>
</template>
