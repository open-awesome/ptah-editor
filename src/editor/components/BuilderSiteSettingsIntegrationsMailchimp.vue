<template>
  <div
    class="b-integrations-mailchimp"
    >
    <div class="b-integrations-mailchimp__inner">
      <template v-if="integrationComplete">
        <img
          class="b-integrations-mailchimp__logo"
          src="https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/64004e89-19d2-4ce4-84d6-6d0df226d8af.png">
        <base-select
          :options="lists"
          :value="selectedList"
          @input="setList($event)"
          label="Select a list to collect leads"/>

        <br>
        <p class="b-integrations-mailchimp__descr">E-mail addresses from the "Form" section will now be sent to this list</p>
      </template>

      <template v-if="!integrationComplete">
        <iframe :src="frameSrc" frameborder="none" width="100%" height="100%"></iframe>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import * as _ from 'lodash-es'
import store from '@store'

export default {
  name: 'BuilderSiteSettingsIntegrationsMailchimp',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      lists: [],
      selectedList: {}
    }
  },

  computed: {
    ...mapState(['currentLanding']),
    ...mapState('User', ['user', 'mcLists']),

    integrationComplete () {
      return this.user.mailchimpIntegration
    },

    frameSrc () {
      return `${window.location.protocol}//${window.location.hostname}/mailchimp/login`
    },

    savedList () {
      return this.currentLanding.settings.mailchimpList
    }
  },

  async beforeRouteEnter (to, from, next) {
    await store.dispatch('User/getUser')
    next()
  },

  created () {
    if (this.integrationComplete) {
      this.getLists()
    } else {
      this.listenFrame()
    }
  },

  methods: {
    ...mapActions(['storeSettings', 'activateCheckListItem']),
    ...mapActions('User', ['mailchimpLists', 'getUser']),

    listenFrame () {
      window.addEventListener('message', (e) => {
        let data = {}

        try {
          data = JSON.parse(e.data)
        } catch (e) { }

        if (data.success) {
          this.getLists()
            .then(() => {
              this.activateCheckListItem('integrations')
              return this.getUser()
            })
        }
      })
    },

    getLists () {
      return this.mailchimpLists()
        .then(() => {
          let list = {}
          this.lists = this.mcLists.lists.slice()

          if (this.savedList) {
            list = _.find(this.lists, (o) => o.name === this.savedList)
          } else {
            list = this.lists[0]
          }

          this.setList(list)
        })
    },

    setList (list) {
      this.selectedList = list
      let sUrl = list.subscribe_url_long

      let url = ''
      let pos = sUrl.indexOf('?u=')
      url = sUrl.substring(0, pos) + '/post' + sUrl.substring(pos)

      this.storeSettings({ mailchimpUrl: url })
      this.storeSettings({ mailchimpList: list.name })
    }
  }
}
</script>

<style lang="sass" scoped>
.b-integrations-mailchimp
  height: 100%
  min-height: 60rem

  &__inner
    padding: 0 2.5rem
    height: 100%

  &__logo
    max-width: 100%
    margin: 2rem 0 4rem

  &__descr
    font-size: 1.6rem
    line-height: 2rem

  &__controls
    justify-content: flex-start !important
    border-top: none !important

iframe
  border: none
  // height: 52rem
</style>
