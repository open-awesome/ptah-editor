<script>
import { mapState, mapActions } from 'vuex'
import { find, merge, findIndex } from 'lodash-es'

export default {
  name: 'BuilderSettingsBarGroup',

  props: {
    builder: {
      type: Object,
      required: true
    },

    master: {
      type: Boolean,
      required: true
    },

    slave: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      absorbed: [] // absorbed sections
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sectionsGroups',
      'settingObjectOptions',
      'settingObjectSection'
    ]),

    id () {
      return this.settingObjectSection.id
    },

    sIndex () {
      return findIndex(this.builder.sections, (s) => s.id === this.id)
    },

    group () {
      return find(this.sectionsGroups, o => o.main.id === this.id)
    }
  },

  created () {
    if (this.master) {
      this.absorbed = [...this.group.children]
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    applyGroup () {
      // sort sections in builder
      this.moveSections()
      // apply changes
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { absorb: this.absorbed.length }))
    },

    moveSections () {
      let holes = this.findHoles()

      holes.forEach((hole) => {
        this.builder.sort(hole.index, hole.index + 1)
      })

      if (this.findHoles().length) {
        this.moveSections()
      }
    },

    findHoles () {
      let holes = []
      let stop = 0

      for (let i = this.sIndex + 1; i < this.builder.sections.length; i++) {
        if (this.absorbed.indexOf(this.builder.sections[i].id) === -1 && stop < this.absorbed.length) {
          holes.push({ index: i, id: this.builder.sections[i].id })
        } else {
          stop++
        }
      }

      return holes
    }
  }
}
</script>

<template>
  <div class="b-grouping">
    <div class="b-grouping__icons">
      <icon-base name="groupBg" color="black" width="16" height="12"></icon-base>
    </div>
    <ul class="b-seciton-list">
      <template v-for="(section, index) in builder.sections">
        <li class="b-seciton-list__item" :key="section.id" v-if="index > sIndex && section.group !== 'header'">
          <span class="b-seciton-list__name">{{section.name}}</span>
          <label class="b-seciton-list__control">
            <input type="checkbox" :value="section.id" v-model="absorbed">
            <i></i>
          </label>
        </li>
      </template>
    </ul>

    <BaseButton
      :color="'blue'"
      @click="applyGroup"
    >
      Apply
    </BaseButton>
  </div>
</template>

<style lang="sass" scoped>
.b-grouping
  &__icons
    margin: 1em .4em 2em
    display: flex
    justify-content: flex-end

.b-seciton-list
  list-style: none
  margin: 0 0 2em
  padding: 0
  &__item
    color: #000
    margin: 1em .4em
    padding: 0
    display: flex
    justify-content: space-between
  &__control
    input[type="checkbox"]
      display: none
      &:checked+i
        width: 1.4em
        height: 1.4em
      &:checked+i:after
        content: '\2714'
        font-size: 1.1em
        position: absolute
        top: 0
        left: 1px
        color: rgba(31, 31, 36, 0.93)
    i
      display: inline-block
      border: 1px solid #BBB
      border-radius: 3px
      width: 1.4em
      height: 1.4em
      background: #fff
      vertical-align: middle
      margin: 3px
      position: relative
      transition: width 0.1s, height 0.1s, margin 0.1s
</style>
