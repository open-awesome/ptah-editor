<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      createWindow: false,
      presets: [
        {
          type: 'Blank page',
          sections: []
        },
        {
          type: 'Simple page',
          sections: ['FirstScreenSpace01', 'FooterSpace'],
          url: 'https://s3.protocol.one/files/templateSimplePage.json'
        },
        {
          type: 'Ptah page',
          sections: [],
          url: 'https://s3.protocol.one/files/templatePtah.json'
        },
        {
          type: 'Page with subscription form',
          sections: ['FirstScreenSpaceVideoBack', 'Columns', 'GalleryPopup', 'FormCenter', 'FooterSpace'],
          url: 'https://s3.protocol.one/files/templatePageWithSubscriptionForm.json'
        },
        {
          type: 'Space page',
          sections: ['SmmHeader', 'FirstScreenSpace02', 'Columns', 'Slider', 'Products', 'SystemRequirements', 'FrequentlyAskedQuestions', 'FooterSpace'],
          url: 'https://s3.protocol.one/files/templateSpacePage.json'
        }
      ],
      presetSelected: 0,
      newPageTitle: '',
      invalid: false,
      createProgress: false
    }
  },

  computed: {
    ...mapState([
      'landings'
    ])
  },

  methods: {
    ...mapActions([
      'fetchLandings',
      'createLanding',
      'deleteLanding',
      'fetchLandingFromFile',
      'saveLanding',
      'clearSlug'
    ]),

    openLanding (item) {
      // add log
      this.$Progress.start()
      this.$router.push({ path: `/editor/${item._id}` })
    },

    openWindow () {
      this.createWindow = true
      this.$nextTick(() => {
        document.querySelector('.b-base-text-field__input').focus()
      })
    },

    newLanding () {
      if (this.newPageTitle.length > 0 && !this.createProgress) {
        this.createProgress = true
        this.$Progress.start()
        this.invalid = false
        this.createLanding({ name: this.newPageTitle, sections: this.presets[this.presetSelected].sections })
          .then((response) => {
            let url = this.presets[this.presetSelected].url

            if (url === undefined || url === '') {
              response['slug'] = response._id

              return Promise.resolve(response)
            } else {
              return this.fetchLandingFromFile({ slug: response._id, url: url })
            }
          })
          .then((data) => {
            this.$router.push({ path: `/editor/${data.slug}` })
          })
      } else {
        this.invalid = true
        this.createProgress = false
      }
    }
  },
  created () {
    this.$Progress.start()
    this.fetchLandings().then(() => {
      this.$Progress.finish()
    })
  },

  mounted () {
    this.clearSlug()
  }
}
</script>

<template>
  <div class="b-page__content">
    <div class="b-dashboard">
      <figure class="b-dashboard__item create" @click="openWindow()">
        <div class="b-dashboard__item-cell b-dashboard__item--create">
          <icon-base name="plus" width="40" height="40" color="#2275D7"></icon-base>
          <figcaption>{{ $t('d.createNew') }}</figcaption>
        </div>
      </figure>

      <figure v-for="(item, index) in landings" :key="index" class="b-dashboard__item" @click="openLanding(item)">
        <div class="b-dashboard__item-cell">
          <div class="b-dashboard__item-icons">
            <div class="b-dashboard__icon" @click.stop="deleteLanding(item._id)">
              <icon-base name="remove" color="#2275D7" width="18" hight="18"></icon-base>
            </div>
          </div>
          <div class="b-dashboard__item-cell-top"></div>
          <div class="b-dashboard__item-cell-bottom">
            {{ item.name }}
          </div>
        </div>
      </figure>
    </div>

    <transition name="slide-fade">
      <div class="b-create" v-if="createWindow" @click.self="createWindow = false">
        <div class="b-create__inner">
          <div class="b-create__close"
               @click="createWindow = false">
            <icon-base
              name="close"
              color="#c4c4c4"
              width="14"
              height="14"
            />
          </div>
          <h3>{{ $t('d.cmodalHeader') }}</h3>

          <base-text-field
            v-model="newPageTitle"
            :hasError="invalid"
            :errorText="$t('d.cmodalErrorText')"
            :label="$t('d.cmodalLabel')">
          </base-text-field>

          <div class="b-presets">
            <div class="b-presets__item"
                 v-for="(item, index) in presets"
                 :key="index"
                 :class="{ 'selected': presetSelected == index }"
                 @click="presetSelected = index">
              {{item.type}}
            </div>
          </div>

          <base-button color="blue" size="middle" @click="newLanding" :disabled="createProgress">
            {{ $t('nav.create') }}
          </base-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-dashboard
  width: 100%
  max-width: $large /* $large: 1440px */
  padding: $size-step*1.5 /* $size-step: 3.2rem */
  margin: 0 auto

  font-family: 'Lato', Helvetica Neue, Helvetica, Arial

  display: flex
  flex-wrap: wrap
  &__item
    width: 33%
    padding: 0
    margin: 0
    position: relative
    &-cell
      max-width: 13*$size-step
      height: 8*$size-step
      margin: $size-step/2

      background: $ligth-grey
      box-shadow: 0 ($size-step/8) $size-step rgba($black, 0.25)

      font-size: $size-step/2
      cursor: pointer

      display: flex
      flex-direction: column
      justify-content: center
      align-items: stretch
      &-top
        height: 100%
      &-bottom
        height: 2.5 * $size-step
        padding: $size-step/2 $size-step/1.33
        background-color: $white
        color: $dark-grey
    &--create
      justify-content: center
      align-items: center
      background: $white
      padding-top: 4rem
      figcaption
        margin-top: 4.6rem
        font-size: 1.6rem
        color: $dark-blue-krayola
        letter-spacing: -0.02em
    &-icons
      position: absolute
      top: 3.2rem
      right: 3.2rem
      display: none
    &:hover .b-dashboard__item-icons
      display: flex

  &__icon
    background: $white
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25)
    border-radius: 50%

    width: 4rem
    height: 4rem
    display: flex
    justify-content: center
    align-items: center

.b-create
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background-color: rgba($dark-blue, 0.2)

  &__inner
    position: absolute
    left: 50%
    top: 50%
    margin-left: -$size-step*29/2
    margin-top: -$size-step*16/2
    width: $size-step*29
    height: $size-step*16
    z-index: 10
    padding: 5rem

    background: $white

    display: flex
    flex-direction: column
    justify-content: stretch

  &__close
    position: absolute
    top: $size-step
    right: $size-step
    cursor: pointer
    &:hover
      & svg
        fill: $dark-grey

.b-presets
  margin: 2rem 0 2rem -3rem
  display: flex

  &__item
    width: 15rem
    height: 20rem
    background: $ligth-grey
    border: 2px solid rgba($dark-blue, 0.2)
    margin-left: 3rem
    padding: 1rem

    display: flex
    align-items: center
    justify-content: center
    text-align: center

    color: $dark-blue-krayola
    cursor: pointer
    transition: all .2s ease-out
    &.selected
      border: 2px solid $dark-blue-krayola

// Animations
.slide-fade
  &-enter-active
    transition: all .2s ease

  &-leave-active
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    opacity: 0
    transform: translateX(-0.8rem)
</style>
