<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Columns
    </h6>

    <div class="b-panel__layout">
      <div class="layout _top-2">
        <base-scroll-container>
          <div class="layout-padding _pr-0">
            <!-- Columns settings -->
            <div class="b-panel__control">
              <base-caption>
                Columns settings
              </base-caption>
              <div class="b-panel__control">
                <div class="b-panel__col">
                  <control-section-columns/>
                </div>
              </div>
              <div class="b-panel__control">
                <div class="b-panel__col">
                  <control-vertical-align/>
                </div>
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import ControlSectionColumns from './../controls/TheControlSectionColumns.vue'
import ControlVerticalAlign from './../controls/TheControlVerticalAlign.vue'

export default {
  name: 'ThePanelSectionColumnsSettings',

  components: {
    ControlSectionColumns,
    ControlVerticalAlign
  }
}
</script>
