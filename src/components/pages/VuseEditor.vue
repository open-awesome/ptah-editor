<template>
    <VuseBuilder v-bind:show-intro="showIntro" @saved="onDownload" @preview="onPreview" @save="onSave" />
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Vuse from '@editor/vuse'
import pwa from '@editor/plugins/pwa'
import Uploader from '@editor/plugins/Uploader.vue'

// slot base
import Sandbox from '@components/slots/Sandbox'
import ElementsList from '@components/slots/ElementsList'

// elements
import Button from '@components/elements/Button'
import Title from '@components/elements/Title'
import Description from '@components/elements/Description'
import Pic from '@components/elements/Pic'
import Logo from '@components/elements/Logo'
import Delimiter from '@components/elements/Delimiter'

// sections
import BaseSection from '@components/sections/BaseSection'
import Gallery1 from '@components/sections/galleries/Gallery1'
import Gallery2 from '@components/sections/galleries/Gallery2'
import Gallery3 from '@components/sections/galleries/Gallery3'
import Products from '@components/sections/products/Products'
import ProductsExtend from '@components/sections/products/ProductsExtend'

Vuse.mix({
  components: {
    Uploader,
    Sandbox,
    ElementsList,
    Button,
    Title,
    Description,
    Pic,
    Logo,
    Delimiter
  }
})

Vuse.component('BaseSection', BaseSection)
Vuse.component('Gallery1', Gallery1)
Vuse.component('Gallery2', Gallery2)
Vuse.component('Gallery3', Gallery3)
Vuse.component('Products', Products)
Vuse.component('ProductsExtend', ProductsExtend)

Vuse.use(pwa)

export default {
  methods: {
    ...mapActions([
      'saveLanding'
    ]),
    onDownload (builder) {
      builder.export('pwa')
    },
    onPreview: function (builder) {
      builder.export('preview')
    },
    onSave (builder) {
      this.saveLanding(builder.export('json'))
    }
  },
  created () {
    let themes = []

    Vue.use(Vuse, {
      js: './../js/cjs.js',
      themes: themes
    })
  },
  computed: {
    ...mapState([
      'currentLanding'
    ]),
    // TODO: delete this when CRUD UI is complete
    showIntro: function () {
      return this.$route.params.slug === 'new'
    }
  }
}
</script>
