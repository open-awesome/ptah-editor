<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import { isValidUrl } from '@editor/util'

export default {
  name: 'ControlSocialNetworks',

  data () {
    return {
      vTarget: '',
      networks: [],
      error: {
        url: false
      }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    socialNetworks () {
      return this.settingObjectOptions.socialNetworks
    },

    settings () {
      return this.settingObjectOptions.settings
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    visible (key) {
      this.closeModal()
      this.networks[key].visible = !this.networks[key].visible

      this.update()
    },

    changeTarget () {
      this.settings.target = this.vTarget ? '_blank' : '_self'
    },

    applyLink (key) {
      this.closeModal()
    },

    openModal (key) {
      this.closeModal()

      if (!this.networks[key].visible) {
        return
      }

      this.$nextTick(function () {
        this.networks[key].expand = !this.networks[key].expand
      })
    },

    closeModal () {
      for (let key in this.networks) {
        let v = this.valid(key)

        this.networks[key].expand = false

        if (!v) this.networks[key].url = ''

        this.update()
      }
    },

    valid (key) {
      let v = true
      let url = this.networks[key].url

      if (url !== '') {
        v = isValidUrl(url)
      }

      this.error.url = !v

      return v
    },

    validUrl (key) {
      let v = this.valid(key)

      if (v) this.update()
    },

    update () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { socialNetworks: this.networks }))
    }
  },

  mounted () {
    this.vTarget = this.settings.target || '_blank'
    this.networks = this.socialNetworks
  }
}
</script>

<template>
  <div class="b-social-networks-controls-controls">
    <div class="b-social-networks-controls-controls__control">
      <div class="b-social-networks-controls">
        <div class="b-social-networks-controls__item is-editable"
          v-for="(value, key) in networks" :key="key"
          :class="{ 'b-social-networks-controls__item_opacity' : false === networks[key].visible, 'b-social-networks-controls__item_select' : networks[key].expand }"
          >
            <span class="b-social-networks-controls__item-check"
              @click="visible(key)"
              title="Show / Hide"
              :class="{ 'b-social-networks-controls__item-check_color' : true === networks[key].visible }"
              >
              <icon-base width="10" height="7" name="checkMark"
                v-show="networks[key].visible"
                />
            </span>

            <a class="b-social-networks-controls__item-button"
              @click="visible(key)"
              :title="networks[key].name"
              >
              {{ networks[key].name }}
            </a>

            <a class="b-social-networks-controls__item-set-link"
              @click="openModal(key)"
              :class="{ 'b-social-networks-controls__item-set-link_color' : networks[key].url !== '' }"
              >
              <icon-base name="link" width="20" color="black"></icon-base>
            </a>

          <div class="b-social-networks-controls__item-set-link-modal" v-if="networks[key].expand">
            <div class="b-social-networks-controls__control">
              <div class="b-social-networks-controls__item-set-link-modal-chapter">
                {{ `Add ${networks[key].name} link` }}
              </div>
              <div>
              <base-text-field label="URL" v-model="networks[key].url" placeholder="https://www.url.com" :hasError="error.url" @input="validUrl(key)">
                <span slot="error">
                  Invalid URL
                </span>
              </base-text-field>
              </div>
              <div class="b-social-networks-controls__item-set-link-modal-buttons">
                <BaseButton
                  class="b-social-networks-controls__item-set-link-modal-button"
                  :color="'gray'"
                  :transparent="true"
                  size="middle"
                  @click="closeModal()"
                  >
                  Close
                </BaseButton>
              </div>
            </div>
          </div>

        </div>
      </div><!--/.b-social-networks-controls-->
    </div>
    <div class="b-social-networks-controls__control">
      <BaseSwitcher v-model="vTarget" :label="$t('c.openLinksInNewWindow')" @change="changeTarget" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-social-networks-controls
  width: 100%
  max-width: 100rem
  margin: 1rem auto
  display: inline-block
  min-height: 5rem

  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    margin-top: 2.2rem
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative

    margin: $size-step/2 0
    min-height: $size-step/2

    display: flex
    justify-content: flex-start
    align-items: center

    font-size: 1.6rem
    line-height: 2.4rem
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: $black
      fill: $black
    &-button
      padding: 0 $size-step/2
      border: none
      position: relative
      display: inline-block
      user-select: none
      text-align: left
      width: 20rem
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
    &-check
      width: 2rem
      height: 2rem

      border: 0.2rem solid $grey
      border-radius: 0.3rem
      background: transparent
      text-align: center

      display: inline-block
      & svg
        fill: $dark-grey
        vertical-align: middle

        position: relative
        top: -0.5rem
      &_color
        border: 0.2rem solid rgba($cornflower-blue, 0.5)
    &-set-link
      &-modal
        width: 19rem
        background: $white
        position: absolute
        right: 2rem
        top: -2.4rem
        z-index: 1
        box-shadow: 0px 0.4rem 4rem rgba($black, 0.35)
        padding: 0 1.6rem 1.63rem
        &:before
          content: ""
          position: absolute
          width: $size-step/2
          height: $size-step/2
          top: 2.4rem
          right: -.7rem
          background: $white
          transform: rotate(-45deg)
          z-index: 2
        &-buttons
          display: flex
          justify-content: flex-end
          margin: $size-step 0 0
        &-chapter
          font-size: 1.6rem
          letter-spacing: -0.02em
          color: $dark-grey
          margin: 0 0 $size-step/2 0
      &_color *
        fill: $dark-blue-krayola
      &_color *
        fill: #4D7DD8
</style>
