<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlAgeRestrictions',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    restrictions () {
      return this.settingObjectOptions.ageRestrictions
    }
  },

  methods: {
    visible (key) {
      this.restrictions[key].visible = !this.restrictions[key].visible
    }
  }
}
</script>

<template>
<div class="b-panel__col">
  <div class="b-check-list">
    <div class="b-check-list__item _restrictions is-editable"
      v-for="(value, key) in restrictions" :key="key"
      :class="{ 'b-check-list__item_opacity' : false === restrictions[key].visible, 'b-check-list__item_select' : restrictions[key].expand }"
    >

      <span class="b-check-list__item-check"
        title="Show / Hide"
        @click="visible(key)"
        :class="{ 'b-check-list__item-check_color' : true === restrictions[key].visible }"
        >
          <icon-base width="10" height="7" name="checkMark"
            v-show="restrictions[key].visible"
          />
      </span>

      <a class="b-check-list__item-button"
        :title="restrictions[key].name"
        @click="visible(key)"
        >
        {{ restrictions[key].name }}
      </a>

      <div class="b-check-list__item-select _restrictions" v-if="restrictions[key].visible">
        <BaseSelect
          :options="restrictions[key].options"
          v-model="restrictions[key].selected"
          :value="restrictions[key].selected"
          >
        </BaseSelect>
      </div>
    </div>
  </div><!--/.b-check-list-->
</div>
</template>
