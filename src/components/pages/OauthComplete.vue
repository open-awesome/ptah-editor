<template>
  <div class="oauth-complete">
    <base-loading></base-loading>
  </div>
</template>

<script>
import BaseLoading from '../base/BaseLoading'
import { getParameterByName } from '@editor/util'

export default {
  name: 'OauthComplete',

  components: { BaseLoading },

  mounted () {
    let code = getParameterByName('code', window.location.search)
    if (code) {
      localStorage.setItem('mc_code', code)
    }
  }
}
</script>

<style lang="sass" scoped>
.oauth-complete
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  background: #fff
</style>
