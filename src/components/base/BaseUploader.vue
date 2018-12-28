<template>
<div :id="`uploader-${ _uid }`" class="b-uploader">

  <base-label v-if="label" v-text="label" class="b-uploader__label"/>

    <draggable
        v-model="items"
        :options="{ draggable: '.draggable' }"
        class="b-uploader__container">

      <base-uploader-item
          v-for="(item, index) in items"
          :key="`b-uploader-item-${ _uid }-${ index }`"
          :item="item"
          @replace="replaceFile($event, index)"
          @remove="removeFile(index)"
          class="draggable"/>

      <base-uploader-item
        v-if="hasAddMore"
        :multiple="multiple"
        @add="addFile"/>

    </draggable>

</div>
</template>

<script>
import Draggable from 'vuedraggable'
import BaseUploaderItem from './BaseUploaderItem'
import { cloneDeep } from 'lodash-es'

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

  watch: {
    items (value) {
      this.$emit('change', value)
    }
  },

  created () {
    let items = (Array.isArray(this.value)) ? this.value : [this.value]
    this.items = cloneDeep(items)
  },

  methods: {
    addFile (file) {
      this.items.push(file)
    },

    replaceFile (newFile, index) {
      this.items = this.items.map((item, i) => (i === index) ? newFile : item)
    },

    removeFile (index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-uploader
  max-width: 25rem
  margin: .5rem 0

  &__container
    display: flex
    flex-wrap: wrap

    border: .1rem dashed $gray-dark
    border-radius: .4rem
</style>
