<template>
<figure class="b-uploader-item">

  <figcaption class="b-uploader-item__caption">

    <template v-if="item">
      <base-button
          v-text="'Replace'"
          size="middle"
          color="orange"
          class="b-uploader-item__button b-uploader-item__button--link"/>
      <base-button
          v-text="'Remove'"
          size="middle"
          color="orange"
          class="b-uploader-item__button b-uploader-item__button--link"/>
    </template>

    <label v-else>
      <span
          class="
            b-pth-base-button
            b-pth-base-button_orange
            b-pth-base-button_middle
            b-uploader-item__button
            b-uploader-item__button--span
          ">
        Add file
      </span>
      <input
          :multiple="multiple"
          @change="addFiles($event.target.files)"
          type="file"
          hidden>
    </label>

  </figcaption>

</figure>
</template>

<script>
export default {
  name: 'BaseUploaderItem',

  props: {
    item: Object,
    multiple: Boolean
  },

  methods: {
    async addFiles (files) {
      if (!files.length) {
        return
      }

      files = [...files]

      for (let i = 0, len = files.length; i < len; i += 1) {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-uploader-item
  display: inline-flex
  align-items: center

  width: 12rem
  height: 10rem
  margin: .5rem

  background-color: $white
  border: .1rem solid $gray-dark
  border-radius: .4rem

  &:not(:last-child)
    margin-right: 0

  &__caption
    display: inline-flex
    flex-wrap: wrap

  &__button
    &--link
      background-color: transparent
      color: $black
      text-decoration: underline
    &--span
      display: inline-block
      text-align: center
      line-height: 2.4
    &:not(:last-of-type)
      margin-bottom: 0
</style>
