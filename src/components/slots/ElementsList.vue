<template>
  <div class="b-elements is-editable">
    <aside class="b-elements__list ptah-control">
      <div class="b-elements__header">
        {{ $t('c.elementsLibrary') }}
        <div class="b-elements__close" @click="hideList">
          <icon-base name="close" width="14" height="14"/>
        </div>
      </div>
      <ul>
        <li v-for="(el, name) in elSrc" :key="name" @click.prevent="addEl(name)" class="b-elements__button">
          <div class="b-elements__icon">
            <icon-base :name="el.ico" :width="el.width" />
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
          name: 'Available platforms',
          descr: this.$t('el.platformsDescr'),
          ico: 'elPlatforms',
          width: 22
        },
        restrictions: {
          name: 'Age restrictions',
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
          name: 'Icon with text',
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
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'sandbox']
    ),

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
      const el = _.merge({}, Seeder.seed(this.elements[name]))
      this.addElement(el)
    },

    hideList () {
      this.setControlPanel(false)
      document.removeEventListener('click', this.hideList, true)
    }
  }
}
</script>

<style lang="sass">
.b-elements
  &__show-list
    border: none
    background: #D8D8D8
    width: 3.5rem
    height: 3.5rem
    display: flex
    justify-content: center
    align-items: center
    padding: 0.5rem
    margin-top: .1rem
    cursor: pointer
    color: #474747

    &:hover, &.active
      background: #fff
      color: #355CCC

    img
      width: 2rem
      height: 2rem
  &__list
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    background: $white
    overflow: auto
    overflow-x: hidden
    z-index: 20
    ul
      margin: 0
      padding: 0
      list-style: none
  &__header
    padding: 1.7rem 3.1rem
    color: $black
    font-weight: normal
    font-size: 2rem
    line-height: 2.4rem
    letter-spacing: -0.02em
    text-align: left
    position: relative

  &__button
    display: flex
    background: transparent
    padding: .3rem 3rem 0 2rem
    width: 100%
    height: 6.6rem
    text-align: left
    box-sizing: border-box
    cursor: pointer
    svg
      fill: $grey-middle

    &:hover
      background-color: rgba(116, 169, 230, 0.25)
      svg
        fill: $dark-grey
  &__title
    &--name
      font-size: 1.6rem
      line-height: 1.9rem
      letter-spacing: -0.02em
      color: #4F4F4F
      padding-bottom: .6rem

    &--description
      font-size: 1.4rem
      line-height: 1.7rem
      color: $grey-middle

  &__icon
    width: 4.6rem
    display: flex
    justify-content: center
    flex-shrink: 0
    padding-top: .5rem

  &__close
    color: $grey-middle
    position: absolute
    top: 18px
    right: 17px
    cursor: pointer
    &:hover
      color: $ligth-grey

</style>
