<script>
import { merge, remove } from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import { getYoutubeVideoIdFromUrl, isValidUrl } from '@editor/util'

const DEF_LINK = {
  href: '#',
  target: '_blank',
  behavior: 'auto',
  action: { name: 'Open URL', value: '' }
}

export default {
  name: 'TheModalButton',

  props: {
    builder: Object
  },

  data () {
    return {
      link: DEF_LINK,
      behavior: '',
      href: '',
      target: false,
      videoId: '',
      actionList: [
        { name: 'Open URL', value: '' },
        { name: 'Open video popup', value: 'ptah-d-video' },
        { name: 'Scroll into section', value: 'scroll-into-section' }
      ],
      action: { name: 'Open URL', value: '' },
      section: {},
      scrollBehaviors: [
        { name: 'Auto', value: 'auto' },
        { name: 'Instant', value: 'instant' },
        { name: 'Smooth', value: 'smooth' }
      ],
      scrollBehavior: { name: 'Auto', value: 'auto' },
      error: {
        url: false
      }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ]),

    sections () {
      let currentSectionId = this.settingObjectSection.id
      return this.builder.sections
        .filter(({ id }) => id !== currentSectionId)
        .map(({ id, name }) => ({ name: name, value: `#section_${id}` }))
    },

    elLink () {
      return this.settingObjectOptions.link
    },

    classes: {
      get: function () {
        return this.settingObjectOptions.classes
      },
      set: function (newValue) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { classes: newValue }))
      }
    },

    videoLink: {
      get: function () {
        return this.settingObjectOptions.video
      },
      set: function (newValue) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { video: newValue }))
      }
    }
  },

  mounted () {
    if (this.elLink) {
      this.href = this.elLink.href
      this.behavior = this.elLink.behavior
      this.target = this.elLink.target === '_blank'
      this.action = this.elLink.action || { name: 'Open URL', value: '' }
    }

    this.videoId = this.videoLink || ''
    this.section = this.sections[0]

    if (this.action.value === 'scroll-into-section') {
      let matches = this.href.match(/\d+(?!\d+)/)
      if (matches) {
        let id = Number(matches[0])
        let section = this.builder.sections.find(section => section.id === id)
        this.section = section !== {}
          ? { name: section.name, value: this.href }
          : this.sections[0]
      }
      this.scrollBehavior = this.scrollBehaviors.find(({ value }) => {
        return value === this.behavior
      }) || this.scrollBehaviors[0]
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    update () {
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { link: this.link }))
    },

    validUrl (url) {
      let v = true

      if (url !== '') {
        v = isValidUrl(url)
      }

      this.error.url = !v

      if (v === false) {
        return
      }

      this.link['href'] = url

      this.update()
    },

    changeTarget () {
      this.link['target'] = this.target === true ? '_blank' : '_self'

      this.update()
    },

    setVideoUrl () {
      let ytId = getYoutubeVideoIdFromUrl(this.videoId)

      if (ytId) {
        this.videoLink = ytId
        this.updateSettingOptions(
          merge({}, this.settingObjectOptions, {
            video: ytId
          })
        )
      }
    },

    changeAction (action) {
      if (action.value === '') {
        this.classes.push('js-element-link')
      } else {
        remove(this.classes, (n) => n === 'js-element-link')
      }

      if (action.value !== 'ptah-d-video') {
        remove(this.classes, (n) => n === 'ptah-d-video')
      } else {
        this.classes.push('ptah-d-video')
      }

      this.href = ''
      this.link.href = ''

      if (action.value === 'scroll-into-section') {
        this.href = this.section.value
        this.link.href = this.section.value
      }

      this.target = false
      this.link.target = '_self'

      this.link['action'] = this.action

      this.update()
    },

    changeScrollIntoSection ({ value }) {
      this.updateSettingOptions(
        merge({}, this.settingObjectOptions, {
          link: { href: value, target: '_self' }
        })
      )
    },

    changeScrollBehavior () {
      this.link.behavior = this.scrollBehavior.value

      this.update()
    }
  }
}
</script>

<template>
  <div class="b-modal-button">
    <!-- action -->
    <div class="b-panel__control">
      <base-select
        label="Action"
        :options="actionList"
        v-model="action"
        @input="changeAction(action)"
      />
    </div>

    <!-- scroll into section -->
    <div v-if="action.value === 'scroll-into-section' && sections.length > 0" class="b-panel__control">
      <base-select
        v-model="section"
        :options="sections"
        @input="changeScrollIntoSection"
        label="Scroll to"/>
      <br>
      <base-select
        v-model="scrollBehavior"
        :options="scrollBehaviors"
        @input="changeScrollBehavior"
        label="Scroll behavior"
      />
    </div>

    <div class="b-modal-button__no-sections" v-if="action.value === 'scroll-into-section' && sections.length === 0">
      No more sections
    </div>

    <!-- open link -->
    <div class="b-panel__control" v-if="action.value === ''">
      <base-text-field
        v-model="href"
        label="URL"
        placeholder="https://www.url.com"
        :hasError="error.url"
        @input="validUrl(href)"
      >
        <span slot="error">
          Invalid URL
        </span>
      </base-text-field>
    </div>
    <div class="b-panel__control" v-if="action.value === ''">
      <BaseSwitcher
        v-model="target"
        label="Open in new window"
        @change="changeTarget"
      />
    </div>

    <!-- video popup -->
    <div class="b-panel__control" v-if="action.value === 'ptah-d-video'">
      <base-text-field
        v-model="videoId"
        label="Youtube video url or id"
        @input="setVideoUrl"
        placeholder="Youtube video Url or Id"
      />
    </div>

  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-modal-button
  /deep/
    .b-base-label
      font-size:  1.2rem
    .b-pth-base-select__name
      font-size:  1.2rem
      max-width: 15rem
      overflow: hidden
      text-overflow: ellipsis
    .b-pth-base-select__options-item
      font-size:  1.2rem
      padding: .6rem 1.2rem
  &__no-sections
    padding: $size-step
    text-align: center
    color: $grey
</style>
