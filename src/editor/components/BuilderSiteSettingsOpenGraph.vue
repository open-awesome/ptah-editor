<template>
  <builder-modal-content-layout>
    <div class="b-open-graph">
      <!-- Open Graph -->
      <base-fieldset>
        <base-heading slot="heading" level="2">
          {{  $t('s.openGraph') }}
          <base-help
            :hasLink="false"
            link="//ogp.me/"
            >
            The Open Graph protocol enables any web page to become a rich object in a social graph.
          </base-help>
        </base-heading>

        <base-fieldset-row
          width="wide"
          v-for="ogField in ogFields"
          :key="ogField.id">

          <base-text-field
            v-if="ogField.id.indexOf('title') !== -1 || ogField.id.indexOf('description') !== -1 || ogField.id.indexOf('locale') !== -1"
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

          <base-uploader
            v-if="ogField.id.indexOf('video') !== -1"
            v-model="ogField.value"
            label="Video"
            type="video"
          />

        </base-fieldset-row>

      </base-fieldset>
    </div>
    <div slot="controls">
      <BaseButton color="gray" size="middle" :transparent="true" @click="$emit('requestClose')">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" size="middle" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsOpenGraph',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
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
      error: {
        url: false
      }
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

  created () {
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
    },
    applySettings () {
      const ogTags = this.ogFields.filter(({ value }) => value).map(({ id, value }) => {
        return {
          property: id,
          content: value
        }
      })
      const data = {
        ogTags: ogTags
      }

      this.storeSettings(data)
      this.$emit('requestClose')
    },
    validUrl (str) {
      let pattern = new RegExp(/(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i)

      if (!pattern.test(str)) {
        this.error.url = true
      } else {
        this.error.url = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-open-graph
  height: $size-step*5
  &__help
    margin-left: 1rem
</style>
