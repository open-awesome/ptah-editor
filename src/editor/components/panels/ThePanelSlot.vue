<template>
  <div class="b-panel">
    <elements-list></elements-list>
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
