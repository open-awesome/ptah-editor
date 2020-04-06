<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Form
    </h6>

    <div class="b-panel__layout">
      <div class="layout _top-2">
        <base-scroll-container>
          <div class="layout-padding _pr-1">
            <!-- Form settings -->
            <div class="b-panel__control">
              <base-caption>
                Form settings
              </base-caption>

              <control-section-form-settings/>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlSectionFormSettings from '../controls/TheControlSectionFormSettings'

export default {
  name: 'ThePanelSectionForm',
  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlSectionFormSettings
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel',
      'isMobile'
    ])
  }
}
</script>
