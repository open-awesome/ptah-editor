<template>
  <div class="mailchimp" id="mailchimp">
    <iframe id="oauthMailchimp" :src="authUri" frameborder="0" width="600" height="620" v-if="!completeOauth"></iframe>

    <div class="mailchimp__complete" v-if="completeOauth">
      user id <br>
      select list
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IntegrationMailchimp',

  data () {
    return {
      clientId: '',
      clientSecret: '',
      returnUri: '/oauth_complete/'
    }
  },

  computed: {
    authUri () {
      return `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.returnUri}`
    },

    completeOauth () {
      return false
    }
  },

  mounted () {
    let frame = document.querySelector('#oauthMailchimp')

    frame.addEventListener('load', (e) => {
      // let code = localStorage.getItem('mc_code')
      // auth user and get lists
    })
  },

  methods: {
    ...mapActions(['storeSettings'])
  }
}
</script>

<style lang="sass" scoped>
  .mailchimp
    width: 60rem
    height: 62rem
</style>
