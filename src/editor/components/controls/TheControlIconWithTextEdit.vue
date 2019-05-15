<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlTextWithIcon',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    icon () {
      return this.settingObjectOptions.icon
    }
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <base-text-field v-model="icon.text" label="Text here" placeholder="Enter text here"></base-text-field>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__control
    margin-top: 2.2rem

</style>
