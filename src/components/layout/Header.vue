<template>
    <header class="b-page__header" v-if="this.isStorefrontPreview == false">
        Это хэдер

        <div style="margin: 1rem auto">
            <router-link to="/">Dashboard</router-link>
            <router-link to="editor/new">Editor</router-link>
        </div>

      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
      </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  data () {
    return {
      isStorefrontPreview: false,
      langs: ['en', 'ru']
    }
  },
  watch: {
    storefrontPreview: {
      handler: function (status, old) {
        this.isStorefrontPreview = status
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['storefrontPreview'])
  }
}
</script>

<style lang="sass" scoped>
  header
    display: flex
</style>
