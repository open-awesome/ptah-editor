<script>
import { mapState, mapActions } from 'vuex'
import { find, merge } from 'lodash-es'

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
      absorbed: []
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
      console.log(this.absorbed)
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { absorb: this.absorbed.length }))
    }
  }
}
</script>

<template>
  <div class="b-grouping">
    <ul class="b-seciton-list">
      <template v-for="(section, index) in builder.sections">
        <li class="b-seciton-list__item" :key="section.id" v-if="index > id">
          <span class="b-seciton-list__name">{{section.name}}</span>
          <span>
          <input type="checkbox" :value="section.id" v-model="absorbed">
        </span>
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

</style>
