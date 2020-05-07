<template>
  <div class="b-elements is-editable">
    <aside class="b-elements__list ptah-control">
      <ul>
        <li
          v-for="(el, name) in elSrc"
          :key="name"
          @click.prevent="addEl(name)"
          class="b-elements__button"
        >
          <div class="b-elements__icon">
            <icon-base :name="el.ico" width="24px" />
          </div>
          <div class="b-elements__title">
            <div class="b-elements__title--name">
              {{el.name}}
            </div>
            <div class="b-elements__title--description">
              {{el.descr}}
            </div>
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import Seeder from '@editor/seeder'
import * as _ from 'lodash-es'
import { mapActions, mapState } from 'vuex'
import { randomPoneId, elemtentList } from '@editor/util'
import VueScrollTo from 'vue-scrollto'

export default {
  name: 'ElementsList',
  data () {
    return {
      showList: false,
      elements: {},
      elSrc: {
        button: {
          name: 'Button',
          descr: this.$t('el.buttonDescr'),
          ico: 'elButton',
          width: 20
        },
        text: {
          name: 'Text',
          descr: this.$t('el.textDescr'),
          ico: 'elText',
          width: 15
        },
        pic: {
          name: 'Image',
          descr: this.$t('el.imageDescr'),
          ico: 'elImage',
          width: 18
        },
        delimiter: {
          name: 'Spacer',
          descr: this.$t('el.spacerDescr'),
          ico: 'elSpacer',
          width: 20
        },
        platforms: {
          name: 'Platforms',
          descr: this.$t('el.platformsDescr'),
          ico: 'elPlatforms',
          width: 22
        },
        restrictions: {
          name: 'Age restriction',
          descr: this.$t('el.ageDescr'),
          ico: 'elAge',
          width: 20
        },
        social: {
          name: 'Social networks',
          descr: this.$t('el.socialDescr'),
          ico: 'elSocial',
          width: 17
        },
        icontext: {
          name: 'Icon & text',
          descr: this.$t('el.icontextDescr'),
          ico: 'elIconText',
          width: 19
        },
        video: {
          name: 'Video',
          descr: this.$t('el.videoDescr'),
          ico: 'elVideo',
          width: 18
        },
        timer: {
          name: 'Timer',
          descr: this.$t('el.timerDescr'),
          ico: 'elTimer',
          width: 16
        },
        iframe: {
          name: 'Iframe',
          descr: this.$t('el.iframeDescr'),
          ico: 'frame',
          width: 18
        }
      }
    }
  },

  computed: {
    ...mapState(['currentLanding']),
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'sandbox']
    ),

    colors () {
      return this.currentLanding.settings.colors
    },

    components: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.components, value)
      },
      get () {
        return this.settingObjectSection.get(this.sandbox.components) || []
      }
    }
  },

  created () {
    this.elements = elemtentList()
    this.elements = Seeder.seed(this.elements)
  },
  methods: {
    ...mapActions(['activateCheckListItem']),
    ...mapActions('Sidebar', ['clearSettingObjectLight', 'setControlPanel']),

    addElement (element) {
      this.activateCheckListItem('element')
      element.element.removable = true
      element.key = randomPoneId()
      this.components = [...this.components, element]

      this.$nextTick(() => {
        this.selectElement()
      })
    },

    selectElement () {
      let idSection = this.settingObjectSection.id
      let section = document.getElementById(`section_${idSection}`)
      let nameArray = this.sandbox.components.split('.')[1]
      let el = section.querySelector(`[path="${nameArray}[${this.components.length - 1}].element"]`)
      let resize = el.querySelector(`.resizable.vdr`)

      if (resize) {
        el = resize
      }

      el.id = `section${idSection}${nameArray}${this.components.length - 1}`
      this.clickOnElement(el)
    },

    scrollTo (element) {
      let options = {
        container: '.b-builder-layout-content__main .vb-content',
        duration: 500,
        easing: 'ease',
        offset: -80,
        force: true,
        cancelable: true,
        onStart: false,
        onDone: false,
        onCancel: false,
        x: false,
        y: true
      }

      VueScrollTo.scrollTo(`#${element.getAttribute('id')}`, 500, options)
    },

    clickOnElement (el) {
      let machineEvent = new Event('mousedown', { bubbles: true })
      el.dispatchEvent(machineEvent)

      this.scrollTo(el)
    },

    addEl (name) {
      const el = _.merge({}, Seeder.seed(this.elements[name]), {
        element: {
          styles: this.fillColors(name)
        }
      })
      this.addElement(el)
    },

    hideList () {
      this.setControlPanel(false)
      document.removeEventListener('click', this.hideList, true)
    },

    fillColors (name) {
      let colors = {}

      if ((name === 'text' || name === 'icontext') && this.colors.text !== '') {
        colors.color = this.colors.text
      }

      if (name === 'button') {
        if (this.colors.button) {
          colors['background-color'] = this.colors.button
        }

        if (this.colors.buttonText) {
          colors['color'] = this.colors.buttonText
        }
      }

      return colors
    }
  }
}
</script>

<style lang="sass">
.b-elements
  &__list
    ul
      margin: 0
      padding: 0
      list-style: none

  &__button
    display: flex
    align-items: center
    justify-content: flex-start

    background: transparent

    padding: .6rem 2.5rem .6rem 2rem
    margin: .5rem 0
    width: 100%
    max-width: 27rem
    min-height: 5.5rem

    text-align: left
    box-sizing: border-box
    cursor: pointer
    svg
      fill: $grey-middle

    &:hover
      background-color: rgba($main-green, 0.25)
      svg
        fill: $dark-grey
      .b-elements__title--name,
      .b-elements__title--description
        color: #575A5F
  &__title
    padding-left: 2.4rem
    &--name
      font-size: 1.4rem
      line-height: 1.9rem
      letter-spacing: 0.065em
      color: #A2A5A5
      padding-bottom: .6rem
      text-transform: uppercase
      font-weight: 600

    &--description
      font-size: 1.1rem
      line-height: 1.4rem
      color: #A2A5A5

  &__icon
    width: 3.2rem
    height: 3.2rem

    display: flex
    justify-content: center
    align-items: center
  &__close
    color: $grey-middle
    position: absolute
    top: 18px
    right: 17px
    cursor: pointer
    &:hover
      color: $ligth-grey

</style>
