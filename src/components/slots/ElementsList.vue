<template>
  <div class="b-elements is-editable">
    <button class="b-elements__show-list ptah-control" @click="openList" :class="{'active': showList}">
      <icon-base name="plus"></icon-base>
    </button>
    <aside class="b-elements__list ptah-control" v-if="showList">
      <div class="b-elements__title">Add Item</div>
      <ul>
        <li><a href="#" @click.prevent="addButton" class="b-elements__button">Button</a></li>
        <li><a href="#" @click.prevent="addLink" class="b-elements__button">Link</a></li>
        <li><a href="#" @click.prevent="addTitle" class="b-elements__button">Title</a></li>
        <li><a href="#" @click.prevent="addText" class="b-elements__button">Text</a></li>
        <li><a href="#" @click.prevent="addImage" class="b-elements__button">Image</a></li>
        <li><a href="#" @click.prevent="addDelimiter" class="b-elements__button">Delimiter</a></li>
        <li><a href="#" @click.prevent="addLogo" class="b-elements__button">Logo</a></li>
        <li><a href="#" @click.prevent="addAvailable" class="b-elements__button">Available</a></li>
        <li><a href="#" @click.prevent="addRestrictions" class="b-elements__button">Age restrictions</a></li>
        <li><a href="#" @click.prevent="addSocial" class="b-elements__button">Social nets</a></li>
        <li><a href="#" @click.prevent="addSlogan" class="b-elements__button">Slogan</a></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import * as types from '@editor/types'
import Seeder from '@editor/seeder'
import * as _ from 'lodash-es'

export default {
  name: 'ElementsList',
  data: () => ({
    showList: false,
    elements: [
      {
        name: 'Button',
        element: types.Button,
        type: 'button'
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button'
      },
      {
        name: 'Title',
        element: types.Title,
        type: 'text'
      },
      {
        name: 'Description',
        element: types.Text,
        type: 'text'
      },
      {
        name: 'Pic',
        element: types.Image,
        type: 'image'
      },
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image'
      },
      {
        name: 'Delimiter',
        element: types.Delimiter,
        type: 'delimiter'
      },
      {
        name: 'AvailablePlatforms',
        element: types.AvailablePlatforms,
        type: 'available'
      },
      {
        name: 'AgeRestrictions',
        element: types.AgeRestrictions,
        type: 'restrictions'
      },
      {
        name: 'SocialNetworks',
        element: types.SocialNetworks,
        type: 'networks'
      },
      {
        name: 'Slogan',
        element: types.Slogan,
        type: 'slogan'
      }
    ]
  }),
  created () {
    this.elements = Seeder.seed(this.elements)
  },
  methods: {
    addButton () {
      const el = _.merge({}, Seeder.seed(this.elements[0]))
      this.$emit('addEl', el)
    },
    addLink () {
      const el = _.merge({}, Seeder.seed(this.elements[1]))
      this.$emit('addEl', el)
    },
    addTitle () {
      const el = _.merge({}, Seeder.seed(this.elements[2]))
      this.$emit('addEl', el)
    },
    addText () {
      const el = _.merge({ text: 'Reloaded is a multiplayer game, free-to-play first-person shooter' }, Seeder.seed(this.elements[3]))
      this.$emit('addEl', el)
    },
    addImage () {
      const el = _.merge({}, Seeder.seed(this.elements[4]))
      this.$emit('addEl', el)
    },
    addLogo () {
      const el = _.merge({}, Seeder.seed(this.elements[5]))
      this.$emit('addEl', el)
    },
    addDelimiter () {
      const el = _.merge({}, Seeder.seed(this.elements[6]))
      this.$emit('addEl', el)
    },
    addAvailable () {
      const el = _.merge({}, Seeder.seed(this.elements[7]))
      this.$emit('addEl', el)
    },
    addRestrictions () {
      const el = _.merge({}, Seeder.seed(this.elements[8]))
      this.$emit('addEl', el)
    },
    addSocial () {
      const el = _.merge({}, Seeder.seed(this.elements[9]))
      this.$emit('addEl', el)
    },
    addSlogan () {
      const el = _.merge({}, Seeder.seed(this.elements[10]))
      this.$emit('addEl', el)
    },
    openList () {
      this.showList = true
      document.addEventListener('click', this.hideList, true)
    },
    hideList () {
      this.showList = false
      document.removeEventListener('click', this.hideList, true)
    }
  }
}
</script>

<style lang="sass">
.b-elements
  position: absolute
  top: 0
  right: 0
  opacity: .3
  &:hover
    opacity: 1
  &__show-list
    border: none
    background: $color-gray
    width: $slot-step
    height: $slot-step
    display: flex
    justify-content: center
    align-items: center
    padding: 0.5rem
    cursor: pointer
    color: $color-dark-100
    &:hover, &.active
      background: #fff
      color: $king-blue-300
    img
      width: 2rem
      height: 2rem
  &__list
    width: 18rem
    position: absolute
    z-index: 20
    right: 7.3rem
    top: -2.2rem
    background: #fff
    color: $color-dark-100
    padding: 1.6rem
    ul
      margin: 0
      padding: 0
      list-style: none
    li
      padding-bottom: 0.5rem
  &__title
    padding: .9rem 0 0rem 1.6rem
    font-weight: bold
    line-height: 4.3rem
    font-size: 1.8rem
    letter-spacing: 0.02em
    text-align: left
    position: relative
    &:after
      content: ''
      display: block
      position: absolute
      width: 2.4rem
      height: 2.4rem
      transform: rotate(45deg)
      top: 1.9rem
      right: -2.8rem
      background: #fff
  &__button
    display: block
    background: transparent
    color: $color-dark-100
    border-radius: 0.4rem
    padding: 0.8rem 1.6rem
    width: 100%
    text-decoration: none
    font-size: 1.4rem
    line-height: 1
    letter-spacing: -0.02em
    text-align: left
    &:hover
      background: rgba(67, 111, 238, 0.15)
</style>
