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

// elements
import Button from '@components/elements/Button'
import TextElement from '@components/elements/TextElement'
import Pic from '@components/elements/Pic'
import Logo from '@components/elements/Logo'
import Delimiter from '@components/elements/Delimiter'
import AvailablePlatforms from '@components/elements/AvailablePlatforms'
import AgeRestrictions from '@components/elements/AgeRestrictions'
import SocialNetworks from '@components/elements/SocialNetworks'
import IconWithText from '@components/elements/IconWithText'
import VideoElement from '@components/elements/VideoElement'
import Timer from '@components/elements/Timer'
import Form from '@components/elements/Form'
import ToggleElement from '@components/elements/ToggleElement'

// sections
// --- header
import Header1 from '@components/sections/header/Header1'
import Header2 from '@components/sections/header/Header2'
import Header3 from '@components/sections/header/Header3'
import Header4 from '@components/sections/header/Header4'
// --- hero
import HeroUnit from '@components/sections/hero/HeroUnit'
import HeroSkull from '@components/sections/hero/HeroSkull'
import HeroTwoColumns from '@components/sections/hero/HeroTwoColumns'
import HeroThreeColumns from '@components/sections/hero/HeroThreeColumns'
import HeroArtRight from '@components/sections/hero/HeroArtRight'
import HeroArtLeft from '@components/sections/hero/HeroArtLeft'
import HeroBAS from '@components/sections/hero/HeroBloodAndSoul'
import HeroHunt from '@components/sections/hero/HeroHunt'
import HeroWithTimer from '@components/sections/hero/HeroWithTimer'
import HeroWithTimerColumns from '@components/sections/hero/HeroWithTimerColumns'
import HeroWithTimerColumnsVideo from '@components/sections/hero/HeroWithTimerColumnsVideo'
import HeroWithTimerColumnsVideo2 from '@components/sections/hero/HeroWithTimerColumnsVideo2'
import HeroWithTimerSlogan from '@components/sections/hero/HeroWithTimerSlogan'
import HeroWithTimerSlogan2 from '@components/sections/hero/HeroWithTimerSlogan2'
// --- gallery
import GallerySwitch from '@components/sections/galleries/GallerySwitch'
import GalleryPopup from '@components/sections/galleries/GalleryPopup'
// --- products
import ProductsColumns from '@components/sections/products/ProductsColumns'
import ProductsColumnsExtend from '@components/sections/products/ProductsColumnsExtend'
// --- columns
import Columns from '@components/sections/columns/Columns'
// --- carousel
import Carousel from '@components/sections/carousel/Carousel'
// --- forms
import FormCenter from '@components/sections/forms/FormCenter'
import FormRight from '@components/sections/forms/FormRightSide'
import FormRight2 from '@components/sections/forms/FormRightSide2'
import FormLeft from '@components/sections/forms/FormLeftSideVariant'
import FormLeft2 from '@components/sections/forms/FormLeftSideVariant2'

// --- other
import System from '@components/sections/elements/System'
import Footer from '@components/sections/footers/Footer'
import Video from '@components/sections/video/Video'
import Faq from '@components/sections/elements/Faq'
import Slider from '@components/sections/slider/Slider'

import store from '@store'

const ELEMENTS = {
  Uploader,
  Sandbox,
  Button,
  TextElement,
  Pic,
  Logo,
  Delimiter,
  AvailablePlatforms,
  AgeRestrictions,
  SocialNetworks,
  IconWithText,
  VideoElement,
  Timer,
  Form,
  ToggleElement
}

const COMPONENTS = {
  Header1,
  Header2,
  Header3,
  Header4,

  HeroUnit,
  HeroSkull,
  HeroTwoColumns,
  HeroThreeColumns,
  HeroArtRight,
  HeroArtLeft,
  HeroBAS,
  HeroHunt,
  HeroWithTimer,
  HeroWithTimerColumns,
  HeroWithTimerColumnsVideo,
  HeroWithTimerColumnsVideo2,
  HeroWithTimerSlogan,
  HeroWithTimerSlogan2,

  Slider,

  GallerySwitch,
  GalleryPopup,

  ProductsColumns,
  ProductsColumnsExtend,

  Columns,

  Carousel,

  FormCenter,
  FormRight,
  FormLeft,
  FormRight2,
  FormLeft2,

  Footer,
  System,
  Video,
  Faq
}

Vuse.mix({ components: ELEMENTS })

for (let component in COMPONENTS) {
  Vuse.component(component, COMPONENTS[component])
}

Vuse.use(pwa)

export default {
  computed: {
    // TODO: delete this when CRUD UI is complete
    showIntro () {
      return this.$route.params.slug === 'new'
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      await store.dispatch('getLandingData', to.params.slug)
      next()
    } catch (e) {
      next({ path: '/404' })
    }
  },

  created () {
    let themes = []

    Vue.use(Vuse, {
      js: './../js/cjs.js',
      themes: themes
    })
  },

  mounted () {
    this.$Progress.finish()
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
