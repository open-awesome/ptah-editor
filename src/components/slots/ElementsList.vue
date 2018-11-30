<template>
  <div class="b-elements is-editable">
    <button class="b-elements__show-list ptah-control" @click="openList" :class="{'active': showList}">
      <img src="https://gn423.cdn.stg.gamenet.ru/0/79nas/o_1mRf76.svg" alt="">
    </button>
    <aside class="b-elements__list ptah-control" v-if="showList">
      <ul>
        <li><a href="#" @click.prevent="addButton" class="b-elements__button">Add button</a></li>
        <li><a href="#" @click.prevent="addTitle" class="b-elements__button">Add title</a></li>
        <li><a href="#" @click.prevent="addText" class="b-elements__button">Add text</a></li>
        <li><a href="#" @click.prevent="addImage" class="b-elements__button">Add image</a></li>
        <li><a href="#" @click.prevent="addDelimiter" class="b-elements__button">Add delimiter</a></li>
        <li><a href="#" @click.prevent="addLogo" class="b-elements__button">Add logo</a></li>
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
        element: types.StyleObject,
        type: 'section'
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
    addTitle () {
      const el = _.merge({}, Seeder.seed(this.elements[1]))
      this.$emit('addEl', el)
    },
    addText () {
      const el = _.merge({ text: 'Reloaded is a multiplayer game, free-to-play first-person shooter' }, Seeder.seed(this.elements[2]))
      this.$emit('addEl', el)
    },
    addImage () {
      const el = _.merge({}, Seeder.seed(this.elements[3]))
      this.$emit('addEl', el)
    },
    addLogo () {
      const el = _.merge({}, Seeder.seed(this.elements[4]))
      this.$emit('addEl', el)
    },
    addDelimiter () {
      const el = _.merge({}, Seeder.seed(this.elements[5]))
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
  top: 3rem
  right: 0
  &__show-list
    border: none
    background: lighten($color-form-text, 20%)
    width: 3rem
    height: 3rem
    display: flex
    justify-content: center
    align-items: center
    padding: 0.5rem
    cursor: pointer
    &:hover, &.active
      background: $color-form-text
    img
      width: 2rem
      height: 2rem
  &__list
    width: 11rem
    position: absolute
    z-index: 20
    right: 3rem
    top: 0px
    background: $color-form-text
    color: #fff
    padding: 1rem 1rem 0
    border-radius: 0.4rem 0 0.4rem 0.4rem
    ul
      margin: 0
      padding: 0
      list-style: none
    li
      padding-bottom: 0.5rem
  &__button
    display: block
    background: $dark
    color: white
    border-radius: 0.4rem
    padding: 0.8rem 0.5rem
    width: 100%
    text-decoration: none
</style>
