<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      bgColor: '',
      label: '',
      labelHover: ''
    }
  },

  created () {
    this.bgColor = this.styles['background-color']

    if (this.settingObjectType === 'image') {
      this.label = 'Background ' + this.settingObjectType + ' color'
    } else {
      this.label = this.settingObjectType + ' color'
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectType'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    }

  },

  methods: {
    changeColor () {
      const color = this.bgColor.rgba ? `rgba(${Object.values(this.bgColor.rgba).toString()})` : this.bgColor
      this.styles['background-color'] = color
    }
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-bg-controls__control">
      <base-color-picker :label="label" v-model="bgColor" @change="changeColor"></base-color-picker>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-bg-controls
  &__control
    margin-top: 2.2rem
</style>
