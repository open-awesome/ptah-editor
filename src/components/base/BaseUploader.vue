<template>
  <div class="b-uploader" :id="`uploader-${ _uid }`">
    <div class="b-uploader__row b-uploader__row_multiple" v-if="multiple">
      <draggable v-if="multiple" v-model="items" class="b-uploader__draggable">
        <base-uploader-item
          v-for="(item, index) in items"
          :key="`b-uploader-item-${ _uid }-${ index }`"
          :item="item"
          :type="type"
          @replace="replaceFile($event, index)"
          @remove="removeFile(index)"/>
      </draggable>
    </div>
    <div class="b-uploader__row b-uploader__row_add-multiple" v-if="multiple">
      <div class="b-uploader__preview">
        <base-uploader-item
          v-if="src"
          :src="src"
          :type="type"
          @replace="replaceSrc"
          @remove="removeSrc"
         />
        <base-uploader-item
          v-if="hasAddMore"
          :multiple="multiple"
          :type="type"
          @add="addFile"
        />
      </div>
      <div class="b-uploader__label" v-if="label && label !== ''">
        {{ label }}
      </div>
    </div>
    <div class="b-uploader__row" v-if="!multiple">
      <div class="b-uploader__preview">
        <base-uploader-item
          v-if="src"
          :src="src"
          :type="type"
          @replace="replaceSrc"
          @remove="removeSrc"
          />
        <base-uploader-item
          v-if="hasAddMore"
          :multiple="multiple"
          :type="type"
          @add="addFile"
          />
      </div>
      <div class="b-uploader__label" v-if="label && label !== ''">
        {{ label }}
      </div>
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
    let value = (this.value === 'null') ? null : this.value
    if (this.multiple) {
      let items = (Array.isArray(value)) ? value : [value]
      this.items = cloneDeep(items)
    } else {
      this.src = value
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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-uploader
  width: 100%
  &__draggable
    width: 100%
    margin-bottom: -.5rem
  &__row
    display: flex
    align-items: center

    width: 100%
    &_multiple
      flex-direction: column
    &_add-multiple
      margin-top: $size-step/4
  &__preview
    width: $size-step*1.5
    height: $size-step
  &__label
    color: $dark-grey
    margin-left: $size-step/2
    &:first-letter
      text-transform: uppercase
</style>
