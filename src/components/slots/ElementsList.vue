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

export default {
  name: 'ElementsList',
  data: () => ({
    showList: false,
    elements: {},
    elSrc: {
      button: {
        name: 'Button',
        descr: 'Standard clickable button',
        ico: ''
      },
      text: {
        name: 'Text',
        descr: 'Editable text block',
        ico: ''
      },
      pic: {
        name: 'Image',
        descr: 'Insert image here',
        ico: ''
      },
      spacer: {
        name: 'Spacer',
        descr: 'Custom spacer between page elements',
        ico: ''
      },
      platforms: {
        name: 'Available platforms',
        descr: 'List of supported game platforms',
        ico: ''
      },
      restrictions: {
        name: 'Age restrictions',
        descr: 'Verify your customers age',
        ico: ''
      },
      social: {
        name: 'Social networks',
        descr: 'Add graphical links to a social media',
        ico: ''
      },
      icontext: {
        name: 'Icon with text',
        descr: 'Check marked feature list',
        ico: ''
      },
      video: {
        name: 'Video',
        descr: 'Embedded window for a Youtube video',
        ico: ''
      },
      timer: {
        name: 'Timer',
        descr: 'Countdown to release setup',
        ico: ''
      }
    }
  }),

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
    ...mapActions('Sidebar', ['clearSettingObjectLight', 'setControlPanel']),

    addElement (element) {
      if (this.settingObjectSection.data.mainStyle.isTextEdit && element.type === 'text') {
        element.type = 'inline'
      }

      element.element.removable = true
      element.key = randomPoneId()
      this.components = [...this.components, element]
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
    padding: .3b-top-bar-menu__crumbs-linrem 3rem 0
    width: 100%
    height: 6.6rem
    text-align: left
    box-sizing: border-box
    cursor: pointer

    &:hover
      background-color: rgba(116, 169, 230, 0.25)
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

  &__close
    color: $grey-middle
    position: absolute
    top: 18px
    right: 17px
    cursor: pointer
    &:hover
      color: $ligth-grey

</style>
