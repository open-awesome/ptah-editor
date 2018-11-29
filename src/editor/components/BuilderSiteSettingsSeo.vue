<template>
  <builder-modal-content-layout>
    <div class="b-builder-site-settings-seo">
      <form @submit.prevent="applySettings">

        <!-- Title & Favicon -->
        <base-fieldset>
          <base-heading level="2">Title & Favicon</base-heading>

          <base-fieldset-row>
            <BaseImageUpload
              v-model="favicon"
              label="Fav Icon"
              description="32 x 32 px, .ico, .bmp or .png" />
          </base-fieldset-row>

          <base-fieldset-row width="wide">
            <BaseTextField label="Page Title" v-model="pageTitle" />
          </base-fieldset-row>
        </base-fieldset>

        <!-- Google -->
        <base-fieldset>
          <base-heading level="2">Google</base-heading>

          <base-fieldset-row width="short">
            <base-text-field
              v-model="gtmId"
              placeholder="GTM-XXXXXX">

              <template slot="label">
                GTM container ID
                <a class="b-builder-site-settings-seo__help"
                  target="_blank"
                  href="https://developers.google.com/tag-manager/quickstart">
                  <IconBase name="questionCircle" width="16" height="16" color="#436FEE" />
                </a>
              </template>

            </base-text-field>
          </base-fieldset-row>

          <base-fieldset-row width="short">
            <BaseTextField label="Google site tag" v-model="gtag" placeholder="UA-XXXXXXXX-X" />
          </base-fieldset-row>
        </base-fieldset>

        <!-- Open Graph -->
        <base-fieldset :hasToggle="true" :isOpened="false">
          <base-heading slot="heading" level="2">
            Open Graph
            <a class="b-builder-site-settings-seo__help"
              target="_blank"
              href="#">
              <IconBase name="questionCircle" width="16" height="16" color="#436FEE" />
            </a>
          </base-heading>

          <base-fieldset-row
            v-for="ogField in ogFields"
            :key="ogField.id">

            <base-text-field
              v-model="ogField.value"
              :placeholder="ogField.placeholder"
              :label="ogField.label">
            </base-text-field>
          </base-fieldset-row>
        </base-fieldset>
      </form>
    </div>

    <div slot="controls">
      <BaseButton color="gray" @click="$emit('requestClose')" >Cancel</BaseButton>
      <BaseButton @click="applySettings">Save</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsSeo',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      pageTitle: '',
      favicon: '',
      gtmId: '',
      gtag: '',

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
          placeholder: 'Profile',
          value: ''
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
      ]
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    }
  },

  mounted () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),
    updateSettings () {
      const settings = this.currentLanding.settings

      _.map(settings.ogTags, ({ property, content }) => {
        const item = _.find(this.ogFields, { id: property })
        if (item) {
          item.value = content
        }
      })

      this.pageTitle = settings.title
      this.gtmId = settings.gtmId
      this.gtag = settings.gtag
      this.favicon = settings.favicon
    },
    applySettings () {
      const ogTags = this.ogFields.filter(({ value }) => value).map(({ id, value }) => {
        return {
          property: id,
          content: value
        }
      })
      const data = {
        ogTags,
        title: this.pageTitle,
        gtmId: this.gtmId,
        gtag: this.gtag,
        favicon: this.favicon
      }

      this.storeSettings(data)
      this.$emit('requestClose')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-builder-site-settings-seo
  &__help
    margin-left: 1rem
</style>
