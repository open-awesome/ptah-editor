<template>
  <div class="b-elements is-editable">
    <aside class="b-elements__list ptah-control">
      <div class="b-elements__title">
        {{ $t('c.elementsLibrary') }}
        <div class="b-elements__close" @click="hideList">
          <icon-base name="close" width="12" height="12"/>
        </div>
      </div>
      <ul>
        <li><a href="#" @click.prevent="addEl('button')" class="b-elements__button">Button</a></li>
        <li><a href="#" @click.prevent="addEl('text')" class="b-elements__button">Text</a></li>
        <li><a href="#" @click.prevent="addEl('pic')" class="b-elements__button">Image</a></li>
        <li><a href="#" @click.prevent="addEl('delimiter')" class="b-elements__button">Delimiter</a></li>
        <li><a href="#" @click.prevent="addEl('logo')" class="b-elements__button">Logo</a></li>
        <li><a href="#" @click.prevent="addEl('platforms')" class="b-elements__button">Available platforms</a></li>
        <li><a href="#" @click.prevent="addEl('restrictions')" class="b-elements__button">Age restrictions</a></li>
        <li><a href="#" @click.prevent="addEl('social')" class="b-elements__button">Social networks</a></li>
        <!--li><a href="#" @click.prevent="addEl(9)" class="b-elements__button">Slogan</a></li-->
        <li><a href="#" @click.prevent="addEl('icontext')" class="b-elements__button">Icon with text</a></li>
        <li><a href="#" @click.prevent="addEl('video')" class="b-elements__button">Video</a></li>
        <li><a href="#" @click.prevent="addEl('timer')" class="b-elements__button">Timer</a></li>
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
    elements: {}
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
    padding: 1.7rem 3.1rem
    color: $white
    font-weight: normal
    font-size: 2rem
    line-height: 1.2
    letter-spacing: -0.02em
    text-align: left
    position: relative
  &__button
    display: block
    background: transparent
    color: $pigeon-blue
    padding: 1.4rem 3.2rem
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
    color: $grey
    position: absolute
    top: 18px
    right: 26px
    cursor: pointer
    &:hover
      color: $dark-blue-krayola

</style>
