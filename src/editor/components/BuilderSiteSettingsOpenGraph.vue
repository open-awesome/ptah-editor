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
    localeSelected (value) {
      for (let key in value) {
        let item = _.find(this.ogFields, { id: key })
        if (item) {
          item.value = value[key]
        }
      }
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
  &__width
    width: 100%
    display: flex
    flex-direction: column
  &__row
    display: flex
    min-width: 100%
  &__col
    margin-right: 2rem
  &__select

/deep/
  .b-pth-base-select__name
     width: 20rem !important
</style>
