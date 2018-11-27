<template>
  <div class="b-add-section">
    <h6 class="b-add-section__title">
      {{ title }}
    </h6>

    <ul class="b-add-section__menu is-visiable" ref="menu">
      <li class="b-add-section__menu-group"
          :class="{ 'b-add-section__menu-group_selected': group === selectedGroup }"
          v-for="(group, name) in groups"
          :key="name"
          v-if="group.length">
        <div class="b-add-section__menu-header" @click="toggleGroupVisibility(group)">
          <span class="b-add-section__menu-title">{{ name }}</span>
        </div>
      </li>
    </ul>

    <div class="b-add-section-bar" v-show="isVisibleBar">
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
    </div>

    <div class="b-add-section-footer"
        :class="{ 'b-add-section-footer_add': isVisibleBar }">
      <BaseButton
        class="b-add-section-footer__bt"
        :color="'gray'"
        :transparent="true"
        @click="$emit('requestClose')"
        >
        Cancel
      </BaseButton>
      <BaseButton
        class="b-add-section-footer__bt"
        :color="'blue'"
        :transparent="false"
        @click="addSection"
        v-if="selectedSection !== null"
        >
        Add
      </BaseButton>
    </div>

  </div>
</template>

<script>
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
      groups: {},
      selectedGroup: [],
      sections: this.getSections(),
      selectedSection: null,
      isVisibleBar: false
    }
  },

  created () {
    this.generateGroups()
  },

  mounted () {

  },

  methods: {
    generateGroups () {
      let groups = { random: [] }
      // group sections together
      this.sections.forEach((section) => {
        let sectionGroup = section.group
        if (!sectionGroup) {
          groups.random.push(section)
          return
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section]
          return
        }
        groups[sectionGroup].push(section)
      })
      this.groups = groups
    },
    toggleGroupVisibility (group) {
      this.selectedGroup = group
      this.selectedSection = null
      this.isVisibleBar = true
    },
    selectSection (section) {
      this.selectedSection = section
    },
    addSection (position) {
      let section = this.selectedSection
      this.builder.add(section, position)
      this.selectedSection = null
    },
    getSections () {
      let sections = []
      // get sections data
      sections = Object.keys(this.builder.components).map((sec) => {
        return {
          name: sec,
          group: this.builder.components[sec].options.group,
          cover: this.builder.components[sec].options.cover,
          schema: this.builder.components[sec].options.$schema
        }
      })
      return sections
    }
  }
}
</script>

<style lang="sass" scoped>
.b-add-section
  width: 24rem
  background: #F5F5F5
  padding: 2.8rem 3.2rem
  display: flex
  flex-direction: column

  &__title
    margin: 0 0 2.8rem 1.6rem
    color: #272727
    font-size: 1.8rem
    font-weight: bold

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
      padding: 0 1.6rem
      list-style: none
      height: 4.8rem
      line-height: 4.6rem
      font-size: 1.4rem
      color: #474747
      cursor: pointer
      border: 1px solid transparent
      &_selected
        background-color: rgba(67, 111, 238, 0.15)
        border: 1px solid transparent
      &:hover
        border: 1px solid rgba(67, 111, 238, 0.15)
    &-title
      display: inline-block
      &::first-letter
        text-transform: uppercase

  &-bar
    position: absolute
    top: 0
    bottom: 0
    left: 100%
    width: 24rem
    background-color: #8189B1
    transition: left 0.3s ease-in-out
    &__menu
      padding: 3.2rem 3.2rem 0
      &-element
        overflow: hidden
        width: 17.6rem
        height: 11.2rem
        background-color: #ebebeb
        margin: 0 auto 3.2rem
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        &_selected
          background-color: #436FEE
          box-shadow: 0 0.6rem 2.4rem 0 rgba(0, 0, 0, 0.15)
          color: #fff
          & img
            display: none
      &-image
        width: 100%
        height: 100%
  &-footer
    position: absolute
    bottom: 0
    right: 0
    left: 0
    height: 8rem
    width: 24rem
    background-color: #FFFFFF
    z-index: 100
    display: flex
    align-items: center
    &_add
      width: 48rem
    &__bt
      width: 21.6rem
      margin: 0 1.6rem

</style>
