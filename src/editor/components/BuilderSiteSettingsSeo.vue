<template>
  <builder-modal-content-layout>
    <div class="b-builder-site-settings-seo">
      <form @submit.prevent="applySettings">

        <!-- Title & Favicon -->
        <base-fieldset>
          <base-heading level="2">{{ $t('s.title') }}</base-heading>

          <base-fieldset-row width="wide">
            <BaseTextField :label="$t('s.pageTitle')" v-model="pageTitle" />
          </base-fieldset-row>

          <base-fieldset-row>
            <BaseImageUpload
              v-model="favicon"
              :label="$t('s.favicon')"
              description="32 x 32 px, .ico, .bmp or .png" />
          </base-fieldset-row>

        </base-fieldset>

      </form>
    </div>

    <div slot="controls">
      <BaseButton size="middle" color="gray" :transparent="true" @click="$emit('requestClose')">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton size="middle" color="blue" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsSeo',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      pageTitle: '',
      favicon: ''
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

      this.pageTitle = settings.title
      this.favicon = settings.favicon
    },
    applySettings () {
      const data = {
        title: this.pageTitle,
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
