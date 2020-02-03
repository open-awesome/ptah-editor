<template>
  <builder-modal-content-layout id="settings-fonts" :noScroll="true">
    <form id="fonts-form" @submit.prevent="saveFonts">
      <base-fieldset class="b-setup-fonts" v-if="!isChange">
        <div class="b-setup-fonts-header">
          <base-heading level="2">
            {{ $t('s.setupFonts') }}
          </base-heading>
          <span>
            Load time:
            <span :style="{ color: status.color }">
              {{ status.text }}
            </span>
          </span>
        </div>
        <ul class="b-setup-fonts-list">
          <li v-for="(el, key) in setupFonts" :key="key" class="b-setup-fonts-list__item">
            <span class="b-setup-fonts-list__item-names" :style="{
              'font-family': `${setupFonts[key]}`
            }">
              {{ textFonts[key] }}: {{ setupFonts[key] }}
            </span>
            <span class="b-setup-fonts-list__item-buttons">
              <base-button
                size="small"
                color="blue"
                v-text="'Change'"
                @click="changeFont(el, key)"
              />
            </span>
          </li>
        </ul>
      </base-fieldset>
      <base-fieldset v-if="isChange">
        <div class="b-header-fonts-block">
          <div class="b-header-fonts-block__logo">
            <img src="https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/dde0bbef-6a92-46e5-b8c4-437524f99a85.png" />
          </div>
          <div class="b-header-fonts-block__text">
            {{ $t('s.loadFontsText') }}
          </div>
        </div>
        <div class="b-font-filter">
          <div>
            <base-text-field
              class="b-font-filter__search"
              placeholder="Search ..."
              v-model="search"
            />
          </div>
          <div class="b-font-filter__sw">
            <BaseSwitcher
              v-model="isFilterSelected"
              :label="`Show only added  `"
            />
          </div>
          <div class="b-font-filter__sw">
            <base-text-field
              class="b-font-filter__text"
              v-model="defText"
            />
          </div>
        </div>

        <div class="b-fonts-block" v-if="fontsLoaded">
          <div class="b-fonts-block__list">
            <base-scroll-container
              class="b-scrolled-content"
              backgroundBar="#999"
            >
              <div class="b-scrolled-content__inner">
                <ul class="b-fonts-list">
                  <li class="b-fonts-list__item"
                      :class="[
                        { '_selected' : containsFont(font.family) },
                        { '_applied' : selectedEl === font.family }
                      ]"
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
                    <div v-if="containsFont(font.family)" :style="{
                      'font-family': font.family,
                      'font-size': '23px',
                      'font-weight': '400',
                    }">
                      {{ defText }}
                    </div>
                    <div class="b-fonts-list__item-button">
                      <base-button
                        v-if="selectedEl !== font.family"
                        class="b-fonts-list__item-button-apply"
                        size="small"
                        color="blue"
                        v-text="`Apply to ${textFonts[selectedKey]}`"
                        @click="applyFont(font)"
                      />
                      <base-button
                        v-if="selectFonts[checkSpace(font.family)] !== undefined"
                        size="small"
                        color="gray"
                        v-text="'Edit'"
                        @click="editFont = font"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </base-scroll-container>
          </div>
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
                          @click="toggleFontSubset(subset)"
                        >
                          <span
                            class="b-fonts-list__item-check"
                            v-if="containsFontSubset(subset)"
                          >
                            <icon-base name="checkMark" width="12" height="15" />
                          </span>
                          {{ subset }}
                        </li>
                      </ul>
                    </div>
                  </base-scroll-container>
                </div>
              </div>
            </div>
          </div>
        </div><!-- /.b-fonts-block -->

        <div class="b-fonts-block__controls">
          <base-button
            size="small"
            v-text="$t('nav.cancel')"
            :transparent="true"
            @click="isChange = false"
            color="gray"
          />
          <base-button
            size="small"
            v-text="$t('nav.save')"
            :transparent="true"
            @click="isChange = false"
            color="gray"
          />
        </div>
      </base-fieldset>
    </form>

    <template v-if="!isChange">
      <div slot="controls">
        <base-button size="middle" v-text="$t('nav.cancel')" :transparent="true" @click="close()" color="gray"/>
        <base-button size="middle" color="blue" v-text="$t('nav.save')" type="submit" form="fonts-form"/>
      </div>
    </template>
  </builder-modal-content-layout>
</template>

<script>
import axios from 'axios'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BuilderSiteSettingsFonts',

  components: { BuilderModalContentLayout },

  data () {
    return {
      list: [],
      search: '', // filter fonts
      editFont: null,
      isFilterSelected: false,
      defText: this.$i18n.t('font.defText'),
      statusList: [
        { text: 'fast', color: 'green' },
        { text: 'medium', color: 'orange' },
        { text: 'slow', color: 'red' },
        { text: 'slow', color: 'red' }
      ],
      textFonts: {
        'h1': this.$i18n.t('font.h1'),
        'h2': this.$i18n.t('font.h2'),
        'h3': this.$i18n.t('font.h3'),
        'p': this.$i18n.t('font.p'),
        'btn': this.$i18n.t('font.btn')
      },
      isChange: false,
      selectedEl: null,
      selectedKey: null
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

    filteredFonts () {
      let defFonts = this.list

      if (this.isFilterSelected) {
        defFonts = defFonts.filter((font) => {
          return this.selectFonts[this.checkSpace(font.family)]
        })
      }
      return defFonts.filter((font) => ~font.family.toLowerCase().indexOf(this.search.toLowerCase()))
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

  methods: {
    ...mapActions(['storeSettings', 'storeSaveSettingsFonts', 'storeSaveSettingsSetupFonts']),

    getFontsData () {
      axios('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDKi8oKqvLuCASo7XZg4wY_D3CMib_Sg9U&sort=popularity')
        .then(response => {
          this.list = response.data.items
        })
        .catch(err => {
          this.list = this.fonts
          console.warn(err)
        })
    },

    saveFonts () {
      this.storeSettings({
        fonts: this.selectFonts
      })

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

      this.editFont = font
      this.selectFonts[name] = {
        variants: ['regular'],
        subsets: ['latin', 'cyrillic']
      }
      this.storeFonts()

      this.storeSetupFonts(font)
      this.removeFont(this.selectedEl)

      this.selectedEl = font.family
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

    containsFontSubset (subset) {
      const name = this.checkSpace(this.editFont.family)

      return this.selectFonts[name].subsets.filter(sub => sub === subset).length > 0
    },

    toggleFontSubset (subset) {
      const name = this.checkSpace(this.editFont.family)
      const isSubset = this.selectFonts[name].subsets.filter(sub => sub === subset).length > 0
      const subsets = this.selectFonts[name].subsets.filter(sub => sub !== subset)

      if (isSubset) {
        this.selectFonts[name].subsets = subsets
      } else {
        this.selectFonts[name].subsets = [
          ...subsets,
          subset
        ]
      }

      this.storeFonts()
    },

    removeFont (family) {
      if (this.editFont !== null && this.editFont.family === family) {
        this.editFont = null
      }

      let isFind = false

      for (let key in this.setupFonts) {
        const fontName = this.setupFonts[key]
        if (fontName === family) {
          isFind = true
        }
      }

      if (!isFind) {
        delete this.selectFonts[this.checkSpace(family)]
      }

      this.storeFonts()
    },

    changeFont (el, key) {
      this.selectedEl = el
      this.selectedKey = key
      this.isChange = !this.isChange
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
.b-header-fonts-block
  display: flex
  justify-content: stretch

.b-fonts-block
  display: flex
  justify-content: stretch
  height: 41rem

  border: 1px solid #C4C4C4
  &__list
    width: 100%
  &__controls
    display: flex
    justify-content: flex-end

.b-font-filter
  display: flex
  &__search
    width: 100%
    margin: 0 3.2rem 1rem 1rem
    /deep/
      & input
        padding-left: 3.6rem
        background: url("https://s3.protocol.one/src/o_ItVIs.png") no-repeat left center
  &__sw
    width: $size-step * 5.5
    margin-left: $size-step
  &__text
    width: 300px

.b-fonts-list
  padding: 0
  margin: 0
  &__item
    $this: &
    width: 100%
    height: $size-step * 1.5
    padding: $size-step/2 $size-step/2 $size-step/2 $size-step
    margin: 0

    border-bottom: 1px solid #C4C4C4
    list-style: none

    display: flex
    justify-content: left
    align-items: center

    position: relative
    &._selected
      flex-direction: column
      align-items: flex-start

      padding: $size-step/8 $size-step/2 $size-step/8 $size-step
      #{$this}-check
        top: 5px

    &._applied
      color: #fff
      background-color: $dark-blue-krayola
      #{$this}-category
        color: #fff
    &-category
      color: $gray300
    &:last-child
      border-bottom: none
    &-button
      display: none
      position: absolute
      top: 5px
      right: 20px
      &-apply
        width: auto
    &:hover
      #{$this}-button
        display: block
    &-check
      position: absolute
      top: 15px
      left: 13px
      & svg
        fill: #00FF0A

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
    text-align: center

.b-setup-fonts
  &-header
    display: flex
    justify-content: space-between
    align-items: center
  &-list
    padding: 0
    margin: 0
    &__item
      $this: &
      display: flex
      align-items: center
      list-style: none
      height: $size-step * 1.5
      line-height: 1
      margin: $size-step/4 0
      &-names
      &:nth-child(4)
        #{$this}-names
          font-size: 16px
      &:nth-child(3)
        #{$this}-names
          font-size: 24px
      &:nth-child(2)
        #{$this}-names
          font-size: 32px
      &:nth-child(1)
        #{$this}-names
          font-size: 48px
      & > *
        display: block
        position: relative
      &-buttons
        display: none
      &:hover
        #{$this}-buttons
          display: block
</style>
