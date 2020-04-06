<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlSystemRequirements',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    requirements () {
      return this.settingObjectOptions.systemRequirements
    },

    rowsRequirements () {
      return this.settingObjectOptions.rowsRequirements
    },

    selectPlatform () {
      return this.settingObjectOptions.selectPlatform
    }
  },

  methods: {
    visible (key) {
      this.requirements[key].visible = !this.requirements[key].visible

      if (this.requirements[key].visible === true) {
        this.selectPlatform.name = key
      } else {
        for (let p in this.requirements) {
          if (this.requirements[p].visible === true) {
            this.selectPlatform.name = p
          }
        }
      }
    },
    visibleRows (key) {
      this.rowsRequirements[key].visible = !this.rowsRequirements[key].visible
    }
  }
}
</script>

<template>
  <div class="b-panel">
    <div>
      <div class="b-panel__control">
        <base-caption>
          Supported systems
        </base-caption>
        <div class="b-panel__col">
          <div class="b-check-list">
            <div class="b-check-list__item is-editable"
              v-for="(value, key) in requirements" :key="key"
              :class="{ 'b-check-list__item_opacity' : false === requirements[key].visible, 'b-check-list__item_select' : requirements[key].expand }"
              >
              <span class="b-check-list__item-check"
                @click="visible(key)"
                title="Show / Hide"
                :class="{ 'b-check-list__item-check_color' : true === requirements[key].visible }"
                >
                 <icon-base width="10" height="7" name="checkMark"
                   v-show="requirements[key].visible"
                   />
              </span>

              <a class="b-check-list__item-button"
                @click="visible(key)"
                :title="key"
                >
                {{ key }}
              </a>

          </div>
        </div><!--/.b-check-list-->
        </div>
      </div>
      <div class="b-panel__control">
        <base-caption>
          System components
        </base-caption>
        <div class="b-panel__col">
          <div class="b-check-list">
            <div class="b-check-list__item is-editable"
              v-for="(value, key) in rowsRequirements" :key="key"
              :class="{ 'b-check-list__item_opacity' : false === rowsRequirements[key].visible, 'b-check-list__item_select' : rowsRequirements[key].expand }"
              >

              <span class="b-check-list__item-check"
                @click="visibleRows(key)"
                title="Show / Hide"
                :class="{ 'b-check-list__item-check_color' : true === rowsRequirements[key].visible }"
                >
                <icon-base width="10" height="7" name="checkMark"
                 v-show="rowsRequirements[key].visible"
                  />
              </span>

              <a class="b-check-list__item-button"
                @click="visibleRows(key)"
                :title="key"
                >
                {{ key }}
              </a>

            </div>
          </div><!--/.b-check-list-->
        </div>
      </div>
    </div>
  </div>
</template>
