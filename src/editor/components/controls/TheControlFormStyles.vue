<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      formColor: '',
      buttonColor: '',
      inputColor: ''
    }
  },

  created () {
    this.formColor = this.styles['background-color']
    this.buttonColor = this.formStyles['button-color']
    this.inputColor = this.formStyles['input-color']
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

    formStyles () {
      return this.settingObjectOptions.formStyles
    }

  },

  methods: {
    changeFormColor () {
      const color = this.formColor.rgba ? `rgba(${Object.values(this.formColor.rgba).toString()})` : this.formColor

      this.styles['background-color'] = color
    },

    changeButtonColor () {
      const color = this.buttonColor.rgba ? `rgba(${Object.values(this.buttonColor.rgba).toString()})` : this.buttonColor

      this.formStyles['button-color'] = color
    },

    changeInputColor () {
      const color = this.inputColor.rgba ? `rgba(${Object.values(this.inputColor.rgba).toString()})` : this.inputColor

      this.formStyles['input-color'] = color
    }

  }
}
</script>

<template>
  <div>
    <div class="b-bg-controls">
      <div class="b-bg-controls__control">
        <base-color-picker label="Form color" v-model="formColor" @change="changeFormColor"/>
      </div>
    </div>
    <div class="b-bg-controls">
      <div class="b-bg-controls__control">
        <base-color-picker label="Button color" v-model="buttonColor" @change="changeButtonColor"/>
      </div>
    </div>
    <div class="b-bg-controls">
      <div class="b-bg-controls__control">
        <base-color-picker label="input color" v-model="inputColor" @change="changeInputColor"/>
      </div>
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
