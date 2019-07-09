<template>
  <div class="b-base-uploader" :id="`uploader-${ _uid }`">
    <div class="b-base-uploader__row b-base-uploader__row_multiple" v-if="multiple">
      <draggable v-if="multiple" v-model="items" class="b-base-uploader__draggable">
        <base-uploader-item-new
          v-for="(item, index) in items"
          :key="`b-base-uploader-item-${ _uid }-${ index }`"
          :item="item"
          :type="type"
          :label="labelUploader"
          @replace="replaceFile($event, index)"
          @remove="removeFile(index)"
          @labelProgress="labelChange"
          />
      </draggable>
    </div>
    <div class="b-base-uploader__row b-base-uploader__row_add-multiple" v-if="multiple">
      <div class="b-base-uploader__preview">
        <base-uploader-item-new
          v-if="src"
          :src="src"
          :type="type"
          :label="labelUploader"
          @replace="replaceSrc"
          @remove="removeSrc"
          @labelProgress="labelChange"
         />
        <base-uploader-item-new
          v-if="hasAddMore"
          :multiple="multiple"
          :type="type"
          :label="labelUploader"
          @add="addFile"
          @labelProgress="labelChange"
        />
      </div>
    </div>
    <div class="b-base-uploader__row" v-if="!multiple">
      <div class="b-base-uploader__preview">
        <base-uploader-item-new
          v-if="src"
          :src="src"
          :type="type"
          :label="labelUploader"
          @replace="replaceSrc"
          @remove="removeSrc"
          @labelProgress="labelChange"
          />
        <base-uploader-item-new
          v-if="hasAddMore"
          :multiple="multiple"
          :type="type"
          :label="labelUploader"
          @add="addFile"
          @labelProgress="labelChange"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash-es'

const VALID_TYPES = ['image', 'video']

export default {
  name: 'BaseUploader',

  components: { Draggable },

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
      items: [],
      labelUploader: ''
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
    this.labelUploader = this.label
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
    },

    labelChange (newLabel) {
      newLabel !== '' ? this.labelUploader = newLabel : this.labelUploader = this.label
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-base-uploader
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
    width: 100%
    // width: $size-step*1.5
    // height: $size-step
  &__label
    color: $dark-grey
    margin-left: $size-step/2
    white-space: nowrap
    &:first-letter
      text-transform: uppercase
</style>
