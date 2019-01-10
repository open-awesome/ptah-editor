<template>
<div :id="`uploader-${ _uid }`" class="b-uploader">

  <base-label v-if="label" v-text="label" class="b-uploader__label"/>

    <div class="b-uploader__container">

      <draggable v-if="multiple" v-model="items" class="b-uploader__draggable">
        <base-uploader-item
            v-for="(item, index) in items"
            :key="`b-uploader-item-${ _uid }-${ index }`"
            :item="item"
            :type="type"
            @replace="replaceFile($event, index)"
            @remove="removeFile(index)"/>
      </draggable>

      <base-uploader-item
          v-else-if="src"
          :src="src"
          :type="type"
          @replace="replaceSrc"
          @remove="removeSrc"/>

      <base-uploader-item
          v-if="hasAddMore"
          :multiple="multiple"
          :type="type"
          @add="addFile"/>

    </div>

</div>
</template>

<script>
import Draggable from 'vuedraggable'
import BaseUploaderItem from './BaseUploaderItem'
import { cloneDeep } from 'lodash-es'

const VALID_TYPES = ['image', 'video']

export default {
  name: 'BaseUploader',

  components: { Draggable, BaseUploaderItem },

  props: {
    value: [Array, String],
    label: String,
    multiple: Boolean,
    type: {
      type: String,
      default: VALID_TYPES[0],
      validator: value => VALID_TYPES.includes(value)
    }
  },

  data () {
    return {
      src: null,
      items: []
    }
  },

  computed: {
    hasAddMore () {
      if (this.multiple) {
        return true
      }
      return !this.src
    }
  },

  watch: {
    items (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },

    src (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },

  created () {
    if (this.multiple) {
      let items = (Array.isArray(this.value)) ? this.value : [this.value]
      this.items = cloneDeep(items)
    } else {
      this.src = this.value
    }
  },

  methods: {
    addFile (file) {
      if (this.multiple) {
        this.items.push(file)
      } else {
        this.src = file.path
      }
    },

    replaceFile (newFile, index) {
      this.items = this.items.map((item, i) => (i === index) ? newFile : item)
    },

    removeFile (index) {
      this.items.splice(index, 1)
    },

    replaceSrc ({ path }) {
      this.src = path
    },

    removeSrc () {
      this.src = null
    }
  }
}
</script>

<style lang="sass" scoped>
.b-uploader
  width: 100%
  max-width: 25rem
  margin: .5rem 0

  &__container
    display: flex
    flex-wrap: wrap

    border: .1rem dashed $gray-dark
    border-radius: .4rem

  &__draggable
    width: 100%
    margin-bottom: -.5rem
</style>
