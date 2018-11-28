<template>
  <builder-modal-content-layout>
    <div class="b-builder-site-settings-seo">
      <form @submit.prevent="applySettings">
        <base-heading level="2">Title & Favicon</base-heading>
        <div class="b-builder-site-settings-seo__field">
          <BaseImageUpload
            v-model="favicon"
            label="Fav Icon"
            description="32 x 32 px, .ico, .bmp or .png" />
        </div>

        <div class="b-builder-site-settings-seo__field">
          <BaseTextField label="Page Title" v-model="pageTitle" />
        </div>

        <base-heading level="2">
          Open Graph
          <a class="b-builder-site-settings-seo__help"
            target="_blank"
            href="#">
            <IconBase name="questionCircle" width="16" height="16" color="#C4C4C4" />
          </a>
        </base-heading>
        <div class="b-builder-site-settings-seo__field">
          <div v-for="(item, index) in ogTags" :key="index" class="og-tag">
            <select v-model="item.property" class="og-input">
              <option value="og:title" selected>og:title</option>
              <option value="og:description">og:description</option>
              <option value="og:image">og:image</option>
              <option value="og:type">og:type</option>
              <option value="og:url">og:url</option>
              <option value="og:locale">og:locale</option>
              <option value="og:locale:alternate">og:locale:alternate</option>
              <option value="og:video">og:video</option>
            </select>
            <input type="text" v-model="item.content" placeholder="content" class="og-input">
            <button class="controller-button" @click.prevent="deleteTag(index)" v-if="index !== ogTags.length-1 ">
              <IconBase name="close" width="16" height="16" color="#fff" />
            </button>
            <button class="controller-button is-green" tooltip-position="top" tooltip="add tag" @click.prevent="addTag" v-if="index === ogTags.length-1 ">
              <IconBase name="plus" width="16" height="16" color="#fff" />
            </button>
          </div>
        </div>

        <base-heading level="2">Google</base-heading>

        <div class="b-builder-site-settings-seo__field">
          <base-text-field
            v-model="gtmId"
            placeholder="GTM-XXXXXX">

            <template slot="label">
              GTM container ID
              <a class="b-builder-site-settings-seo__help"
                target="_blank"
                href="https://developers.google.com/tag-manager/quickstart">
                <IconBase name="questionCircle" width="16" height="16" color="#C4C4C4" />
              </a>
            </template>

          </base-text-field>
        </div>

        <div class="b-builder-site-settings-seo__field">
          <BaseTextField label="Google site tag" v-model="gtag" placeholder="UA-XXXXXXXX-X" />
        </div>
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
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsSeo',

  components: {
    BuilderModalContentLayout
  },

  props: {
    builder: {
      required: true
    }
  },

  data () {
    return {
      pageTitle: '',
      favicon: '',
      ogTags: [],
      gtmId: '',
      gtag: ''
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
      'getLandingData',
      'storeSettings'
    ]),
    updateSettings () {
      const settings = this.currentLanding.settings
      this.ogTags = settings.ogTags
      this.pageTitle = settings.title
      this.gtmId = settings.gtmId
      this.gtag = settings.gtag
      this.favicon = settings.favicon
    },
    addTag () {
      this.ogTags.push({ property: '', content: '' })
    },
    deleteTag (index) {
      this.ogTags.splice(index, 1)
    },
    applySettings () {
      const data = {
        title: this.pageTitle,
        ogTags: this.ogTags,
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
  &__field
    width: 32rem
    margin-bottom: 3.5rem

  &__help
    margin-left: 1rem
</style>
