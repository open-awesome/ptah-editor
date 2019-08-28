<template>
  <builder-modal-content-layout id="settings-cookies">

    <form id="cookies-form" @submit.prevent="savePolicy">

      <base-fieldset>

        <base-heading level="2">{{ $t('s.cookiePolicy') }}</base-heading>

        <base-fieldset-row>
          <base-switcher
              v-model="useCookie"
              :label="$t('s.useCookie')"/>
        </base-fieldset-row>

        <base-fieldset-row>
          <base-upload-input
              v-model="pdfFile"
              :label="$t('s.policyFile')"
              placeholder="Paste pdf file"/>
        </base-fieldset-row>

      </base-fieldset>

    </form>

  <div slot="controls">
    <base-button size="middle" v-text="$t('nav.cancel')" :transparent="true" @click="close()" color="gray"/>
    <base-button size="middle" color="blue" v-text="$t('nav.save')" type="submit" form="cookies-form"/>
  </div>

  </builder-modal-content-layout>
</template>

<script>
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BuilderSiteSettingsCookies',

  components: { BuilderModalContentLayout },

  data () {
    return {
      useCookie: null,
      pdfFile: null
    }
  },

  computed: {
    ...mapState({
      policy: ({ currentLanding: { settings } }) => settings.cookiesPolicy
    })
  },

  watch: {
    policy: {
      immediate: true,
      deep: true,
      handler (value) {
        this.updatePolicy(value)
      }
    }
  },

  methods: {
    ...mapActions(['storeSettings']),

    updatePolicy ({ enabled, pdf }) {
      this.useCookie = enabled
      this.pdfFile = pdf
    },

    savePolicy () {
      this.storeSettings({
        cookiesPolicy: {
          enabled: this.useCookie,
          pdf: this.pdfFile
        }
      })
      this.close()
    },

    close () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    }
  }
}
</script>
