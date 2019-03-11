<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlSocialNetworks',

  components: {
    VuseIcon
  },

  data () {
    return {
      vTarget: '',
      networks: []
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
    visible (key) {
      this.closeModal()
      this.networks[key].visible = !this.networks[key].visible
    },
    changeTarget () {
      this.settings.target = this.vTarget ? '_blank' : '_self'
    },
    applyLink () {
      this.closeModal()
    },
    openModal (key) {
      this.closeModal()
      this.$nextTick(function () {
        this.networks[key].expand = !this.networks[key].expand
      })
    },
    closeModal () {
      for (var key in this.networks) {
        this.networks[key].expand = false
      }
    }
  },

  mounted () {
    this.vTarget = this.settings.target || '_blank'
    this.networks = this.socialNetworks
  }
}
</script>

<template>
  <div class="b-social-networks-controls">
    <div class="b-social-networks-controls__control">
      <div class="b-social-networks">
        <div class="b-social-networks__item is-editable"
          v-for="(value, key) in networks" :key="key"
          :class="{ 'b-social-networks__item_opacity' : false === networks[key].visible, 'b-social-networks__item_select' : networks[key].expand }"
          >
          <div>
            <span class="b-socials-networks__item-eye"
              @click="visible(key)"
              title="Show / Hide"
              >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

            <a class="b-social-networks__item-button"
              v-if="!networks[key].expand"
              @click="visible(key)"
              :title="networks[key].name"
              >
              {{ networks[key].name }}
            </a>

            <a class="b-social-networks__item-set-link"
              v-if="networks[key].visible && !networks[key].expand"
              @click="openModal(key)"
              :class="{ 'b-social-networks__item-set-link_color' : networks[key].url !== '' }"
              >
              <icon-base name="link" width="15" color="black"></icon-base>
            </a>
          </div>

          <div class="b-social-networks__item-set-link-modal" v-if="networks[key].expand">
            <div class="b-link-controls__control">
              <base-text-field v-model="networks[key].url" placeholder="Type link here"></base-text-field>
              <BaseButton
                :color="'blue'"
                :transparent="false"
                size="small"
                @click="applyLink"
                >
                Apply
              </BaseButton>
            </div>
          </div>

        </div>
      </div><!--/.b-social-networks-->
    </div>
    <div class="b-link-controls__control">
      <input type="checkbox" id="target" v-model="vTarget" @change="changeTarget">
      <label for="target">open links in new window</label>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-social-networks-controls
  &__control
    margin-top: 2.2rem

.b-social-networks
  width: 100%
  max-width: 100rem
  margin: 1rem auto
  display: inline-block
  min-height: 5rem
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
    margin: 0.5rem 0
    min-height: 2.6rem
    display: block
    color: #4D7DD8
    fill: #4D7DD8
    display: flex
    justify-content: flex-start
    align-items: center
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: #000
      fill: #000
    &-button
      padding: 0 1rem
      border: none
      position: relative
      display: inline-block
      user-select: none
      text-align: left
      width: 15rem
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
    &-eye
      border: none
      background: transparent
      padding: 0 0.5rem
      display: inline-block
    &-set-link
      &-modal
        margin-left: 1rem
        position: absolute
        top: -0.4rem
        left: 1.5rem
        background: #436FEE
        padding: 0 0 0 0.5rem
        z-index: 1
        & .b-link-controls__control
          display: flex
          justify-content: flex-start
          align-items: center
        /deep/
          .b-base-text-field__input,
          & input
            font-size: 1.4rem !important
            color: #fff
            background-color: #436FEE
            border-color: #436FEE
          .b-pth-base-button
            margin: 0
            background-color: #ffffff
            border-color: #436FEE
            color: #436fee
      &_color *
        fill: #4D7DD8
</style>
