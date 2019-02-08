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
      isVisibleBar: false
    }
  },

  computed: {
    ...mapState('Sidebar', ['builderSections', 'builderGroups']),

    hasHeader () {
      return this.builder.sections.some(section => section.isHeader)
    },

    groups () {
      if (this.hasHeader) {
        return omit(this.builderGroups, 'header')
      }
      return this.builderGroups
    },

    sections () {
      return this.builderSections
    }
  },

  methods: {
    selectGroup (group) {
      this.selectedGroup = group
      this.selectedSection = group[0]
      this.addSection(this.selectedSection)
    },
    selectSection (section) {
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
    }
  }
}
</script>

<template>
  <div class="b-add-section">
    <div class="b-add-section__header">
      <div>
        <h6 class="b-add-section__title">
          {{ title }}
        </h6>
      </div>
      <div>
        <button class="b-add-section__header-close-bt" @click="closeAddSectionBar">
          <icon-base width="10" height="10" color="#fff" name="close"/>
        </button>
      </div>
    </div>
    <div class="b-add-section__padd">

      <ul class="b-add-section__menu is-visiable" ref="menu">
        <li class="b-add-section__menu-group"
            :class="{ 'b-add-section__menu-group_selected': group === selectedGroup }"
            v-for="(group, name) in groups"
            :key="name"
            v-if="group.length">
          <div class="b-add-section__menu-header" @click="showSelectSection(group)">
            <span class="b-add-section__menu-title">{{ name }}</span>
          </div>
        </li>
      </ul>

      <div class="b-add-section-bar" v-if="isVisibleBar">
        <BaseScrollContainer classes="b-add-section-bar__scrollbar"
          :styling="{ width: '28.8rem', height: '100%' }" backgroundBar="#333"
          >
        <div class="b-add-section-bar__menu">
          <template v-for="(section, index) in selectedGroup">
            <div class="b-add-section-bar__menu-element"
                 :class="{ 'b-add-section-bar__menu-element_selected': section === selectedSection }"
                 v-bind:key="index"
                 @click="selectSection(section)">
              <img class="b-add-section-bar__menu-image" v-if="section.cover" :src="section.cover"/>
              <icon-base
                v-if="section === selectedSection"
                name="checkMark"
                :width="17"
                :height="12"
                color="#fff">
              </icon-base>
              <span class="b-add-section-bar__menu-title" v-if="!section.cover">
                {{ section.name }}
              </span>
            </div>
          </template>
        </div>
        </BaseScrollContainer>
      </div>

      <div class="b-add-section-footer"
          :class="{ 'b-add-section-footer_add': isVisibleBar }">
        <BaseButton
          class="b-add-section-footer__bt"
          :color="'light-gray'"
          :transparent="true"
          @click="closeAddSectionBar"
          >
          Cancel
        </BaseButton>
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

  background: $dark-blue
  box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)
  &__header
    height: 8rem

    display: flex
    justify-content: space-between
    align-items: center

    padding: $size-step/2 $size-step
    &-close-bt
      background: transparent
      cursor: pointer
      border: none
  &__padd
    padding: 2.8rem 0

    display: flex
    flex-direction: column

  &__title
    color: $white
    font-size: 1.8rem
    font-weight: bold
    letter-spacing: 0.02rem
    text-transform: capitalize

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
      padding: 0 $size-step
      list-style: none
      height: 4.8rem
      line-height: 4.6rem
      font-size: 1.4rem
      color: $white
      cursor: pointer
      &_selected,
      &:hover
        background-color: $dark-blue-krayola
    &-title
      display: inline-block
      text-transform: capitalize

  &-bar
    position: absolute
    top: 0
    bottom: 0
    left: 100%
    width: $size-step*9
    background-color: $white
    transition: left 0.3s ease-in-out
    &__menu
      padding: 3.2rem 3.2rem 8rem
      &-element
        overflow: hidden
        width: 17.6rem
        height: 11.2rem
        box-sizing: border-box
        background-color: #cccccc
        margin: 0 auto 3.2rem
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        border: 0.2rem solid transparent
        transition: all 0.1s ease-in-out
        &:hover
          border: 0.2rem solid #fff
        &_selected
          background-color: #436FEE
          border: 0.2rem solid transparent
          color: #fff
          &:hover
            border: 0.2rem solid transparent
          & img
            display: none

      &-image
        width: 100%

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

</style>
