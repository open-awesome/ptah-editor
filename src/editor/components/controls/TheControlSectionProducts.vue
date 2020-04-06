<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlSectionProducts',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    products () {
      return this.settingObjectOptions.products
    },

    selectProduct () {
      return this.settingObjectOptions.selectProduct
    }

  },

  methods: {
    visible (key) {
      this.products[key].visible = !this.products[key].visible

      if (this.products[key].visible === true) {
        this.selectProduct.name = key
        return
      }

      for (let p in this.products) {
        if (this.products[p].visible === true) {
          this.selectProduct.name = p
        }
      }
    }
  }
}
</script>

<template>
  <div class="b-check-list">
    <div class="b-check-list__item is-editable"
      v-for="(value, key) in products" :key="key"
      :class="{ 'b-check-list__item_opacity' : false === products[key].visible }"
      @click="visible(key)"
      >

        <span class="b-check-list__item-check"
          title="Show / Hide"
          :class="{ 'b-check-list__item-check_color' : true === products[key].visible }"
          >
            <icon-base width="10" height="7" name="checkMark"
              v-show="products[key].visible"
            />
        </span>

        <a class="b-check-list__item-button"
          :title="products[key].name"
          >
          {{ key }}
        </a>

      </div>
  </div><!--/.b-check-list-->
</template>
