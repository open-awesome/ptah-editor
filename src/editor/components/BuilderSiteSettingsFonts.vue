<template>
  <builder-modal-content-layout id="settings-fonts" :noScroll="true">
    <form id="fonts-form" @submit.prevent="saveFonts">
      <base-fieldset>
        <base-heading level="2">
          {{ $t('s.loadFontsText') }}
        </base-heading>

        <div class="b-font-filter">
          <div>
            <base-text-field
              class="b-font-filter__search"
              placeholder="Search ..."
              v-model="search"
            />
          </div>
          <div>
             Selected: {{ selectFontsLength }}
          </div>
        </div>

        <div class="b-fonts-block" v-if="fontsLoaded">
          <base-scroll-container
            class="b-scrolled-content"
            backgroundBar="#999"
          >
            <div class="b-scrolled-content__inner">
              <ul class="b-fonts-list">
                <li class="b-fonts-list__item"
                    v-for="font in filteredFonts"
                    :key="font.family"
                >
                  <span
                    class="b-fonts-list__item-check"
                    v-if="containsFont(font.family)"
                  >
                    <icon-base name="checkMark" width="12" height="15" />
                  </span>
                  <div>
                    {{ font.family  }}
                    <span class="b-fonts-list__item-category">
                      {{ font.category  }}
                    </span>
                  </div>
                  <div class="b-fonts-list__item-button">
                    <base-button
                      v-if="selectFonts[checkSpace(font.family)] === undefined"
                      size="small"
                      color="blue"
                      v-text="'Add to site'"
                      type="submit"
                      form="cookies-form"
                      @click="addFont(font)"
                    />
                    <base-button
                      v-if="selectFonts[checkSpace(font.family)] !== undefined"
                      size="small"
                      color="gray"
                      v-text="'Edit'"
                      type="submit"
                      form="cookies-form"
                      @click="editFont = font"
                    />
                    <base-button
                      class="b-remove-btn"
                      v-if="selectFonts[checkSpace(font.family)] !== undefined"
                      size="small"
                      color="black"
                      v-text="'Remove from site'"
                      type="submit"
                      form="cookies-form"
                      @click="removeFont(font.family)"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </base-scroll-container>
          <div class="b-font-edit"
            v-if="editFont !== null"
          >
            <div class="b-font-edit__close"
              @click="editFont = null"
            >
              <icon-base
                name="close"
                color="#c4c4c4"
                width="14"
                height="14"
              />
            </div>
            <div class="b-font-edit__padd">
              <div class="b-font-edit-variants">
                <div class="b-font-edit-variants__header">
                  Set Font Variants
                </div>
                <div class="b-font-edit-variants__content">
                  <base-scroll-container
                    class="b-scrolled-content"
                    backgroundBar="#999"
                  >
                    <div class="b-scrolled-content__inner">
                      <ul class="b-font-edit__list">
                        <li class="b-font-edit__list-item"
                            v-for="variant in editFont.variants"
                            :key="variant"
                        >
                          {{ variant }}
                        </li>
                      </ul>
                    </div>
                  </base-scroll-container>
                </div>
              </div>
              <div class="b-font-edit-variants">
                <div class="b-font-edit-variants__header">
                  Set Font Subsets
                </div>
                <div class="b-font-edit-variants__content">
                  <base-scroll-container
                    class="b-scrolled-content"
                    backgroundBar="#999"
                  >
                    <div class="b-scrolled-content__inner">
                      <ul class="b-font-edit__list">
                        <li class="b-font-edit__list-item"
                            v-for="subset in editFont.subsets"
                            :key="subset"
                        >
                          {{ subset }}
                        </li>
                      </ul>
                    </div>
                  </base-scroll-container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </base-fieldset>
    </form>

    <div slot="controls">
      <base-button size="middle" v-text="$t('nav.cancel')" :transparent="true" @click="close()" color="gray"/>
      <base-button size="middle" color="blue" v-text="$t('nav.save')" type="submit" form="cookies-form"/>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import axios from 'axios'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { mapState, mapActions } from 'vuex'

const FONT_URL = 'https://fonts.googleapis.com/css?family='

export default {
  name: 'BuilderSiteSettingsFonts',

  components: { BuilderModalContentLayout },

  data () {
    return {
      list: [],
      search: '', // filter fonts
      editFont: null
    }
  },

  computed: {
    ...mapState({
      fonts: ({ currentLanding: { settings } }) => settings.fonts ? settings.fonts : {}
    }),

    fontsLoaded () {
      return true
    },

    filteredFonts () {
      return this.list.filter((font) => ~font.family.toLowerCase().indexOf(this.search.toLowerCase()))
    },

    selectFonts () {
      return this.fonts
    },

    selectFontsLength () {
      return Object.keys(this.selectFonts).length
    }
  },

  methods: {
    ...mapActions(['storeSettings']),

    getFontsData () {
      axios('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDKi8oKqvLuCASo7XZg4wY_D3CMib_Sg9U&sort=popularity')
        .then(response => {
          this.list = response.data.items
        })
        .catch(err => {
          console.warn(err)
        })
    },

    saveFonts () {
      this.storeSettings({
        fonts: this.selectFonts
      })
    },

    close () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    addFont (font) {
      const name = this.checkSpace(font.family)
      this.selectFonts[name] = {
        variants: ['regular'],
        subsets: ['latin', 'cyrillic']
      }
      this.editFont = font
      this.saveFonts()
    },

    checkSpace (family) {
      if (family.indexOf(' ') !== -1) {
        return family.replace(/\s/g, '+')
      } else {
        return family
      }
    },

    containsFont (family) {
      return this.selectFonts[this.checkSpace(family)] !== undefined
    },

    removeFont (family) {
      if (this.editFont.family === family) {
        this.editFont = null
      }
      delete this.selectFonts[this.checkSpace(family)]
      this.saveFonts()
    }
  },

  mounted () {
    this.getFontsData()
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-fonts-block
  display: flex
  flex-grow: 1
  height: 45rem

  border: 1px solid #C4C4C4
.b-font-filter
  display: flex
  justify-content: stretch
  &__search
    width: 50%
    margin: 0 3.2rem 1rem 0
    /deep/
      & input
        padding-left: 3.6rem
        background: url("https://s3.protocol.one/src/o_ItVIs.png") no-repeat left center

.b-fonts-list
  padding: 0
  margin: 0
  &__item
    $this: &
    width: 100%
    height: $size-step * 1.5
    padding: $size-step/2
    margin: 0

    border-bottom: 1px solid #C4C4C4
    list-style: none

    display: flex
    justify-content: left
    align-items: center

    position: relative
    &-category
      color: $gray300
    &:last-child
      border-bottom: none
    &-button
      display: none
      position: absolute
      top: 5px
      right: 20px
    &:hover
      #{$this}-button
        display: block
    &-check
      position: absolute
      top: 3px
      left: 4px
      & svg
        fill: #00FF0A

.b-scrolled-content
  margin: 0
  flex-grow: 1
  &__inner
    height: 100%
    margin: 0
.b-remove-btn
  width: 140px
.b-font-edit
  width: 300px
  position: relative
  border-left: 1px solid #C4C4C4
  &__close
    position: absolute
    z-index: 1
    top: $size-step / 2
    right: $size-step / 2
    cursor: pointer
    &:hover svg
      fill: $dark-blue-krayola
  &__list
    position: relative
    z-index: 0
    margin: 0
    padding: 0
    &-item
      list-style: none
      font-size: 1.2rem
      line-height: 1.6rem
  &__padd
    margin: $size-step

    display: flex
    flex-direction: column
.b-font-edit-variants
  padding-bottom: $size-step
  &__header
    font-weight: bold
    padding-bottom: 10px
  &__content
    height: 150px
</style>
