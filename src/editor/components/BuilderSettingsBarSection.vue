<template>
  <div>
    Some Section Settings
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BuilderSettingsBarSection',
  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  },
  created () {
    // "$sectionData.mainStyle"
    console.log(this.settingObjectOptions)
  }
}
</script>
