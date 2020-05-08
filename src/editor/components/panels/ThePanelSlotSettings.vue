<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Block
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding _pr-2">
            <div class="b-panel__control direction">
              <div class="b-panel__control">
                <base-caption>
                  Block settings
                </base-caption>

                <div class="b-panel__control">
                  <div class="b-panel__col">
                    <div class="b-panel__row _v-center">
                      <base-label>
                        Direction
                      </base-label>
                      <div class="b-panel__col">
                        <ul>
                          <li
                            :class="{ active: isRowDir }"
                            @click="changeDirection('row')"
                          >
                            <icon-base name="groupRow"/>
                          </li>
                          <li
                            :class="{ active: isColumnDir }"
                            @click="changeDirection('column')"
                          >
                            <icon-base name="groupColumn"/>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="b-panel__col">
                <div class="b-panel__control">
                  <div class="b-panel__row _v-center" v-show="isRowDir">
                    <base-label>
                      Position
                    </base-label>

                    <div class="b-panel__col">
                      <ul>
                        <li
                          :class="{ active: align === 'flex-start' }"
                          @click="changeAlign('flex-start')"
                        >
                          <icon-base name="groupToTop"/>
                        </li>
                        <li
                          :class="{ active: align === 'flex-end' }"
                          @click="changeAlign('flex-end')"
                        >
                          <icon-base name="groupToBottom"/>
                        </li>
                        <li
                          :class="{ active: align === 'center' }"
                          @click="changeAlign('center')"
                        >
                          <icon-base name="groupToVerticalCenter"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="b-panel__control">
                  <div class="b-panel__row _v-center" v-show="isRowDir">
                    <base-label>
                      Content
                    </base-label>
                    <div class="b-panel__col">
                      <ul>
                        <li
                          :class="{ active: justify === 'flex-start' }"
                          @click="changeJustify('flex-start')"
                        >
                          <icon-base name="groupLeft"/>
                        </li>

                        <li
                          :class="{ active: justify === 'flex-end' }"
                          @click="changeJustify('flex-end')"
                        >
                          <icon-base name="groupRight"/>
                        </li>

                        <li
                          :class="{ active: justify === 'center' }"
                          @click="changeJustify('center')"
                        >
                          <icon-base name="groupCenterHorizontal"/>
                        </li>

                        <li
                          :class="{ active: justify === 'space-between' }"
                          @click="changeJustify('space-between')"
                        >
                          <icon-base name="groupSpaceBetween"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="b-panel__control">
                  <div class="b-panel__row _v-center" v-show="isColumnDir">
                    <base-label>
                      Position
                    </base-label>
                    <div class="b-panel__col">
                      <ul>
                        <li
                          :class="{ active: align === 'flex-start' }"
                          @click="changeAlign('flex-start')"
                        >
                          <icon-base name="groupLeft"/>
                        </li>
                        <li
                          :class="{ active: align === 'center' }"
                          @click="changeAlign('center')"
                        >
                          <icon-base name="groupCenterHorizontal"/>
                        </li>
                        <li
                          :class="{ active: align === 'flex-end' }"
                          @click="changeAlign('flex-end')"
                        >
                          <icon-base name="groupRight"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="b-panel__control">
                  <div class="b-panel__row _v-center" v-show="isColumnDir">
                    <base-label>
                      Content
                    </base-label>
                    <div class="b-panel__col">
                      <ul>
                        <li
                          :class="{ active: justify === 'flex-start' }"
                          @click="changeJustify('flex-start')"
                        >
                          <icon-base name="groupTop"/>
                        </li>
                        <li
                          :class="{ active: justify === 'center' }"
                          @click="changeJustify('center')"
                        >
                          <icon-base name="groupCenterVertical"/>
                        </li>
                        <li
                          :class="{ active: justify === 'flex-end' }"
                          @click="changeJustify('flex-end')"
                        >
                          <icon-base name="groupBottom"/>
                        </li>
                        <li
                          :class="{ active: justify === 'space-between' }"
                          @click="changeJustify('space-between')"
                        >
                          <icon-base class="b-groupSpaceBetween" name="groupSpaceBetween"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="b-panel__control" v-if="settingObjectOptions.width && !isMobile">
                  <control-slot-width />
                </div>
              </div> <!-- /_b-panel__control-->
            </div><!-- /_direction-->

            <div class="b-panel__control">
              <control-box />
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as _ from 'lodash-es'
import ControlBox from '../controls/TheControlBox'
import ControlSlotWidth from '../controls/TheControlSlotWidth'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelSlotSettings',
  components: { IndicatorPlatform, ControlSlotWidth, ControlBox },
  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectSection',
      'settingObjectOptions',
      'device'
    ]),

    isMobile () {
      return this.device === 'is-mobile'
    },

    options () {
      return this.settingObjectOptions
    },

    title () {
      return this.options.sectionName || this.section.name
    },

    sectionElement () {
      return document.getElementById(`section_${this.section.id}`)
    },

    isRowDir () {
      return this.direction === 'row'
    },

    isColumnDir () {
      return this.direction === 'column'
    },

    slot () {
      return this.settingObjectSection.get(this.sandbox.container) || {}
    },

    styles () {
      return (this.settingObjectSection.get(this.sandbox.container) || {}).styles
    },

    mediaStyles () {
      let media = (this.settingObjectSection.get(this.sandbox.container) || {}).media

      if (media === undefined) {
        media = { 'is-mobile': {} }
      }
      return media
    },

    components: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.components, value)
      },
      get () {
        return this.settingObjectSection.get(this.sandbox.components) || []
      }
    },

    direction: {
      set (value) {
        this.update('flex-direction', value)
      },
      get () {
        return this.getPropValue('flex-direction')
      }
    },

    align: {
      set (value) {
        this.update('align-items', value)
      },
      get () {
        return this.getPropValue('align-items')
      }
    },

    justify: {
      set (value) {
        this.update('justify-content', value)
      },

      get () {
        return this.getPropValue('justify-content')
      }
    }
  },

  methods: {
    selectSlot (component, index) {
      try {
        let slotContainer = this.sectionElement.querySelector('.b-draggable-slot.active')
        if (slotContainer) {
          let slotElement = slotContainer.children[index].firstElementChild
          slotElement.click()
        }
      } catch (error) {
        console.error(error)
      }
    },

    changeDirection (value) {
      if (value === this.direction) {
        return
      }
      this.direction = value
    },

    changeAlign (value) {
      if (value === this.align) {
        return
      }
      this.align = value
    },

    changeJustify (value) {
      if (value === this.justify) {
        return
      }
      this.justify = value
    },

    update (prop, value) {
      let props = {}
      let styles = {}
      let media = {}
      let device = 'is-mobile'

      styles[prop] = value

      media[device] = {}
      media[device][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

      this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.slot, props))
    },

    getPropValue (prop) {
      let s = ''
      let device = 'is-mobile'

      if (this.isMobile && this.mediaStyles[device] && this.mediaStyles[device][prop]) {
        s = this.mediaStyles[device][prop]
      } else {
        s = this.styles[prop]
      }

      return s
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  .direction
    width: 100%
    border: none
    padding: 0 0 1.6rem 0
    overflow: hidden
    margin-bottom: .8rem

    ul
      width: 100%
      display: flex
      align-items: center
      list-style-type: none
      margin: 0
      padding: 0
      &:last-child
        border-bottom: none
      li
        width: 3.4rem
        height: 3.4rem

        display: flex
        justify-content: center
        align-items: center

        cursor: pointer
        color: #A2A5A5
        border-radius: 3px
        margin-left: .6rem
        background: #F3F6F6

        transition: background .3s linear
        &:hover,
        &.active
          background: $main-green
        &:hover
          color: #575A5F
        &.active
          color: #575A5F
          cursor: default

    /deep/
      .range-slider
        width: 10.5rem

.b-groupSpaceBetween
  transform: rotate(90deg)
</style>
