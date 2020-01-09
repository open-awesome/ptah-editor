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
import ActionButtonHeader from '@components/sections/header/ActionButtonHeader'
import ActionButtonFantasyHeader from '@components/sections/header/ActionButtonFantasyHeader'
import SmmHeader from '@components/sections/header/SmmHeader'
import SmmFantasyHeader from '@components/sections/header/SmmFantasyHeader'
import CenteredLogoHeader from '@components/sections/header/CenteredLogoHeader'

// --- hero
import GenericMainScreen from '@components/sections/hero/HeroUnit'
import TwoSegmentHeroScreen from '@components/sections/hero/TwoSegmentHeroScreen'
import ThreeSegmentHeroScreen from '@components/sections/hero/HeroThreeColumns'
import VideoHeroSplitScreen from '@components/sections/hero/HeroArtRight'
import HeroVideoSplitScreen from '@components/sections/hero/HeroArtLeft'
import HeroBAS from '@components/sections/hero/HeroBloodAndSoul'
import HeroHunt from '@components/sections/hero/HeroHunt'
import HeroWithTimer from '@components/sections/hero/HeroWithTimer'
import HeroWithTimerColumns from '@components/sections/hero/HeroWithTimerColumns'
import HeroWithTimerColumnsVideo from '@components/sections/hero/HeroWithTimerColumnsVideo'
import HeroWithTimerColumnsVideo2 from '@components/sections/hero/HeroWithTimerColumnsVideo2'
import HeroWithTimerSlogan from '@components/sections/hero/HeroWithTimerSlogan'
import HeroWithTimerSlogan2 from '@components/sections/hero/HeroWithTimerSlogan2'
// --- First screen
import FirstScreenSpace01 from '@components/sections/first-screen/FirstScreenSpace01'
import FirstScreenSpace02 from '@components/sections/first-screen/FirstScreenSpace02'
import FirstScreenSpaceVideoBack from '@components/sections/first-screen/FirstScreenSpaceVideoBack'
import FirstScreenSpaceVideoPlayer from '@components/sections/first-screen/FirstScreenSpaceVideoPlayer'
import FirstScreenFantasy01 from '@components/sections/first-screen/FirstScreenFantasy01'
import FirstScreenFantasy02 from '@components/sections/first-screen/FirstScreenFantasy02'
import FirstScreenFantasyVideoBack from '@components/sections/first-screen/FirstScreenFantasyVideoBack'
// --- gallery
import GallerySwitch from '@components/sections/galleries/GallerySwitch'
import GallerySwitchFantasy from '@components/sections/galleries/GallerySwitchFantasy'
import GalleryPopup from '@components/sections/galleries/GalleryPopup'
import GalleryPopupFantasy from '@components/sections/galleries/GalleryPopupFantasy'
import GalleryPopupWestern from '@components/sections/galleries/GalleryPopupWestern'
// --- products
import Products from '@components/sections/products/Products'
import ProductsFantasy from '@components/sections/products/ProductsFantasy'
import ProductsExtend from '@components/sections/products/ProductsExtend'
import ProductsExtendFantasy from '@components/sections/products/ProductsExtendFantasy'
// --- columns
import Columns from '@components/sections/columns/Columns'
import ColumnsFantasy from '@components/sections/columns/ColumnsFantasy'
// --- carousel
import Carousel from '@components/sections/carousel/Carousel'
// --- forms
import FormCenter from '@components/sections/forms/FormCenter'
import FormCenterFantasy from '@components/sections/forms/FormCenterFantasy'
import FormRight from '@components/sections/forms/FormRightSide'
import FormRight2 from '@components/sections/forms/FormRightSide2'
import FormLeft from '@components/sections/forms/FormLeftSideVariant'
import FormLeft2 from '@components/sections/forms/FormLeftSideVariant2'

// --- other
import SystemRequirements from '@components/sections/elements/SystemRequirements'
import SystemRequirementsFantasy from '@components/sections/elements/SystemRequirementsFantasy'
import FooterSpace from '@components/sections/footers/FooterSpace'
import FooterFantasy from '@components/sections/footers/FooterFantasy'
import FrequentlyAskedQuestions from '@components/sections/elements/FrequentlyAskedQuestions'
import Slider from '@components/sections/slider/Slider'
import SliderFantasy from '@components/sections/slider/SliderFantasy'
import SliderWestern from '@components/sections/slider/SliderWestern'

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
  ActionButtonHeader,
  SmmHeader,
  CenteredLogoHeader,
  ActionButtonFantasyHeader,
  SmmFantasyHeader,

  FirstScreenSpace01,
  FirstScreenSpace02,
  FirstScreenSpaceVideoBack,
  FirstScreenSpaceVideoPlayer,
  FirstScreenFantasy01,
  FirstScreenFantasy02,
  FirstScreenFantasyVideoBack,
  TwoSegmentHeroScreen,
  ThreeSegmentHeroScreen,
  VideoHeroSplitScreen,
  HeroVideoSplitScreen,
  HeroBAS,
  HeroHunt,
  GenericMainScreen,
  HeroWithTimer,
  HeroWithTimerColumns,
  HeroWithTimerColumnsVideo,
  HeroWithTimerColumnsVideo2,
  HeroWithTimerSlogan,
  HeroWithTimerSlogan2,

  Slider,
  SliderFantasy,
  SliderWestern,

  Columns,
  ColumnsFantasy,

  GallerySwitch,
  GalleryPopup,
  Carousel,
  GalleryPopupFantasy,
  GallerySwitchFantasy,
  GalleryPopupWestern,

  Products,
  ProductsExtend,
  ProductsFantasy,
  ProductsExtendFantasy,

  FormCenter,
  FormCenterFantasy,
  FormRight,
  FormLeft,
  FormRight2,
  FormLeft2,

  SystemRequirements,
  SystemRequirementsFantasy,
  FrequentlyAskedQuestions,

  FooterSpace,
  FooterFantasy
}

Vuse.mix({ components: ELEMENTS })

for (let component in COMPONENTS) {
  Vuse.component(component, COMPONENTS[component])
}

Vuse.use(pwa)

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

export default {
  computed: {
    // TODO: delete this when CRUD UI is complete
    showIntro () {
      return this.$route.params.slug === 'new'
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      await store.dispatch('getLandingForUser', to.params.slug)
      to.meta.title = store.state.name + ' - Ptah'
      next()
    } catch (e) {
      console.warn(e)
      next({ path: '/404' })
    }
  },

  created () {
    let themes = []

    Vue.use(Vuse, {
      js: './../js/cjs.js',
      css: './../ptah_sections.css',
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
