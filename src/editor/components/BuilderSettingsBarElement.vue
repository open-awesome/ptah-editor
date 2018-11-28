<template>
  <div class="b-elem-settings">

    <!-- text align -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.aligned">
      <ControlAlign
        :isBox="settingObjectOptions.box"
        @boxAligned="onAligned"
        @textAligned="onAligned">
      </ControlAlign>
    </div>

    <!-- font -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.typography">

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import ControlAlign from './controls/TheControlAlign'

export default {
  name: 'BuilderSettingsBarElement',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlAlign
  },

  data () {
    return {
    }
  },

  created () {
    console.log(this.settingObjectOptions)
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    onAligned (value) {
      this.updateStyle(value[0], value[1])
    },

    updateStyle (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
