<script>
import * as types from '@editor/types'

export default {
  name: 'BaseSection',
  group: 'sections',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: [
      {
        name: 'Button',
        element: types.Button,
        type: 'button'
      },
      {
        name: 'Title',
        element: types.Text,
        type: 'text'
      }
    ]
  },
  props: {
    id: {
      type: Number, required: true
    }
  },
  methods: {
    onAddElement (element) {
      element.element.removable = true
      this.$section.data.components.push(element)
    }
  }
}
</script>

<template>
  <section
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
    >
    <sandbox
      ref="sandbox"
      path="$sectionData.container"
      v-styler:section="$sectionData.container"
      :style="$sectionData.container.styles"
      >
      <elements-list @addEl="onAddElement"></elements-list>
      <component v-for="(component, index) in $sectionData.components"
        v-if="$sectionData.components.length !== 0"
        :is="component.name"
        :key="index"
        :href="$sectionData.components[index].element.href"
        v-html="$sectionData.components[index].element.text"
        :style="$sectionData.components[index].element.styles"
        :class="$sectionData.components[index].element.classes"
        v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
        >
      </component>
    </sandbox>
  </section>
</template>

<style lang="sass">
.b-sandbox
  height: 100%
  min-height: 20rem
  justify-content: center
  align-items: center
  flex-direction: column
</style>
