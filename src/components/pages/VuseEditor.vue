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

// sections
import BaseSection from '@components/sections/BaseSection'
import HeroUnit from '@components/sections/hero/HeroUnit'
import HeroSkull from '@components/sections/hero/HeroSkull'
import HeroBAS from '@components/sections/hero/HeroBloodAndSoul'
import Gallery1 from '@components/sections/galleries/Gallery1'
import Gallery2 from '@components/sections/galleries/Gallery2'
import Gallery3 from '@components/sections/galleries/Gallery3'
import Products from '@components/sections/products/Products'
import ProductsExtend from '@components/sections/products/ProductsExtend'
// import Footer from '@components/sections/elements/Footer'
// import Restrictions from '@components/sections/elements/Restrictions'
// import Slogan from '@components/sections/elements/Slogan'
// import Social from '@components/sections/elements/Social'
// import System from '@components/sections/elements/System'
import ThreeColumns from '@components/sections/columns/ThreeColumns'
import TwoColumns from '@components/sections/columns/TwoColumns'
import Video from '@components/sections/video/Video'
// import AvailableRestrictions from '@components/sections/footers/FooterAvailableRestrictions'
// import SocialCopyright from '@components/sections/footers/FooterSocialCopyright'
import GalleryCarousel from '@components/sections/galleries/GalleryCarousel'
import MenuBas from '@components/sections/stickyMenus/MenuBAS'

// new elements
import AvailablePlatforms from '@components/elements/AvailablePlatforms'
import AgeRestrictions from '@components/elements/AgeRestrictions'
import SocialNetworks from '@components/elements/SocialNetworks'

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
    SocialNetworks
  }
})

Vuse.component('BaseSection', BaseSection)
Vuse.component('HeroUnit', HeroUnit)
Vuse.component('HeroSkull', HeroSkull)
Vuse.component('HeroBAS', HeroBAS)
Vuse.component('Gallery1', Gallery1)
Vuse.component('Gallery2', Gallery2)
Vuse.component('Gallery3', Gallery3)
Vuse.component('Products', Products)
Vuse.component('ProductsExtend', ProductsExtend)
// Vuse.component('Footer', Footer)
// Vuse.component('Restrictions', Restrictions)
// Vuse.component('Slogan', Slogan)
// Vuse.component('Social', Social)
// Vuse.component('System', System)
Vuse.component('ThreeColumns', ThreeColumns)
Vuse.component('TwoColumns', TwoColumns)
Vuse.component('Video', Video)
// Vuse.component('AvailableRestrictions', AvailableRestrictions)
// Vuse.component('SocialCopyright', SocialCopyright)
Vuse.component('GalleryCarousel', GalleryCarousel)
Vuse.component('MenuBas', MenuBas)

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
