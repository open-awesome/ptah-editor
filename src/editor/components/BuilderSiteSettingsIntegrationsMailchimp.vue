<template>
  <div
    class="b-integrations-mailchimp"
    >
    <div>
      <base-heading level="2">Mailchimp</base-heading>
      <template v-if="integrationComplete">
        <base-select
          :options="lists"
          :value="selectedList"
          @input="setList($event)"
          label="Select a list to collect leads"/>

        <br>
        <p>E-mail addresses from the "Form" section will now be sent to this list</p>
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
    ...mapActions(['storeSettings']),
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
  &__controls
    justify-content: flex-start !important
    border-top: none !important

iframe
  border: none
  height: 52rem
</style>
