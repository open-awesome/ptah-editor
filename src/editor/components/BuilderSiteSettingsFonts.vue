<template>
  <div id="settings-fonts">
    <v-style>
      <template v-for="font in visibleFonts">
        {{ `@import url("https://fonts.googleapis.com/css?family=${font.family}:${font.variant}");` }}
      </template>
    </v-style>
    <form id="fonts-form" @submit.prevent="saveFonts">
      <base-fieldset class="b-setup-fonts" v-if="!isChange">
        <div class="b-setup-fonts-header">
          <span>
            Load time:
            <span :style="{ color: status.color }">
              {{ status.text }}
            </span>
          </span>
        </div>
        <base-scroll-container
          class="b-scrolled-content"
          backgroundBar="#999"
          v-if="isLoaded"
        >
        <div class="b-setup-fonts-list">
          <div v-for="(el, key) in setupFonts" :key="key" class="b-setup-fonts-list__item">
            <div class="b-setup-fonts-list__sample" :style="{
              'font-family': `${setupFonts[key]}`
            }">
              Lorem ipsum dolor amet, consectetur adipisicing elit.
            </div>
            <div class="b-setup-fonts-list__font">
              <div class="b-setup-fonts-list__font-row">
                <div class="b-setup-fonts-list__font-usage">{{ textFonts[key] }}</div>
                <div class="b-setup-fonts-list__font-name">{{ setupFonts[key] }}</div>
              </div>
              <span class="b-setup-fonts-list__item-buttons">
                <div class="b-setup-fonts-list__font-check">
                  <icon-base
                    name="check-mark"
                    color="#fff"
                    width="15"
                    height="15"
                  />
                </div>
                <div class="change-font" @click="changeFont(el, key)">
                  <icon-base
                    name="recycle"
                    color="#fff"
                    width="20"
                    height="20"
                  />
                  <span>change my font</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        </base-scroll-container>
      </base-fieldset>
      <base-fieldset class="library" v-if="isChange">

        <!-- dirty hack -->
        <div class="library__close" @click="isChange = false">
          <icon-base name="arrowDown" width="12" height="15" />
        </div>

        <div class="b-font-filter">
          <div>
            <base-text-field
              class="b-font-filter__search"
              placeholder="Search ..."
              v-model="search"
            />
          </div>
        </div>

        <div class="b-fonts-block" v-if="fontsLoaded">
          <div class="b-fonts-block__list"
            ref="blockFonts"
            :class="{ '_m': editFont !== null }"
          >
            <base-scroll-container
              class="b-scrolled-content"
              backgroundBar="#999"
              v-if="isLoaded"
            >
                <ul class="b-fonts-list">
                  <li class="b-fonts-list__item _selected"
                      :class="[
                        { '_applied' : selectedEl === font.family }
                      ]"
                      v-for="(font, index) in visibleFonts"
                      :key="index"
                  >
                    <span
                      class="b-fonts-list__item-check"
                      v-if="containsFont(font.family)"
                    >
                      <icon-base
                        name="check-mark"
                        color="#fff"
                        width="15"
                        height="15"
                      />
                    </span>
                    <div class="b-fonts-list__item-family">
                      {{ font.family  }}
                      <!--<span class="b-fonts-list__item-category">
                        {{ font.category  }}
                      </span>-->
                    </div>
                    <div class="b-simple-text" :style="{
                        'font-family': font.family
                      }">
                      {{ defText }}
                    </div>
                    <div class="b-fonts-list__item-button">
                      <font-subsets
                        v-if="selectFonts[checkSpace(font.family)] !== undefined"
                        :font="font"
                        :subsets="getSubsets(font)"
                        @input="toggleFontSubset($event)"
                      >
                      </font-subsets>
                    </div>

                    <div
                      v-if="selectedEl !== font.family"
                      class="add-font"
                      @click="applyFont(font)"
                    >
                      <icon-base
                        name="plus"
                        color="#fff"
                        width="20"
                        height="20"
                      />
                      <span>Apply to {{textFonts[selectedKey]}}</span>
                    </div>
                  </li>
                </ul>
            </base-scroll-container>
          </div>

        </div><!-- /.b-fonts-block -->
      </base-fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { mapState, mapActions } from 'vuex'
import { throttle } from 'lodash-es'

import Vue from 'vue'
import FontSubsets from './FontSubsets'
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

export default {
  name: 'BuilderSiteSettingsFonts',

  components: { FontSubsets, BuilderModalContentLayout },

  data () {
    return {
      list: [],
      search: '', // filter fonts
      editFont: null,
      defText: 'Lorem ipsum dolor amet, consectetur adipisicing elit.',
      statusList: [
        { text: 'fast', color: 'green' },
        { text: 'medium', color: 'orange' },
        { text: 'slow', color: 'red' },
        { text: 'slow', color: 'red' },
        { text: 'slow', color: 'red' }
      ],
      textFonts: {
        'h1': this.$i18n.t('font.h1'),
        // 'h2': this.$i18n.t('font.h2'),
        // 'h3': this.$i18n.t('font.h3'),
        'p': this.$i18n.t('font.p'),
        'btn': this.$i18n.t('font.btn')
      },
      isChange: false,
      selectedEl: null,
      selectedKey: null,
      isLoaded: false,
      topEl: null,
      bottomEl: null,
      topList: null,
      visibleFonts: [],
      filteredFonts: [],
      tempFonts: [],
      isLoadingFonts: false
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    fonts () {
      return this.currentLanding.settings.fonts || {}
    },

    fontsLoaded () {
      return true
    },

    selectFonts () {
      return this.fonts
    },

    selectFontsLength () {
      return Object.keys(this.selectFonts).length
    },

    setupFonts () {
      return this.currentLanding.settings.setupFonts || {}
    },

    status () {
      const length = Object.keys(this.selectFonts).length - 1
      return this.statusList[length] || this.statusList[0]
    }
  },

  watch: {
    isChange (value) {
      const delay = 250
      this.filterFonts()
      value
        ? window.addEventListener('wheel', throttle(this.renderFonts, delay))
        : window.removeEventListener('wheel', throttle(this.renderFonts, delay))
      this.search = ''
    },

    search () {
      this.searchFonts()
    }
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'storeSaveSettingsFonts',
      'storeSaveSettingsSetupFonts',
      'activateCheckListItem'
    ]),

    getFontsData () {
      this.isLoaded = false
      axios('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDKi8oKqvLuCASo7XZg4wY_D3CMib_Sg9U&sort=popularity')
        .then(response => {
          this.list = response.data.items
          this.isLoaded = true
        })
        .catch(err => {
          this.list = this.fonts
          this.isLoaded = true
          console.warn(err)
        })
    },

    filterFonts () {
      let defFonts = this.list

      defFonts.forEach((font, index) => {
        if (this.selectFonts[this.checkSpace(font.family)]) {
          defFonts.unshift(...defFonts.splice(index, 1))
        }
      })

      this.filteredFonts = defFonts.filter((font) => ~font.family.toLowerCase().indexOf(this.search.toLowerCase()))
      this.filterVisibledFonts()
    },

    searchFonts () {
      this.visibleFonts = this.tempFonts.filter((font) => ~font.family.toLowerCase().indexOf(this.search.toLowerCase()))
    },

    filterVisibledFonts () {
      let defFonts = this.visibleFonts

      defFonts.forEach((font, index) => {
        if (this.selectFonts[this.checkSpace(font.family)]) {
          defFonts.unshift(...defFonts.splice(index, 1))
        }
      })

      this.visibleFonts = defFonts
    },

    saveFonts () {
      this.activateCheckListItem('fonts')

      this.storeSettings({
        fonts: this.selectFonts
      })

      this.isLoaded = false

      this.close()
    },

    close () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    storeFonts () {
      this.storeSaveSettingsFonts(this.selectFonts)
    },

    storeSetupFonts (font) {
      let setupFonts = {}

      setupFonts[this.selectedKey] = font.family

      this.storeSaveSettingsSetupFonts(setupFonts)
    },

    applyFont (font) {
      const name = this.checkSpace(font.family)
      const variant = font.variant

      this.editFont = font
      this.selectFonts[name] = {
        variants: [variant],
        subsets: ['latin']
      }
      this.storeFonts()
      this.storeSetupFonts(font)

      this.removeFont(this.selectedEl)

      this.selectedEl = font.family
      this.editFont = null
      this.isChange = false
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

    loadedFont (font) {
      return this.visibleFonts.find(f => f.family === this.checkSpace(font))
    },

    getSubsets (font) {
      const name = this.checkSpace(font.family)

      return font.subsets.map((subset) => {
        return {
          name: subset,
          status: this.selectFonts[name].subsets.indexOf(subset) > -1
        }
      })
    },

    toggleFontSubset ({ font, subsets }) {
      const name = this.checkSpace(font.family)
      this.selectFonts[name].subsets = subsets
      this.storeFonts()
    },

    removeFont (family) {
      if (this.editFont !== null && this.editFont.family === family) {
        this.editFont = null
      }

      let isFind = false

      for (let key in this.setupFonts) {
        if (this.setupFonts[key] === family) {
          isFind = true
        }
      }

      if (!isFind) {
        delete this.selectFonts[this.checkSpace(family)]
      }

      this.storeFonts()
    },

    renderFonts (e) {
      let elements = []
      const length = this.visibleFonts.length ? this.visibleFonts.length : 0

      if (!this.isChange || this.isLoadingFonts || (e && e.deltaY < 0)) {
        return
      }

      this.isLoadingFonts = true

      elements = this.filteredFonts.slice(length, length + 6)

      elements.forEach(el => {
        if (this.loadedFont(el.family) !== undefined) {
          return
        }

        this.visibleFonts.push({
          family: el.family,
          variant: el.variants[0],
          category: el.category,
          subsets: el.subsets
        })

        this.tempFonts = this.visibleFonts
      })

      setTimeout(() => {
        this.isLoadingFonts = false
      }, 600)
    },

    changeFont (el, key) {
      this.selectedEl = el
      this.selectedKey = key
      this.isChange = !this.isChange

      this.$nextTick(() => {
        this.renderFonts()
      })
    }
  },

  created () {
    this.getFontsData()
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

@mixin checkMark
  position: absolute
  bottom: 0
  right: 0
  width: 3.5rem
  height: 3.5rem

  display: flex
  align-items: center
  justify-content: center

  background: $main-green
  border-radius: 10px 0 7px 0

@mixin control
  position: absolute
  bottom: 0
  right: 0
  width: 3.5rem
  height: 3.5rem

  display: flex
  align-items: center
  justify-content: center

  transition: width 0.3s ease-in-out

  cursor: pointer

  span
    display: block
    font-size: 1rem
    font-weight: bold
    text-transform: uppercase
    color: #fff
    opacity: 0
    width: 0
    transition: opacity 0.5s
    white-space: nowrap

  &:hover
    width: 16rem
    padding: 0 1rem
    span
      opacity: 1
      width: auto
      margin-left: .7rem

#settings-fonts, #fonts-form
  height: 100%

.library
  height: calc(100% - 1.5rem)
  margin-bottom: 0

.b-fonts-block
  display: flex
  justify-content: stretch
  height: 100%
  position: relative

  &__list
    width: 100%
    position: absolute
    top: 0
    bottom: 0
    left: 0
    &._m
      width: 70%
  &__controls
    display: flex
    justify-content: flex-end

.b-font-filter
  display: flex
  &__search
    width: 35rem
    margin: 0 3.2rem 1rem 1.5rem
    /deep/
      & input
        padding-left: 3.6rem
        background: url("https://s3.protocol.one/src/o_ItVIs.png") no-repeat 1rem center
  &__sw
    width: $size-step * 5.5
    margin-left: $size-step
  &__text
    width: 300px

.b-fonts-list
  padding: 0 0 0 1.5rem
  margin: 0
  &__item
    $this: &
    width: 35rem
    height: 17rem
    padding: 0
    margin: 0 0 1.5rem
    list-style: none

    display: flex
    justify-content: left
    align-items: center

    border: 2px solid $main-green
    border-radius: 10px

    position: relative

    .add-font
      display: none

    &._selected
      flex-direction: column
      align-items: flex-start

    &-family
      height: 5.8rem
      font-size: 1.6rem
      line-height: 2.2rem
      letter-spacing: 0.065em
      display: flex
      align-items: center
      padding: 0 1.8rem

    &._applied
      //color: #fff
      background-color: rgba($main-green, .1)
      #{$this}-category
        color: #fff
    &-category
      color: $gray300
    &:last-child
      border-bottom: none
    &-button
      display: block
      position: absolute
      top: 0
      right: 0
      &-apply
        width: auto
    &:hover
      .add-font
        display: flex
      #{$this}-button
        display: block
    &-check
      @include checkMark

.b-scrolled-content
  margin: 0
  &__inner
    height: 100%
    margin: 0
.b-remove-btn
  width: 140px

.b-font-edit
  min-width: 30%
  position: relative
  border-left: 1px solid #C4C4C4
  &__close
    position: absolute
    z-index: 1
    top: $size-step / 2
    right: $size-step / 2
    cursor: pointer
    &:hover svg
      fill: $main-green
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
    margin: $size-step/2 $size-step $size-step $size-step/2
    display: flex
    flex-direction: column

.b-font-edit-variants
  padding-bottom: $size-step
  &__header
    font-weight: bold
    padding: 0 0 $size-step/2 $size-step/2
  &__content
    height: 300px
    .b-font-edit__list-item
      position: relative
      font-size: 1.6rem
      line-height: 1.5
      color: #818181
      cursor: pointer
      padding-left: $size-step/2
      .b-fonts-list__item-check
        left: 0
        top: 3px

.b-header-fonts-block
  display: flex
  align-items: center
  margin-bottom: 32px
  &__logo
    width: 193px
    height: 50px
    margin-left: -14px
  &__text
    font-size: 16px
    line-height: 19px
    color: #333333
    margin-left: 36px
    text-align: left

.b-setup-fonts
  margin: 0
  height: 100%
  &-header
    display: flex
    justify-content: center
    align-items: center
    padding: 1rem
    font-size: 1.8rem
    line-height: 2.2rem
  &-list
    padding: 0
    margin: 0
    width: 100%
    padding-left: 1.5rem
    &__item
      $this: &
      border: 2px solid $main-green
      box-sizing: border-box
      border-radius: 10px
      margin-bottom: 1.5rem
      width: 35rem

      .change-font
        display: none

      &:hover
        .b-setup-fonts-list__font-check
          display: none
        .change-font
          display: flex

    &__sample
      height: 10rem
      display: flex
      align-items: center
      padding: 1.3rem
      font-size: 2.1rem
      line-height: 2.5rem
      letter-spacing: 0.065em
      box-sizing: border-box
    &__font
      height: 10rem
      position: relative
      padding: 2rem 4.4rem
      background: rgba($main-green, 0.1)
      border-top: 2px solid $main-green
      box-sizing: border-box
      &-row
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
      &-usage
        font-weight: 800
        font-size: 1.6rem
        line-height: 2.2rem
        letter-spacing: 0.065em
        text-transform: uppercase
        color: $main-green
        text-align: left
      &-name
        font-size: 1.6rem
        line-height: 2.2rem
      &-check
        @include checkMark

.b-simple-text
  height: 11.5rem
  box-sizing: border-box
  padding: .8rem 1.8rem
  font-size: 2.1rem
  line-height: 2.5rem
  letter-spacing: 0.065em
  border-top: 1px solid #F4F4F4

.change-font
  @include control
  background: $red-violet
  border-radius: 10px 0 7px 0

.add-font
  @include control
  background: $yellow
  border-radius: 10px 0 7px 0

.library__close
  position: absolute
  right: 2rem
  top: -4.4rem
  background: #fff
  width: 2rem
  height: 2rem
  display: flex
  justify-content: center
  align-items: center
  z-index: 10
  cursor: pointer

  svg
    fill: #A2A5A5
    transform: rotate(90deg)
</style>
