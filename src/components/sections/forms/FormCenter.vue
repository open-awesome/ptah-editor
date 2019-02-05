<script>
import * as types from '@editor/types'
// import * as _ from 'lodash-es'
// import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

const COMPONENTS = [
  {
    name: 'Title',
    element: types.Title,
    type: 'title',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
  },
  {
    name: 'Form',
    element: types.Form,
    type: 'form',
    label: 'form'
  }
]

const GROUP_NAME = 'Forms'
const NAME = 'FormCenter'

export default {
  name: NAME,

  components: {
    Draggable
  },

  cover: '/img/covers/hero-unit.png',

  group: GROUP_NAME,

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
  }
}
</script>

<template>
  <div></div>
</template>

<style lang="sass" scoped>

</style>
