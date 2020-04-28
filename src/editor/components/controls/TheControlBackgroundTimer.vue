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
    this.bgTile = this.timer['colorTile']
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
  <div class="b-panel__col">
    <div class="b-panel__control">
      <base-color-picker
        label="Background color"
        v-model="bgColor"
        @change="changeColor"
      />
    </div>
    <div class="b-panel__control">
      <base-color-picker
        label="Tile color"
        v-model="bgTile"
        @change="changeBgTileColor"
      />
    </div>
  </div>
</template>
