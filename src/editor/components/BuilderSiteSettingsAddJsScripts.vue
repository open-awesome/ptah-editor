<template>
  <builder-modal-content-layout>
    <div class="b-add-js-scripts">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-add-js-scripts-tabs"
      />
      <div class="layout" v-if="activeTab === 'js'">
          <div class="layout-padding">
            <div class="b-panel__control">
              <base-caption>
                Add JS Scripts
              </base-caption>
              <div class="b-panel__col">
                <textarea
                  id="js"
                  class="b-textarea"
                  placeholder="Add Js Scripts"
                  v-model="script"
                />
              </div>
            </div>
          </div>
      </div>
      <div class="layout" v-if="activeTab === 'css'">
        <div class="layout-padding">
          <div class="b-panel__control">
            <base-caption>
              Add custom CSS
            </base-caption>
            <div class="b-panel__col">
                <textarea
                  id="css"
                  class="b-textarea"
                  placeholder="Add CSS styles"
                  v-model="css"
                />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="controls">
      <BaseButton color="gray" size="small" :transparent="true" @click="close()">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" size="small" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import BaseCaption from '../../components/base/BaseCaption'

export default {
  name: 'BuilderSiteSettingsAddJsScripts',

  components: {
    BaseCaption,
    BuilderModalContentLayout
  },

  data () {
    return {
      script: '',
      css: '',
      tabs: [
        { value: 'js', text: 'JS' },
        { value: 'css', text: 'CSS' }
      ],
      activeTab: 'js'
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  mounted () {
    this.script = this.currentLanding.settings.script
    this.css = this.currentLanding.settings.css
  },

  methods: {
    ...mapActions(['storeSettings', 'activateCheckListItem']),
    ...mapActions('Sidebar', ['toggleSidebar']),

    applySettings () {
      this.storeSettings({
        script: this.script,
        css: this.css
      })

      this.activateCheckListItem('code')

      this.close()
    },

    close () {
      this.toggleSidebar(false)
      this.$router.push(`/editor/${this.$route.params.slug}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-add-js-scripts
  height: 100%
  position: relative

.b-textarea
  border: 1px solid rgba(162, 165, 165, 0.5)
  box-sizing: border-box
  border-radius: 5px

  width: 100%
  height: 100%
  padding: 2rem 2.2rem

  resize: none
  &:focus
    border: 2px solid $main-green
    outline: none

.layout
  &-padding
    display: flex
    width: 100%
    height: 95%
    padding: 0
    .b-panel__control
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      align-items: stretch
    .b-panel__col
      height: 100%
</style>
