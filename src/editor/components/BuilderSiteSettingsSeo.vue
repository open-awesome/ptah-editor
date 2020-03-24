<template>
  <builder-modal-content-layout>
    <div class="seo-panel">
      <base-button-tabs :list="tabs" v-model="activeTab" class="seo-tabs"></base-button-tabs>
      <div class="layout" :noScroll="true" v-if="activeTab === 'seo'">
          <form @submit.prevent="applySettings" class="layout__content">

            <!-- Title & Favicon -->
            <div class="b-builder-site-settings-seo__item">
              <base-caption
                help="Page title"
              >
                Page title
              </base-caption>
              <BaseTextField :label="$t('s.pageTitle')" v-model="pageTitle" />
            </div>

            <div class="b-builder-site-settings-seo__item">
              <base-caption
                help="Favicon"
              >
                Favicon
              </base-caption>
              <BaseImageUpload
                v-model="favicon"
                :label="$t('s.favicon')"
                description="32 x 32 px, .ico or .png" />
            </div>

            <div class="b-builder-site-settings-seo__item">
              <base-caption
                help="Cookie policy"
              >
                Cookie policy
              </base-caption>
              <base-switcher
                v-model="useCookie"
                :label="$t('s.useCookie')"/>

              <base-upload-input
                v-model="pdfFile"
                :label="$t('s.policyFile')"
                placeholder="Paste pdf file"/>
            </div>
          </form>
      </div>

      <!-- Open Graph -->
      <div class="layout layout__og" v-if="activeTab === 'og'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-builder-site-settings-og__item"
                 v-for="ogField in ogFields"
                 :key="ogField.id">
              <base-text-field
                v-if="(ogField.id.indexOf('title') !== -1 || ogField.id.indexOf('description') !== -1 || ogField.id.indexOf('type') !== -1) && ogField.id.indexOf('locale') === -1"
                v-model="ogField.value"
                :placeholder="ogField.placeholder"
                :label="ogField.label">
              </base-text-field>

              <base-uploader
                v-if="ogField.id.indexOf('image') !== -1"
                v-model="ogField.value"
                label="Image"
              />

              <base-text-field
                v-if="ogField.id.indexOf('url') !== -1"
                v-model="ogField.value"
                :label="ogField.label"
                :hasError="error.url"
                @input="validUrl(ogField.value)"
              >
                <span slot="error">
                  Please enter a valid URL
                </span>
              </base-text-field>

              <div class="b-open-graph__width"
                   v-if="ogField.id.indexOf('locale') !== -1"
              >
                <base-label>
                  {{ ogField.label }}
                </base-label>
                <div class="b-open-graph__row">
                  <div class="b-open-graph__col">
                    <BaseSelect
                      class="b-open-graph__select"
                      :options="locale[`${ogField.id}`].language.options"
                      v-model="locale[`${ogField.id}`].language.selected"
                      :search="true"
                    >
                    </BaseSelect>
                  </div>
                  <div class="b-open-graph__col b-open-graph__select">
                    <BaseSelect
                      :options="locale[`${ogField.id}`].territory.options"
                      v-model="locale[`${ogField.id}`].territory.selected"
                      :search="true"
                    >
                    </BaseSelect>
                  </div>
                  <div class="b-open-graph__col"
                       v-text="localeSelected[`${ogField.id}`]"
                  />
                </div>
              </div>

              <base-uploader
                v-if="ogField.id.indexOf('video') !== -1"
                v-model="ogField.value"
                label="Video"
                type="video"
              />
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>

    <div slot="controls">
      <BaseButton size="small" color="gray" :transparent="true" @click="close()">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton size="small" color="blue" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import _ from 'lodash-es'
import { isValidUrl } from '../util'
import BaseScrollContainer from '../../components/base/BaseScrollContainer'

const LIST_LANG = [
  { name: 'English', value: 'en' },
  { name: 'Russian', value: 'ru' },
  { name: 'French', value: 'fr' },
  { name: 'Chinese', value: 'zh' }
]

const LIST_TERR = [
  { name: 'United Kingdom', value: 'GB' },
  { name: 'Russian Federation', value: 'RU' },
  { name: 'China', value: 'CN' },
  { name: 'France', value: 'FR' }
]

export default {
  name: 'BuilderSiteSettingsSeo',

  components: {
    BaseScrollContainer,
    BuilderModalContentLayout
  },

  data () {
    return {
      pageTitle: '',
      favicon: '',
      useCookie: null,
      pdfFile: null,
      tabs: [
        { value: 'seo', text: 'SEO settings' },
        { value: 'og', text: 'Open graph' }
      ],
      activeTab: 'seo',
      ogFields: [
        {
          id: 'og:title',
          label: 'Title',
          placeholder: 'Game name',
          value: ''
        },
        {
          id: 'og:description',
          label: 'Description',
          placeholder: 'Video Game',
          value: ''
        },
        {
          id: 'og:image',
          label: 'Image',
          placeholder: 'http://www.mydomain.com/image.png',
          value: ''
        },
        {
          id: 'og:type',
          label: 'Type',
          placeholder: 'Type',
          value: 'Game'
        },
        {
          id: 'og:url',
          label: 'URL',
          placeholder: 'http://www.mydomain.com/',
          value: ''
        },
        {
          id: 'og:locale',
          label: 'Locale',
          placeholder: 'en_GB',
          value: ''
        },
        {
          id: 'og:locale:alternate',
          label: 'Locale : Alternate',
          placeholder: 'fr_FR',
          value: ''
        },
        {
          id: 'og:video',
          label: 'Video',
          placeholder: 'http://www.mydomain.com/video.mp4',
          value: ''
        }
      ],
      locale: {
        'og:locale': {
          language: {
            options: _.merge([], LIST_LANG),
            selected: { name: 'English', value: 'en' }
          },
          territory: {
            options: _.merge([], LIST_TERR),
            selected: { name: 'United Kingdom', value: 'GB' }
          }
        },
        'og:locale:alternate': {
          language: {
            options: _.merge([], LIST_LANG),
            selected: { name: 'English', value: 'en' }
          },
          territory: {
            options: _.merge([], LIST_TERR),
            selected: { name: 'United Kingdom', value: 'GB' }
          }
        }
      },
      error: {
        url: false
      }
    }
  },

  computed: {
    ...mapState(['currentLanding']),
    ...mapState({
      policy: ({ currentLanding: { settings } }) => settings.cookiesPolicy
    }),

    localeSelected () {
      return {
        'og:locale': this.locale['og:locale'].language.selected.value + '_' + this.locale['og:locale'].territory.selected.value,
        'og:locale:alternate': this.locale['og:locale:alternate'].language.selected.value + '_' + this.locale['og:locale:alternate'].territory.selected.value
      }
    }
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    },
    policy: {
      immediate: true,
      deep: true,
      handler (value) {
        this.updatePolicy(value)
      }
    },
    localeSelected (value) {
      for (let key in value) {
        let item = _.find(this.ogFields, { id: key })
        if (item) {
          item.value = value[key]
        }
      }
    }
  },

  mounted () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),
    ...mapActions('Sidebar', ['toggleSidebar']),

    updateSettings () {
      const settings = this.currentLanding.settings

      this.pageTitle = settings.title
      this.favicon = settings.favicon

      _.map(settings.ogTags, ({ property, content }) => {
        const item = _.find(this.ogFields, { id: property })
        if (item) {
          if (property.indexOf('locale') !== -1) {
            let arr = content.split('_')
            let l = arr[0]
            let t = arr[1]

            let lName = _.find(LIST_LANG, { value: arr[0] })
            this.locale[property].language.selected.name = lName.name
            this.locale[property].language.selected.value = l

            let lTerr = _.find(LIST_TERR, { value: arr[1] })
            this.locale[property].territory.selected.name = lTerr.name
            this.locale[property].territory.selected.value = t

            item.value = content
          } else {
            item.value = content
          }
        }
      })
    },

    applySettings () {
      const ogTags = this.ogFields.filter(({ value }) => value).map(({ id, value }) => {
        return {
          property: id,
          content: value
        }
      })

      const data = {
        title: this.pageTitle,
        favicon: this.favicon,
        cookiesPolicy: {
          enabled: this.useCookie,
          pdf: this.pdfFile
        },
        ogTags: ogTags
      }

      this.storeSettings(data)
      this.close()
    },

    updatePolicy ({ enabled, pdf }) {
      this.useCookie = enabled
      this.pdfFile = pdf
    },

    validUrl (url) {
      let v = true

      if (url !== '') {
        v = isValidUrl(url)
      }

      this.error.url = !v
    },

    close () {
      this.toggleSidebar(false)
      this.$router.push(`/editor/${this.$route.params.slug}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_variables.sass'
.seo-panel
  height: 100%
  position: relative

.seo-tabs
  margin-bottom: $size-step

.layout
  position: absolute
  top: 6.4rem
  right: 0
  bottom: 0
  left: 0

  box-sizing: border-box
  padding: 0 3.7rem 2rem
  &__og
    padding-right: 0
  &-padding
    width: 100%
    padding: 0 5rem 0 0

.b-builder-site-settings-seo,
.b-builder-site-settings-og
  &__item
    margin-bottom: 3rem
  &__help
    margin-left: 1rem
</style>
