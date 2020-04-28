<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ControlAvailablePlatforms',

  data () {
    return {
      platforms: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  },

  created () {
    this.platforms = this.settingObjectOptions.availablePlatforms
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    visible (key) {
      this.platforms[key].visible = !this.platforms[key].visible
      this.updateSettings('availablePlatforms', this.platforms)
    },

    updateSettings (prop, value) {
      let settings = {}
      settings[prop] = value
      this.updateSettingOptions(_.merge(this.settingObjectOptions, { settings }))
    }
  }
}
</script>

<template>
<div class="b-panel__col">
  <div class="b-check-list">
    <div class="b-check-list__item is-editable"
      v-for="(value, key) in platforms" :key="key"
      :class="{ 'b-check-list__item_opacity' : false === platforms[key].visible, 'b-check-list__item_select' : platforms[key].expand }"
      @click="visible(key)"
    >

      <span class="b-check-list__item-check"
        title="Show / Hide"
        :class="{ 'b-check-list__item-check_color' : true === platforms[key].visible }"
        >
        <icon-base width="10" height="7" name="checkMark"
          v-show="platforms[key].visible"
        />
      </span>

      <a class="b-check-list__item-button"
        :title="platforms[key].name"
        >
        {{ platforms[key].name }}
      </a>

    </div>
  </div><!--/.b-check-list-->
</div>
</template>
