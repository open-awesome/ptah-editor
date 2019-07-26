<script>
import { omit } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'BuilderAddSectionBar',
  props: {
    builder: {
      type: Object,
      required: true
    },
    title: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      selectedGroup: [],
      selectedSection: null,
      isVisibleBar: false,
      fullScreenView: false,
      search: '', // filter sections,
      processing: false,
      groupSrc: {
        Header: {
          descr: 'Small section for external navigation',
          ico: 'sectionHeader',
          width: 25
        },
        FirstScreen: {
          descr: 'Your project face and make-up',
          ico: 'sectionFirstScreen',
          width: 18
        },
        Columns: {
          descr: 'Additional features short description',
          ico: 'sectionColumns',
          width: 26
        },
        Elements: {
          descr: 'Additional page customization details',
          ico: 'sectionElements',
          width: 20
        },
        Footer: {
          descr: 'Page finalization small section',
          ico: 'sectionFooter',
          width: 23
        },
        Forms: {
          descr: 'Subscribe your visitors for updates',
          ico: 'sectionForms',
          width: 21
        },
        Galleries: {
          descr: 'Picture gallery for a spectacular presentation',
          ico: 'sectionGallery',
          width: 26
        },
        Products: {
          descr: 'List your game editions, bundles and packs.',
          ico: 'sectionProducts',
          width: 26
        },
        Slider: {
          descr: 'Main features fullscreen slider',
          ico: 'sectionSlider',
          width: 32
        }
      }
    }
  },

  computed: {
    ...mapState('Sidebar', ['builderSections', 'builderGroups']),

    hasHeader () {
      return this.builder.sections.some(section => section.isHeader)
    },

    groups () {
      if (this.hasHeader) {
        return omit(this.builderGroups, 'Header')
      }
      return this.builderGroups
    },

    sections () {
      return this.builderSections
    },

    barWidth () {
      return this.fullScreenView ? '100%' : '28.8rem'
    },

    filteredSeciton () {
      return this.fullScreenView ?
        this.selectedGroup.filter((section) => ~section.name.toLowerCase().indexOf(this.search.toLowerCase())) :
        this.selectedGroup
    }
  },

  methods: {
    selectGroup (group) {
      this.selectedGroup = group
      this.selectedSection = group[0]
      this.addSection(this.selectedSection)
    },
    selectSection (section) {
      if (this.processing) {
        return
      }

      this.processing = true
      this.selectedSection = section
      this.addSection(this.selectedSection)
    },
    addSection (section) {
      this.builder.add(this.selectedSection, this.builder.sections.length + 1)
      this.closeAddSectionBar()
      this.$emit('add', this.builder.sections[this.builder.sections.length - 1])
    },
    showSelectSection (group) {
      this.selectedGroup = group
      this.isVisibleBar = true
    },
    closeAddSectionBar () {
      this.$emit('requestClose')
      this.isVisibleBar = false
      this.selectedSection = null
      this.selectedGroup = null
    },
    toggleView () {
      this.fullScreenView = !this.fullScreenView
      if (!this.fullScreenView) {
        this.search = ''
      }
    }
  }
}
</script>

<template>
  <div class="b-add-section">

    <base-button
      v-if="isVisibleBar"
      color="white"
      :transparent="true"
      size="middle"
      class="b-add-section__toggle-bar"
      @click="toggleView()">
      <template v-if="fullScreenView">{{ $t('s.minimize') }}</template>
      <template v-if="!fullScreenView">{{ $t('s.fullScreenView') }}</template>
    </base-button>

    <div class="b-add-section__header">
      <span class="b-add-section__title">
        {{ title }}
      </span>
      <span class="b-add-section__header-close-bt" @click="closeAddSectionBar">
        <icon-base
          name="close"
          width="14"
          height="14"
        />
      </span>
    </div>
    <div class="b-add-section__padd">
      <BaseScrollContainer
        :styling="{ width: barWidth, height: '100%' }"
        backgroundBar="#fff"
      >
        <ul class="b-add-section__menu is-visiable" ref="menu">
          <li class="b-add-section__menu-group"
              :class="[{ 'b-add-section__menu-group_selected': group === selectedGroup}, `g_${name}`]"
              v-for="(group, name) in groups"
              :key="name"
              v-if="group.length"
              @click="showSelectSection(group)">
            <div class="b-add-section__menu-ico">
              <icon-base :name="groupSrc[name].ico" :width="groupSrc[name].width" />
            </div>
            <div class="b-add-section__menu-header">
              <span class="b-add-section__menu-title">{{ name }}</span>
              <span class="b-add-section__menu-descr">{{ groupSrc[name].descr }}</span>
            </div>
          </li>
        </ul>
      </BaseScrollContainer>

      <div class="b-add-section-bar" v-if="isVisibleBar" :class="{'full-screen': fullScreenView}">
        <div class="b-add-section-bar__header" v-if="fullScreenView">
          <div class="b-add-section-bar__header--title">{{ selectedGroup[0].group }}</div>
          <base-text-field
            class="b-add-section-bar__header--search"
            placeholder="Search ..."
            v-model="search"></base-text-field>
        </div>

        <BaseScrollContainer classes="b-add-section-bar__scrollbar"
          :styling="{ width: barWidth, height: '100%' }" backgroundBar="#333"
          >
        <div class="b-add-section-bar__menu">
          <template v-for="(section, index) in filteredSeciton">
            <div class="b-add-section-bar__menu-element"
                 :class="{ 'b-add-section-bar__menu-element_selected': section === selectedSection }"
                 v-bind:key="index"
                 @click="selectSection(section)">
              <div class="b-add-section-bar__menu-imageholder">
                <img class="b-add-section-bar__menu-image" v-if="section.cover" :src="section.cover"/>
                <div class="b-add-section-bar__menu-title">
                  {{ section.title }}
                </div>
                <div class="b-add-section-bar__menu-descr">
                  {{ section.description }}
                </div>
              </div>
            </div>
          </template>
        </div>
        </BaseScrollContainer>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-add-section
  width: $size-step*9
  background: $white
  position: relative
  z-index: 1

  background: $white
  box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)

  &__toggle-bar
    position: absolute
    top: 1.5rem
    left: 61rem
    z-index: 20
    width: 17rem

  &__header
    position: relative

    display: flex
    align-items: center
    justify-content: flex-start

    width: 100%
    padding: 1.7rem 3.1rem
    &-close-bt
      color: $grey
      position: absolute
      top: 24px
      right: 17px
      cursor: pointer
      &:hover
        color: $dark-blue-krayola
  &__padd
    padding: 0 0 8rem
    height: calc(100% - 8rem)

    display: flex
    flex-direction: column

  &__title
    color: $black
    font-size: 2rem
    line-height: 1.2
    letter-spacing: -0.02em

  &__closer
    position: absolute
    right: 1rem
    top: 1rem
    padding: 0.6rem 1rem
    border: 0
    background: transparent
    cursor: pointer

  &__menu
    padding: 0
    margin: 0
    &-group
      display: flex
      justify-content: flex-start
      align-items: flex-start

      padding: 0 $size-step 0 1rem
      list-style: none
      height: 6.6rem
      font-size: 1.4rem
      color: $gray300
      cursor: pointer

      svg
        fill: $grey-middle

      &_selected,
      &:hover
        color: $dark-grey
        background-color: rgba(116, 169, 230, 0.25)
        svg
          fill: $dark-grey
    &-title
      font-size: 1.6rem
      line-height: 1.9rem
      margin-bottom: .2rem
      color: #4F4F4F
      display: block
      text-transform: capitalize

    &-descr
      font-size: 1.4rem
      line-height: 1.7rem
      color: $grey-middle

    &-ico
      width: 4.6rem
      display: flex
      justify-content: center
      flex-shrink: 0
      padding-top: .5rem

  &-bar
    position: absolute
    top: 0
    bottom: 0
    left: 100%
    width: calc(100vw - #{$size-step*9})
    background-color: rgba($dark-blue, 0.45)
    transition: left 0.3s ease-in-out

    &>div
      background: $white
      transition: all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1.275)
      box-shadow: inset -1px 0px 8px rgba(0, 0, 0, 0.15)
    &__menu
      padding: 3.2rem 0 8rem
      &-element
        overflow: hidden
        box-sizing: border-box
        margin: 0
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        border: 0.2rem solid transparent
        transition: all 0.1s ease-in-out
        position: relative
        &:hover::after
          content: ''
          display: block
          top: 0
          left: 0
          right: 0
          bottom: 0
          position: absolute
          background: rgba(47, 110, 205, 0.2)

        &_selected
          background-color: #436FEE
          border: 0.2rem solid transparent
          color: $white
          &:hover
            border: 0.2rem solid transparent
          & img
            display: none

      &-imageholder
        background: url("https://gn790.cdn.stg.gamenet.ru/0/7k3Ee/o_jGfAw.png") no-repeat
        width: 24rem
        min-height: 18.6rem
        padding: 1.2rem .2rem 0
        margin: 2.1rem 2.1rem 1.1rem
        position: relative
      &-image
        max-width: 100%
      &-title
        font-size: 1.6rem
        color: $dark-grey
        margin-bottom: .6rem
      &-descr
        font-size: 1.2rem
        line-height: 1.4rem
        color: $grey-middle

      &-button
        display: none
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        background: rgba(47,110,205,.2)
        justify-content: center
        align-items: center
        span
          background: $dark-blue-krayola
          height: 4rem
          line-height: 4rem
          border-radius: 20px
          padding: 0 4rem
          color: white
    &__header
      height: 7.3rem
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid rgba(0, 0, 0, 0.15)
      &--title
        font-size: 2.4rem
        letter-spacing: -0.02rem
        margin-left: 3.7rem
        color: $black
        text-transform: capitalize
      &--search
        width: 19rem
        margin-right: 3.2rem
        /deep/
          & input
              padding-left: 3.6rem
              background: url("https://gn118.cdn.stg.gamenet.ru/0/7k6JU/o_ItVIs.png") no-repeat left center

  &-footer
    position: absolute
    bottom: 0
    right: 0
    left: 0
    height: 8rem
    z-index: 100
    display: flex
    align-items: center
    &_add
      width: $size-step*9
    &__bt
      width: 21.6rem
      margin: 0 auto
.full-screen
  .b-add-section-bar__menu
    display: flex
    flex-wrap: wrap
    padding: 0
    &-element
      flex-basis: 20%
      border-bottom: 1px solid rgba(0, 0, 0, 0.15)
      border-right: 1px solid rgba(0, 0, 0, 0.15)
      @media only screen and (max-width: 1900px)
        &
          flex-basis: 25%
      @media only screen and (max-width: 1600px)
        &
          flex-basis: 33.3%
</style>
