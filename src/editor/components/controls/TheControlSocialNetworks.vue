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
      this.close()
      this.networks[key].visible = !this.networks[key].visible

      this.update()
    },

    changeTarget () {
      this.settings.target = this.vTarget ? '_blank' : '_self'
    },

    open (key) {
      if (!this.networks[key].visible) {
        return
      }

      this.networks[key].expand = !this.networks[key].expand
    },

    close () {
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
  <div>
    <div class="b-panel__col">
      <div class="b-panel__control">
        <div class="b-check-list">
          <div class="b-check-list__item is-editable"
            v-for="(value, key) in networks" :key="key"
            :class="{ 'b-check-list__item_opacity' : false === networks[key].visible, 'b-check-list__item_select' : networks[key].expand }"
            >
              <span class="b-check-list__item-check"
                @click="visible(key)"
                title="Show / Hide"
                :class="{ 'b-check-list__item-check_color' : true === networks[key].visible }"
                >
                <icon-base width="10" height="7" name="checkMark"
                  v-show="networks[key].visible"
                  />
              </span>

              <a class="b-check-list__item-button"
                @click="visible(key)"
                :title="networks[key].name"
                >
                {{ networks[key].name }}
              </a>

              <a class="b-check-list__item-set-link"
                @click="open(key)"
                :class="{ 'b-check-list__item-set-link_color' : networks[key].url !== '' }"
                >
                <icon-base name="link" width="20" color="black" />
              </a>

              <div class="b-check-list__item-set-link-input" v-if="networks[key].expand">
                <base-text-field
                  v-model="networks[key].url"
                  placeholder="https://www.url.com"
                  :hasError="error.url"
                  @input="validUrl(key)"
                >
                    <span slot="error">
                      Invalid URL
                    </span>
                </base-text-field>
              </div>

          </div>
        </div><!--/.b-check-list-->
      </div>
    </div>
    <div class="b-panel__col">
      <div class="b-panel__control">
        <BaseSwitcher
          v-model="vTarget"
          :label="$t('c.openLinksInNewWindow')"
          @change="changeTarget"
        />
      </div>
    </div>
  </div>
</template>
