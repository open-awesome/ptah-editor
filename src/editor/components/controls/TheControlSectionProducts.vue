<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'ControlSectionProducts',

  data () {
    return {
      productsCount: 2
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ])
  },

  created () {
    this.productsCount = this.settingObjectSection.data.products.length
  },

  watch: {
    productsCount (newValue, oldValue) {
      let products = this.settingObjectSection.data.products.slice()

      if (newValue < oldValue) {
        products.splice(newValue - 1, 1)
      } else {
        if (products.length < 4) {
          const product = this.settingObjectSection.data.defObj
          const newProducts = Array(newValue - oldValue).map(() => _.cloneDeep(product))
          products.push(...newProducts)
        }
      }

      this.updateSectionData({
        prop: 'products',
        data: products
      })
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSectionData'
    ])
  }
}
</script>

<template>
  <base-range-slider v-model="productsCount" label="The number of editions. It is better to specify this value before editing." step="1" min="1" max="4">
    {{productsCount}} products
  </base-range-slider>
</template>

<style lang="sass" scoped>

</style>
