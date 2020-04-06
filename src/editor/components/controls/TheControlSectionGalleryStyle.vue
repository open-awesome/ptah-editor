<script>
import { mapState } from 'vuex'
import ControlTextStylesChapter from './../controls/TheControlTextStylesChapter.vue'
import ControlTextStylesText from './../controls/TheControlTextStylesText.vue'

export default {
  name: 'ControlSectionGalleryStyle',

  components: {
    ControlTextStylesChapter,
    ControlTextStylesText
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  }
}
</script>

<template>
  <div class="b-panel__control">
    <div>
      <div class="b-panel__control" v-if="settingObjectOptions.isChapter">
        <control-text-styles-chapter/>
      </div>
    </div>
    <div>
      <div class="b-panel__control">
        <control-text-styles-text/>
      </div>
    </div>
  </div>
</template>
