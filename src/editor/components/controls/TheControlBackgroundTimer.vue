<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      bgColor: '',
      bgTile: ''
    }
  },

  created () {
    this.bgColor = this.styles['background-color']
    this.bgTile = this.timer['color']
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    timer () {
      return this.settingObjectOptions.timer
    }

  },

  methods: {
    changeColor () {
      const color = this.bgColor.rgba ? `rgba(${Object.values(this.bgColor.rgba).toString()})` : this.bgColor

      this.styles['background-color'] = color
    },

    changeBgTileColor () {
      const color = this.bgTile.rgba ? `rgba(${Object.values(this.bgTile.rgba).toString()})` : this.bgTile
      this.timer['colorTile'] = color
    }
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-bg-controls__control">
      <base-color-picker label="Background color" v-model="bgColor" @change="changeColor"></base-color-picker>
    </div>
    <div class="b-bg-controls__control">
      <base-color-picker label="Tile color" v-model="bgTile" @change="changeBgTileColor"></base-color-picker>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-bg-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    &:first-child
      margin-bottom: $size-step/2
</style>
