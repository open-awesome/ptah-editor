<template>
  <div class="mailchimp" id="mailchimp">
    ...
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IntegrationMailchimp',

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    ...mapActions(['storeSettings']),
    ...mapActions('User', ['mailchimpLists'])
  },

  created () {
    this.mailchimpLists()
  }
}
</script>

<style lang="sass" scoped>
  .mailchimp
    width: 60rem
    height: 62rem
</style>
