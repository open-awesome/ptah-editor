<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ $t('c.elementsLibrary') }}
    </h6>

    <div class="b-panel__layout">
      <div class="layout _top-2">
        <base-scroll-container>
          <div class="layout-padding _pr-0">
            <div class="b-panel__control">
              <elements-list/>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import ElementsList from '@components/slots/ElementsList'

export default {
  name: 'ThePanelSlot',

  components: { ElementsList },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
