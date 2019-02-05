<template>
  <builder-modal-content-layout id="settings-integrations">
    <div>
      <img src="https://gn626.cdn.stg.gamenet.ru/0/7fNVG/o_OwU4O.jpg" alt="">
    </div>

    <integration-mailchimp></integration-mailchimp>

  </builder-modal-content-layout>
</template>

<script>
import BuilderModalContentLayout from './BuilderModalContentLayout'
import IntegrationMailchimp from './integrations/IntegrationMailchimp'

export default {
  components: { IntegrationMailchimp, BuilderModalContentLayout }
}
</script>

<style lang="sass" scoped>

</style>
