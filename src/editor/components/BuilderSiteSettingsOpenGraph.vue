<template>
  <builder-modal-content-layout>
    <div class="b-open-graph">
      <!-- Open Graph -->
      <base-fieldset>
        <base-heading slot="heading" level="2">
          {{  $t('s.openGraph') }}
          <base-help
            :hasLink="false"
            link="https://en.wikipedia.org/wiki/Facebook_Platform#Open_Graph_protocol"
            >
            The Open Graph protocol enables developers to integrate their pages into Facebook
          </base-help>
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
    },
    applySettings () {
      const ogTags = this.ogFields.filter(({ value }) => value).map(({ id, value }) => {
        return {
          property: id,
          content: value
        }
      })
      const data = {
        ogTags
      }

      this.storeSettings(data)
      this.$emit('requestClose')
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
