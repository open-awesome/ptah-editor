<template>
  <div class="b-elements is-editable">
    <aside class="b-elements__list ptah-control">
      <div class="b-elements__title">
        {{ $t('c.elementsLibrary') }}

        <div class="b-elements__close" @click="hideList">
          <icon-base name="close" width="12" height="12" fill="#C4C4C4"></icon-base>
        </div>
      </div>
      <ul>
        <li><a href="#" @click.prevent="addButton" class="b-elements__button">Button</a></li>
        <li><a href="#" @click.prevent="addLink" class="b-elements__button">Link</a></li>
        <li><a href="#" @click.prevent="addTitle" class="b-elements__button">Title</a></li>
        <li><a href="#" @click.prevent="addText" class="b-elements__button">Description</a></li>
        <li><a href="#" @click.prevent="addImage" class="b-elements__button">Pic</a></li>
        <li><a href="#" @click.prevent="addDelimiter" class="b-elements__button">Delimiter</a></li>
        <li><a href="#" @click.prevent="addLogo" class="b-elements__button">Logo</a></li>
        <li><a href="#" @click.prevent="addAvailable" class="b-elements__button">Available platforms</a></li>
        <li><a href="#" @click.prevent="addRestrictions" class="b-elements__button">Age restrictions</a></li>
        <li><a href="#" @click.prevent="addSocial" class="b-elements__button">Social networks</a></li>
        <li><a href="#" @click.prevent="addSlogan" class="b-elements__button">Slogan</a></li>
        <li><a href="#" @click.prevent="addCost" class="b-elements__button">Cost</a></li>
        <li><a href="#" @click.prevent="addTextWithIcon" class="b-elements__button">Icon with text</a></li>
        <li><a href="#" @click.prevent="addVideo" class="b-elements__button">Video</a></li>
        <li><a href="#" @click.prevent="addTimer" class="b-elements__button">Timer</a></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import * as types from '@editor/types'
import Seeder from '@editor/seeder'
import * as _ from 'lodash-es'
import { mapActions, mapState } from 'vuex'
import { randomPoneId } from '@editor/util'

export default {
  name: 'ElementsList',
  data: () => ({
    showList: false,
    elements: [
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        label: 'button',
        maxWidth: 480
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        label: 'link'
      },
      {
        name: 'TextElement',
        element: types.Title,
        type: 'text',
        label: 'title'
      },
      {
        name: 'TextElement',
        element: types.Text,
        type: 'text',
        label: 'description'
      },
      {
        name: 'Pic',
        element: types.Image,
        type: 'image',
        label: 'pic'
      },
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        label: 'logo'
      },
      {
        name: 'Delimiter',
        element: types.Delimiter,
        type: 'delimiter',
        label: 'delimiter'
      },
      {
        name: 'AvailablePlatforms',
        element: types.AvailablePlatforms,
        type: 'available',
        label: 'available platforms'
      },
      {
        name: 'AgeRestrictions',
        element: types.AgeRestrictions,
        type: 'restrictions',
        label: 'age restrictions'
      },
      {
        name: 'SocialNetworks',
        element: types.SocialNetworks,
        type: 'networks',
        label: 'social networks'
      },
      {
        name: 'Slogan',
        element: types.Slogan,
        type: 'slogan',
        label: 'slogan'
      },
      {
        name: 'Cost',
        element: types.Cost,
        type: 'text',
        label: 'cost'
      },
      {
        name: 'IconWithText',
        element: types.IconWithText,
        type: 'icon',
        label: 'icon with text'
      },
      {
        name: 'VideoElement',
        element: types.VideoElement,
        type: 'video',
        label: 'video'
      },
      {
        name: 'Timer',
        element: types.Timer,
        type: 'timer',
        label: 'timer'
      }
    ]
  }),

  computed: {
    ...mapState('Sidebar', ['settingObjectOptions', 'settingObjectSection', 'sandbox']),

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
    this.elements = Seeder.seed(this.elements)
  },
  methods: {
    ...mapActions('Sidebar', ['clearSettingObjectLight', 'setControlPanel']),

    addElement (element) {
      element.element.removable = true
      element.key = randomPoneId()
      this.components = [...this.components, element]
    },

    addButton () {
      const el = _.merge({}, Seeder.seed(this.elements[0]))
      this.addElement(el)
    },
    addLink () {
      const el = _.merge({}, Seeder.seed(this.elements[1]))
      this.addElement(el)
    },
    addTitle () {
      const el = _.merge({}, Seeder.seed(this.elements[2]))
      this.addElement(el)
    },
    addText () {
      const el = _.merge({ text: 'Reloaded is a multiplayer game, free-to-play first-person shooter' }, Seeder.seed(this.elements[3]))
      this.addElement(el)
    },
    addImage () {
      const el = _.merge({}, Seeder.seed(this.elements[4]))
      this.addElement(el)
    },
    addLogo () {
      const el = _.merge({}, Seeder.seed(this.elements[5]))
      this.addElement(el)
    },
    addDelimiter () {
      const el = _.merge({}, Seeder.seed(this.elements[6]))
      this.addElement(el)
    },
    addAvailable () {
      const el = _.merge({}, Seeder.seed(this.elements[7]))
      this.addElement(el)
    },
    addRestrictions () {
      const el = _.merge({}, Seeder.seed(this.elements[8]))
      this.addElement(el)
    },
    addSocial () {
      const el = _.merge({}, Seeder.seed(this.elements[9]))
      this.addElement(el)
    },
    addSlogan () {
      const el = _.merge({}, Seeder.seed(this.elements[10]))
      this.addElement(el)
    },
    addCost () {
      const el = _.merge({}, Seeder.seed(this.elements[11]))
      this.addElement(el)
    },
    addTextWithIcon () {
      const el = _.merge({}, Seeder.seed(this.elements[12]))
      this.addElement(el)
    },
    addVideo () {
      this.$emit('addEl', _.merge({}, Seeder.seed(this.elements[13])))
    },
    addTimer () {
      this.$emit('addEl', _.merge({}, Seeder.seed(this.elements[14])))
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
    background: $dark-blue
    overflow: auto
    overflow-x: hidden
    z-index: 20
    ul
      margin: 0
      padding: 0
      list-style: none
    li
      padding: 0
  &__title
    padding: 2.5rem 0 3.2rem 2.5rem
    color: $white
    font-weight: normal
    font-size: 2rem
    letter-spacing: -0.02em
    text-align: left
    position: relative
  &__button
    display: block
    background: transparent
    color: $pigeon-blue
    padding: 1.4rem 2.6rem
    width: 100%
    text-decoration: none
    font-size: 1.4rem
    line-height: 1
    letter-spacing: -0.02em
    text-align: left
    &:hover
      background: $dark-blue-krayola
      color: $white
  &__close
    position: absolute
    right: 2.5rem
    top: 2.5rem
    cursor: pointer
</style>
