<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    repeat: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      bgColor: '',
      bgImage: '',
      bgRepeat: '',
      list: [
        { text: 'Tile', value: 'no-repeat' },
        { text: 'Fill', value: 'repeat' }
      ]
    }
  },

  created () {
    this.bgColor = this.color ? this.color : ''
    let image = this.image
    this.bgImage = image.length > 0 ? image.match(/url\(.+(?=\))/g).map(url => url.replace(/url\(/, ''))[0] : ''
    this.bgRepeat = this.repeat === 'no-repeat' ? this.list[0] : this.list[1]
  },

  methods: {
    changeColor () {
      const color = Object.values(this.bgColor.rgba).toString()
      this.$emit('change', ['background-color', `rgba(${color})`])
    },

    changeImage () {
      this.$emit('change', ['background-image', `url(${this.bgImage})`])
    },

    changeRepeat () {
      this.$emit('change', ['background-repeat', this.bgRepeat])
    }
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-bg-controls__header" @click="controlOpen = !controlOpen">
      <span>Background</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
      <div class="b-bg-controls__control">
        <base-color-picker label="Background color" v-model="bgColor" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-bg-controls__control">
        <base-upload-input v-model="bgImage" @upload="changeImage" label="Background image" placeholder="Image Url"></base-upload-input>
      </div>
      <div class="b-bg-controls__control">
        <BaseButtonTabs :list="list" v-model="bgRepeat" @change="changeRepeat"/>
      </div>
    </base-dropdown>
  </div>
</template>

<style lang="sass" scoped>
  .b-bg-controls
    &__header
      font-size: 1.6rem
      height: 3.2rem
      color: #272727
      display: flex
      align-items: center
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__control
      margin-top: 2.2rem
</style>
