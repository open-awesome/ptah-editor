<script>
import { mapActions, mapState } from 'vuex'
import BaseScrollContainer from '../base/BaseScrollContainer'

export default {
  components: { BaseScrollContainer },
  data () {
    return {
      createWindow: false,
      presets: [
        {
          type: 'Blank page',
          sections: [],
          image: 'https://s3.protocol.one/images/BlankPage.png',
          description: ''
        },
        {
          type: 'Simple page',
          sections: [
            'FirstScreenSpace01',
            'FooterSpace'
          ],
          url: 'https://s3.protocol.one/files/Simple-page-2020-v3.json',
          image: 'https://s3.protocol.one/images/1_r.jpg',
          description: 'Simple Sci-fi template width video background. Sections: First Screen, Footer'
        },
        {
          type: 'Ptah page',
          sections: [],
          url: 'https://s3.protocol.one/files/Ptah-page-2020-v3.json',
          image: 'https://s3.protocol.one/images/2ptah_r1.jpg',
          description: 'Look at how the landing page was created which stands on the main page of the Ptah page builder'
        },
        {
          type: 'Page with subscription form',
          sections: [
            'FirstScreenSpaceVideoBack',
            'Columns',
            'GalleryPopup',
            'FormCenter',
            'FooterSpace'
          ],
          image: 'https://s3.protocol.one/images/3_r.jpg',
          description: 'Sci-fi template width video background and subscription form. Sections: First screen, columns, gallery, form, footer'
        },
        {
          type: 'Space page',
          sections: [
            'SmmHeader',
            'FirstScreenSpace02',
            'Columns',
            'Slider',
            'Products',
            'SystemRequirements',
            'FrequentlyAskedQuestions',
            'FooterSpace'
          ],
          url: 'https://s3.protocol.one/files/Space-page-2020-v3.json',
          image: 'https://s3.protocol.one/images/4_r.jpg',
          description: 'Sci-fi styled template with: Menu, First screen, columns, slider, products, system requirments, FAQ and footer'
        },
        {
          type: 'Fantasy page',
          sections: [
            'SmmFantasyHeader',
            'FirstScreenFantasy02',
            'ColumnsFantasy',
            'ProductsFantasy',
            'SliderFantasy',
            'SystemRequirementsFantasy',
            'FooterFantasy'
          ],
          image: 'https://s3.protocol.one/images/5_r.jpg',
          description: 'Fantasy styled template with: Menu, First screen, columns, slider, products, system requirments, FAQ and footer'
        }
      ],
      presetSelected: 0,
      newPageTitle: '',
      invalid: false,
      createProgress: false,
      showConfirmDelete: false,
      showConfirmClone: false,
      currentItem: ''
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
      'clearSlug',
      'copyLanding'
    ]),

    openLanding (item) {
      // add log
      this.$Progress.start()
      this.$router.push({ path: `/editor/${item._id}` })
    },

    openSettigs (item) {
      this.$Progress.start()
      this.$router.push({ path: `/editor/${item._id}/settings` })
    },

    openWindow () {
      this.createWindow = true
      this.$nextTick(() => {
        document.querySelector('.b-base-text-field__input').focus()
      })
    },

    deleteItem (item) {
      this.currentItem = item
      this.showConfirmDelete = true
    },

    cloneItem (item) {
      this.currentItem = item
      this.showConfirmClone = true
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
              return this.fetchLandingFromFile({ slug: response._id, url: url, name: this.newPageTitle })
            }
          })
          .then((data) => {
            this.$router.push({ path: `/editor/${data.slug}` })
          })
      } else {
        this.invalid = true
        this.createProgress = false
      }
    },

    getUpdatedLeftTime (dateString) {
      let date = new Date(dateString)
      let now = new Date(Date.now())
      let leftMs = now.getTime() - date.getTime()
      let leftDays = (leftMs / 1000 / 60 / 60 / 24).toFixed()
      let leftHours = null
      let leftMinutes = null

      if (leftDays < 1) {
        leftHours = (leftMs / 1000 / 60 / 60).toFixed()

        if (parseInt(leftHours) === 0) {
          leftMinutes = (leftMs / 1000 / 60).toFixed()

          return parseInt(leftMinutes) === 0 ? `Updated one minute ago` : `Updated ${leftMinutes} minutes ago`
        }
      }
      return leftHours === null ? `Updated ${leftDays} days ago` : `Updated ${leftHours} hours ago`
    },

    getItemCover (item) {
      return item.cover || 'https://s3.protocol.one/images/placeholder.png'
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
      <!-- create new -->
      <figure class="b-dashboard__item create" @click="openWindow()">
        <div class="b-dashboard__item-cell b-dashboard__item--create">
          <icon-base name="plus" width="40" height="40" color="#2275D7"></icon-base>
          <figcaption>{{ $t('d.createNew') }}</figcaption>
        </div>
      </figure>

      <!-- cards -->
      <figure v-for="(item, index) in landings" :key="index" class="b-dashboard__item" @click="openLanding(item)">
        <div class="b-dashboard__item-cell">
          <div class="b-dashboard__item-icons">
            <a @click.stop="openSettigs(item)" class="b-dashboard__icon" tooltip="Settings">
              <icon-base name="cog" color="#2275D7" width="18" hight="18"></icon-base>
            </a>
            <div class="b-dashboard__icon" @click.stop="cloneItem(item)" tooltip="Duplicate landing">
              <icon-base name="duplicate" color="#2275D7" width="18" hight="18"></icon-base>
            </div>
            <div class="b-dashboard__icon" @click.stop="deleteItem(item)" tooltip="Delete">
              <icon-base name="remove" color="#2275D7" width="18" hight="18"></icon-base>
            </div>
          </div>
          <div class="b-dashboard__item-cell-top" :style="{ 'background-image': `url(${getItemCover(item)})` }"></div>
          <div class="b-dashboard__item-cell-bottom">
            <div class="b-dashboard__item--name" :title="item.name">{{ item.name }}</div>
            <div class="b-dashboard__item--update">{{ getUpdatedLeftTime(item.updateDate) }}</div>
          </div>
        </div>
      </figure>
    </div>

    <!-- modal window -->
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
          <div class="b-create__header">
            <base-text-field
              v-model="newPageTitle"
              placeholder="New Landing Page"
              :hasError="invalid"
              :errorText="$t('d.cmodalErrorText')">
            </base-text-field>
          </div>

          <base-scroll-container backgroundBar="#999">
            <div class="b-presets">
              <div class="b-presets__item"
                   v-for="(item, index) in presets"
                   :key="index"
                   :style="{ 'background-image': `url(${item.image})` }"
                   :class="{ 'selected': presetSelected == index, 'first': index === 0 }"
                   @click="presetSelected = index">
                <div class="b-presets__item-inner">
                  <div class="b-presets__item-name">
                    {{item.type}}
                  </div>
                  <div class="b-presets__item-description">
                    {{item.description}}
                  </div>
                </div>
              </div>
            </div>
          </base-scroll-container>

          <div class="b-create__footer">
            <base-button color="gray" size="middle" @click="createWindow = false" :disabled="createProgress">
              {{ $t('nav.cancel') }}
            </base-button>
            <base-button color="blue" size="middle" @click="newLanding" :disabled="createProgress">
              {{ $t('nav.create') }}
            </base-button>
          </div>
        </div>
      </div>
    </transition>

    <!-- confirm windows -->
    <base-confirm
      title="Delete landing"
      @confirm="deleteLanding(currentItem._id)"
      @close="showConfirmDelete = false"
      v-if="showConfirmDelete"
      button="Delete">
      You are going to delete <b>{{currentItem.name}}</b>, this cannot be undone. Confirm deleting?
    </base-confirm>

    <base-confirm
      title="Clone landing"
      @confirm="copyLanding([currentItem._id])"
      @close="showConfirmClone = false"
      v-if="showConfirmClone"
      button="Clone">
      Copy landing <b>{{currentItem.name}}</b>?
    </base-confirm>
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

  font-family: 'Lato', Helvetica Neue, Helvetica, Arial, sans-serif

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
      // box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25)

      font-size: $size-step/2
      cursor: pointer

      display: flex
      flex-direction: column
      justify-content: center
      align-items: stretch
      transition: all .2s ease-out
      &:hover
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15)
      &-top
        height: 100%
        background-size: cover
        background-position: top center
      &-bottom
        text-align: center
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
        color: $main-green
        letter-spacing: -0.02em

    &--name
      font-weight: bold
      font-size: 1.6rem
      line-height: 1.9rem
      padding-bottom: .6rem
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
      overflow: hidden
      max-height: 4rem
      white-space: nowrap
    &--update
      color: $grey-middle
      font-size: 1.4rem
      line-height: 1.7rem
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
    margin-left: .8rem
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
  z-index: 15

  display: flex
  justify-content: center
  align-items: center

  &__inner
    width: 66rem
    height: 90vh
    z-index: 10

    background: $white

    display: flex
    flex-direction: column
    justify-content: stretch
    position: relative
    border-radius: 4px

  &__header
    padding: 1.5rem 2.4rem
    width: 60%

    input
      font-size: 2rem !important
      line-height: 2.4rem
      height: 4rem !important

  &__footer
    padding: 1.5rem 2.4rem
    display: flex
    justify-content: flex-end

  &__close
    position: absolute
    top: $size-step
    right: $size-step
    cursor: pointer
    &:hover
      & svg
        fill: $dark-grey

.b-presets
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  width: 61rem
  margin-left: 2.4rem
  padding: 2.4rem 0

  &__item
    width: 29rem
    height: 24rem
    background-color: $white
    background-size: contain
    background-position: top center
    background-repeat: no-repeat
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
    border-radius: 2px
    margin-bottom: 3rem
    padding: 1rem

    display: flex
    align-items: center
    justify-content: center
    text-align: center
    position: relative

    cursor: pointer
    transition: all .2s ease-out
    &.selected
      &:after
        content: ''
        display: block
        position: absolute
        top: 10px
        left: 10px
        width: 2.4rem
        height: 2.4rem
        background: url('https://s3.protocol.one/images/checked.png') no-repeat
        background-size: contain

    &.first
      border: 1px solid #E6E6E6
      background-size: auto
      background-position: center center
    &-inner
      position: absolute
      bottom: 0
      right: 0
      left: 0
      padding: 1.5rem

      background: $white

    &-name
      font-size: 1.6rem
      line-height: 1.9rem
      color: $dark-grey
      padding-bottom: 1rem

    &-description
      font-size: 1.4rem
      line-height: 1.7rem
      color: $grey-middle

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

.vb>.vb-dragger
  z-index: 5
  width: 1rem
  right: 0
</style>
