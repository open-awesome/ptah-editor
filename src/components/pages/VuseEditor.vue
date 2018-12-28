<template>
    <VuseBuilder v-bind:show-intro="showIntro" @saved="onDownload" @preview="onPreview" @save="onSave" />
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import Vuse from '@editor/vuse'
import pwa from '@editor/plugins/pwa'
import Uploader from '@editor/plugins/Uploader.vue'

// slot base
import Sandbox from '@components/slots/Sandbox'
import ElementsList from '@components/slots/ElementsList'

// elements
import Button from '@components/elements/Button'
import Link from '@components/elements/Link'
import Title from '@components/elements/Title'
import Description from '@components/elements/Description'
import Pic from '@components/elements/Pic'
import Logo from '@components/elements/Logo'
import Delimiter from '@components/elements/Delimiter'
import AvailablePlatforms from '@components/elements/AvailablePlatforms'
import AgeRestrictions from '@components/elements/AgeRestrictions'
import SocialNetworks from '@components/elements/SocialNetworks'
import Slogan from '@components/elements/Slogan'
import Cost from '@components/elements/Cost'
import IconWithText from '@components/elements/IconWithText'

// sections
import HeroUnit from '@components/sections/hero/HeroUnit'
import HeroSkull from '@components/sections/hero/HeroSkull'
import Gallery1 from '@components/sections/galleries/Gallery1'
import Gallery2 from '@components/sections/galleries/Gallery2'
import Gallery3 from '@components/sections/galleries/Gallery3'
import ProductsColumns from '@components/sections/products/ProductsColumns'
import ProductsColumnsExtend from '@components/sections/products/ProductsColumnsExtend'
import System from '@components/sections/elements/System'
import Footer from '@components/sections/footers/Footer'
import ThreeColumns from '@components/sections/columns/ThreeColumns'
import TwoColumns from '@components/sections/columns/TwoColumns'
import Video from '@components/sections/video/Video'
import GalleryCarousel from '@components/sections/carousel/GalleryCarousel'

import store from '@store'

Vuse.mix({
  components: {
    Uploader,
    Sandbox,
    ElementsList,
    Button,
    Link,
    Title,
    Description,
    Pic,
    Logo,
    Delimiter,
    AvailablePlatforms,
    AgeRestrictions,
    SocialNetworks,
    Slogan,
    Cost,
    IconWithText
  }
})

Vuse.component('HeroUnit', HeroUnit)
Vuse.component('HeroSkull', HeroSkull)
Vuse.component('Gallery1', Gallery1)
Vuse.component('Gallery2', Gallery2)
Vuse.component('Gallery3', Gallery3)
Vuse.component('ProductsColumns', ProductsColumns)
Vuse.component('ProductsColumnsExtend', ProductsColumnsExtend)
Vuse.component('System', System)
Vuse.component('Footer', Footer)
Vuse.component('ThreeColumns', ThreeColumns)
Vuse.component('TwoColumns', TwoColumns)
Vuse.component('Video', Video)
Vuse.component('GalleryCarousel', GalleryCarousel)

Vuse.use(pwa)

export default {
  computed: {
    // TODO: delete this when CRUD UI is complete
    showIntro () {
      return this.$route.params.slug === 'new'
    }
  },

  async beforeRouteEnter (to, from, next) {
    await store.dispatch('getLandingData', to.params.slug)
    next()
  },

  created () {
    let themes = []

    Vue.use(Vuse, {
      js: './../js/cjs.js',
      themes: themes
    })
  },

  methods: {
    ...mapActions([
      'saveLanding'
    ]),
    onDownload (builder) {
      builder.export('pwa')
    },
    onPreview (builder) {
      builder.export('preview')
    },
    onSave (builder) {
      this.saveLanding(builder.export('json'))
    }
  }
}
</script>
