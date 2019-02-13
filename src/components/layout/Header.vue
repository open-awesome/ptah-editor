<template>
    <header class="b-page__header" v-if="this.isStorefrontPreview == false">
        <!--div style="margin: 1rem auto">
            <router-link to="/">Dashboard</router-link>
            <router-link to="editor/new">Editor</router-link>
        </div-->
      <div class="b-page__header-menu">
        <icon-base name="hamburger" :color="colorHamburger"></icon-base>
      </div>

      <div class="b-page__header-crumbs">
        <span class="b-page__header-crumbs-home">
          <icon-base name="home" :color="colorHome"></icon-base>
        </span>
        <span>
          All sites
        </span>
      </div>

      <div class="b-locale-changer">
        <BaseSelect
          :options="select.options"
          v-model="select.selected"
          >
        </BaseSelect>
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
      colorHamburger: '#333',
      colorHome: '#333',
      select: {
        options: [
          { name: 'en', value: 'en' },
          { name: 'ru', value: 'ru' }
        ],
        selected: { name: 'en', value: 'en' }
      }
    }
  },
  watch: {
    storefrontPreview: {
      handler: function (status, old) {
        this.isStorefrontPreview = status
      },
      deep: true
    },
    select: {
      handler: function (status, old) {
        this.$i18n.locale = status.selected.value
        console.log(status)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['storefrontPreview'])
  },
  mounted () {
    this.select.selected = { name: this.$i18n.locale, value: this.$i18n.locale }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-page__header
  width: 100%
  padding: $size-step/1.33 $size-step

  position: relative
  z-index: 10

  display: flex
  justify-content: space-between
  align-items: center
  &-menu
    width: 1.8rem
  &-crumbs
    width: 100%
    padding: 0 $size-step

    display: flex
    align-items: center
    &-home
      padding: 0  $size-step/4
.b-locale-changer
  .b-pth-base-select__dropdown
    max-height: 6rem !important
</style>
