<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import Section from '@editor/section'

export default {
  name: 'ControlSectionLayouts',
  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      layouts: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'builderSections',
      'builderGroups',
      'settingObjectSection'
    ]),

    selectedSection () {
      return this.settingObjectSection.name
    },

    group () {
      let name = this.selectedSection
      return _.find(this.builderSections, { name }).group
    }
  },

  created () {
    this.layouts = this.builderGroups[this.group]
  },

  watch: {
    settingObjectSection () {
      this.layouts = this.builderGroups[this.group]
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'clearSettingObject'
    ]),

    async selectLayout (section) {
      if (section.name === this.selectedSection) {
        return false
      }

      let index = _.findIndex(this.builder.sections, ['group', section.group])

      this.builder.sections[index] = new Section(section)
      this.builder.set(this.builder)

      await this.$nextTick()

      let target = document
        .getElementById('sections_contents')
        .querySelectorAll('.b-menu-subitem:not(.b-menu-subitem--header)')[index]

      if (section.schema.isHeader) {
        target = document.querySelector('.b-menu-subitem--header')
      }
      if (target) {
        target.click()
      }
    }
  }
}
</script>

<template>
  <div class="b-bg-controls" v-if="this.layouts.length">
    <base-scroll-container
      backgroundBar="#5D7899">
      <div v-for="(section, index) in layouts"  class="b-add"
           :class="{ 'b-add-selected': section.name === selectedSection }"
           :key="index"
           @click="selectLayout(section)">
        <img class="b-add-image" v-if="section.cover" :src="section.cover"/>

        <div class="b-add-title">
          <div class="mark">
            <icon-base
              v-if="section.name === selectedSection"
              name="checkMark"
              :width="17"
              :height="12"
              color="#fff">
            </icon-base>
          </div>
          {{ section.name }}
        </div>
      </div>
    </base-scroll-container>
  </div>
</template>

<style lang="sass" scoped>
.b-bg-controls
  height: calc(100vh - 10rem)
  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: #272727
    display: flex
    align-items: center
    cursor: pointer
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
  &__control
    margin-top: 2.2rem
.b-add
  overflow: hidden
  width: 23rem
  box-sizing: border-box
  margin: 0 auto 2rem
  cursor: pointer
  align-items: center
  justify-content: center
  border: 0.2rem solid transparent
  transition: all 0.1s ease-in-out
  position: relative
  &-title
    font-size: 1.6rem
    line-height: 4rem
    height: 4rem
    display: flex

  &-image
    max-width: 100%
    max-height: 100%
    border-radius: 2px
    overflow: hidden

  &-selected .mark
    display: flex
    justify-content: center
    align-items: center
  svg
    fill: white

.mark
  display: none
  width: 2.4rem
  height: 2.4rem
  background: $dark-blue-krayola
  border-radius: 50%
  margin: .9rem .5rem 0 0

</style>
