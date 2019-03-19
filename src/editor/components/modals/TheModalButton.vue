<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import { getYoutubeVideoIdFromUrl } from '@editor/util'

export default {
  name: 'TheModalButton',

  props: {
    builder: Object
  },

  data () {
    return {
      link: '',
      behavior: '',
      target: false,
      videoId: '',
      actionList: [
        { name: 'Open URL', value: '' },
        { name: 'Open video popup', value: 'ptah-d-video' },
        { name: 'Scroll into section', value: 'scroll-into-section' }
      ],
      action: { name: 'Open URL', value: '' },
      section: null,
      scrollBehaviors: [
        { name: 'Auto', value: 'auto' },
        { name: 'Instant', value: 'instant' },
        { name: 'Smooth', value: 'smooth' }
      ],
      scrollBehavior: { name: 'Auto', value: 'auto' }
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
        .map(({ id, name }) => ({ name, value: `#section_${id}` }))
    },

    elLink () {
      return this.settingObjectOptions.link
    },

    classes: {
      get: function () {
        return this.settingObjectOptions.classes
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { classes: newValue }))
      }
    },

    videoLink () {
      return this.settingObjectOptions.video
    }
  },

  created () {
    if (this.elLink) {
      this.link = this.elLink.href
      this.behavior = this.elLink.behavior
      this.target = this.elLink.target === '_blank'
    }

    this.videoId = this.videoLink || ''

    if (this.videoId.length) {
      this.action = { name: 'Open video popup', value: 'ptah-d-video' }
    } else if (this.link && this.link.includes('#section')) {
      let matches = this.link.match(/\d+(?!\d+)/)
      if (matches) {
        let id = Number(matches[0])
        let section = this.builder.sections.find(section => section.id === id)
        this.section = (section) ? { name: section.name, value: this.link } : null
      }
      this.action = { name: 'Scroll into section', value: 'scroll-into-section' }
      this.scrollBehavior = this.scrollBehaviors.find(({ value }) => value === this.behavior) || this.scrollBehaviors[0]
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setUrl (value = this.link) {
      this.elLink['href'] = value
    },

    changeTarget () {
      this.elLink['target'] = this.target === true ? '_blank' : '_self'
    },

    setVideoUrl () {
      let ytId = getYoutubeVideoIdFromUrl(this.videoId)

      if (ytId) {
        this.elLink['video'] = ytId
      }
    },

    changeAction () {
      if (this.action.value === '') {
        this.link = (this.link.includes('#section_')) ? '' : this.link
        this.setUrl(this.link)
      }

      if (this.action.value !== 'ptah-d-video') {
        this.classes.forEach((name, index) => {
          if (name.indexOf('ptah-d-video') > -1) {
            this.classes.splice(index, 1)
          }
        })
      } else {
        this.classes.push('ptah-d-video')
      }
    },

    changeScrollIntoSection ({ value }) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, {
          link: { href: value, target: '_self' }
        })
      )
    },

    changeScrollBehavior ({ value = 'auto' }) {
      this.elLink['behavior'] = this.scrollBehavior
    }
  }
}
</script>

<template>
  <div class="b-link-controls">

    <!-- action -->
    <div class="b-link-controls__control">
      <base-select label="Action" :options="actionList" v-model="action" @input="changeAction(action)"></base-select>
    </div>

    <!-- scroll into section -->
    <div v-if="action.value === 'scroll-into-section' && sections.length > 0" class="b-link-controls__control">
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
        label="Scroll behavior"/>
    </div>

    <div class="b-link-controls__no-sections" v-if="action.value === 'scroll-into-section' && sections.length === 0">
      No more sections
    </div>

    <!-- open link -->
    <div class="b-link-controls__control" v-if="action.value === ''">
      <base-text-field v-model="link" label="URL" @input="setUrl" placeholder="Type link here"></base-text-field>
    </div>
    <div class="b-link-controls__control" v-if="action.value === ''">
      <BaseSwitcher v-model="target" label="Open in new window" @change="changeTarget" />
    </div>

    <!-- video popup -->
    <div class="b-link-controls__control" v-if="action.value === 'ptah-d-video'">
      <base-text-field v-model="videoId" label="Video" @input="setVideoUrl" placeholder="Youtube video url"></base-text-field>
    </div>

  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-link-controls
  &__control
    margin-top: $size-step/1.45
  &__no-sections
    padding: $size-step
    text-align: center
    color: $grey
</style>
