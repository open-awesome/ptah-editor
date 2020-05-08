<template>
  <div class="b-palette">
    <div class="b-palette__row">
      <BaseCaption>Page colors</BaseCaption>

      <div class="b-palette__col" v-for="(color, index) in colors" :key="`picker-${ _uid }-${ index }`">
        <base-color-picker
          :label="labelsArray[index]"
          v-model="colors[index]"
          @change="changePaletteColor($event, index)"></base-color-picker>
      </div>
    </div>

    <BaseCaption>
      Color palette generator
    </BaseCaption>
    <div class="b-palette__col">
      <p class="b-palette__generator-text">
        Simply upload an image, and we’ll use the hues in the image to create your palette.
      </p>

      <div class="b-palette__col" v-if="palette">
        <div class="b-gen-palette">
          <ul class="b-gen-palette__list">
            <li class="b-gen-palette__list-item b-gen-palette__list-item_palette">
              <IconBase
                width="24"
                height="24"
                name="palette"
                color="#A2A5A5"
              />
            </li>
            <li
              v-for="(color, index) in palette"
              :key="color + index"
              :style="{'background-color' : color}"
              class="b-gen-palette__list-item"
            />
          </ul>
        </div>
      </div>

      <div class="b-palette__controls" :class="{ 'b-palette__loaded': palette }">
        <base-upload-button
          v-model="imagePalette"
          @change="changeImagePalette"
          @upload="getInputSrcFiles"
          :progress="progress"
          @startProgress="startProgress"
        >
        </base-upload-button>
        <base-button v-if="palette" color="main-green" size="small" @click="applyPalette">
          Apply palette
        </base-button>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash-es'
import ColorThief from 'colorthief/dist/color-thief.umd.js'

export default {
  name: 'TheColorPalette',
  data () {
    return {
      imageForColorThief: null,
      progress: false,
      colorLabels: {
        headers: 'Headers',
        text: 'Plain text',
        button: 'Button background',
        buttonText: 'Button text',
        add1: 'Additional color',
        add2: 'Additional color'
      }
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    colors () {
      return Object.values(this.currentLanding.settings.colors).slice(0, 6)
    },

    labelsArray () {
      return Object.values(this.colorLabels)
    },

    palette () {
      return this.currentLanding.settings.palette
    },

    imagePalette () {
      return this.currentLanding.settings.imageForPalette
    }
  },

  watch: {
    imageForColorThief (images) {
      const image = images[0] || images
      const reader = new FileReader()
      const preview = document.createElement('img')
      const colorThief = new ColorThief()

      preview.crossOrigin = 'Anonymous'
      preview.setAttribute('width', '100')
      preview.setAttribute('height', '200')

      reader.readAsDataURL(image)
      reader.onloadend = function () {
        preview.src = reader.result
      }

      setTimeout(() => {
        const getPalette = colorThief.getPalette(preview, 6)

        if (getPalette === null) {
          this.progress = false
          return
        }

        const palette = getPalette.map(c => {
          return this.getRgbaFromArray(c)
        })

        this.storeSaveSettingsPalette({ palette: _.uniqBy(palette), image: this.imagePalette })
        this.progress = false
      }, 1000)
    },

    imagePalette () {
      // this.applySettings()
    }
  },

  methods: {
    ...mapActions(['storeSaveSettingsPalette', 'storeColorSettings', 'activateCheckListItem']),

    changePaletteColor (e, index) {
      let colors = this.colors.slice()
      colors[index] = this.getRgbaString(e.rgba)
      this.storeColorSettings(colors)
      this.activateCheckListItem('colors')
    },

    getRgbaString (colorObject) {
      const color = Object.values(colorObject).toString()
      return `rgba(${color})`
    },

    getRgbaFromArray (colorArray) {
      return `rgba(${colorArray.toString()}, 1)`
    },

    changeImagePalette (value) {
      if (value === null) {
        this.activateCheckListItem('colors')
        this.storeSaveSettingsPalette({ palette: null, image: null })
      }
    },

    getInputSrcFiles (value) {
      this.progress = true
      this.imageForColorThief = value
    },

    startProgress (value) {
      this.progress = value
    },

    applyPalette () {
      this.storeColorSettings(this.palette)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-palette
  height: 100%
  position: relative

  &__row
    display: flex
    flex-direction: column
    align-items: flex-start

    margin: 0 0 3rem
    padding: 0

  &__col
    width: 100%
    max-width: 24rem
    padding: 1rem 0 1rem 1.8rem

  &__generator-text
    font-size: 1.2rem
    line-height: 1.4
    color: #575A5F
    font-weight: 600

  &__controls
    display: flex
    justify-content: center
    margin-top: 1.5rem

  &__loaded
    justify-content: space-between
    margin-top: 0

    & > *
      width: 49%

.b-gen-palette
  &__list
    display: flex
    justify-content: center

    margin: 0 0 $size-step / 4 0
    padding: 0

    &-item
      list-style: none
      width: 2rem
      height: 2rem
      border-radius: 100%
      margin: 4px
      &_palette
        margin: 2px 14px 4px 4px
</style>
