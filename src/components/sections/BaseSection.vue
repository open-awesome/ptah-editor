<script>
import * as types from '@editor/types'
import Draggable from 'vuedraggable'

export default {
  name: 'BaseSection',
  components: {
    Draggable
  },
  group: 'sections',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: []
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
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container"
            :style="$sectionData.container.styles"
            >
            <elements-list @addEl="onAddElement"></elements-list>
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-if="$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  :target="$sectionData.components[index].element.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="$sectionData.components[index].element.classes"
                  >
                </component>
                <component
                  v-if="!$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
                  v-html="$sectionData.components[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  :target="$sectionData.components[index].element.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="$sectionData.components[index].element.classes"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.b-sandbox
  height: 100%
  min-height: 20rem
  justify-content: center
  align-items: center
  flex-direction: column
</style>
