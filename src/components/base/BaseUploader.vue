<template>
<div :id="`uploader-${ _uid }`" class="b-uploader">

  <base-label v-if="label" v-text="label" class="b-uploader__label"/>

  <div class="b-uploader__container">

    <draggable v-model="items">
      <base-uploader-item
        v-for="(item, index) in items"
        :key="`b-uploader-item-${ _uid }-${ index }`"
        :item="item"/>
    </draggable>

    <base-uploader-item
        v-if="hasAddMore"
        :multiple="multiple"
        @add="addFile"/>

  </div>

</div>
</template>

<script>
import Draggable from 'vuedraggable'
import BaseUploaderItem from './BaseUploaderItem'

export default {
  name: 'BaseUploader',

  components: { Draggable, BaseUploaderItem },

  props: {
    value: [Array, String],
    label: String,
    multiple: Boolean
  },

  data () {
    return {
      items: []
    }
  },

  computed: {
    hasAddMore () {
      return !this.items.length || this.multiple
    }
  },

  methods: {
    addFile () {

    }
  }
}
</script>

<style lang="sass" scoped>
.b-uploader
  margin: .5rem 0

  &__container
    display: flex
    flex-wrap: wrap

    border: .1rem dashed $gray-dark
    border-radius: .4rem
</style>
