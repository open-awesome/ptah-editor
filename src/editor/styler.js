import Styler from './components/VuseStyler.vue'
import { getTypeFromTagName, getTypeFromSchema } from './util'

function installStyler ({ builder, Vue }) {
  const StylerInstance = Vue.extend(Styler).extend({
    beforeCreate () {
      this.$builder = builder
    }
  })

  builder.styler = {
    inserted (el, binding, vnode) {
      const newNode = document.createElement('div')
      const section = vnode.context.$section
      const rootApp = vnode.context.$root.$el
      let name
      let type = false

      rootApp.appendChild(newNode)
      el.classList.add('is-editable')

      if (binding.arg === 'for' || binding.arg === 'galleryItem' || binding.arg === 'product') {
        name = binding.value.path
      } else {
        name = binding.expression
      }

      if (binding.value.type !== undefined) {
        type = binding.value.type
      }

      if (binding.value.el && binding.value.el.behavior) {
        el.dataset.behavior = binding.value.el.behavior || 'auto'
      }

      section.stylers.push(new StylerInstance({
        store: vnode.context.$store,
        propsData: {
          el,
          section: section,
          type: (binding.arg !== 'index' && binding.arg !== 'for' && binding.arg) || type || getTypeFromSchema(name, section.schema) || getTypeFromTagName(el.tagName),
          options: binding.arg === 'for' || binding.arg === 'galleryItem'|| binding.arg === 'product' || binding.arg === 'system' ? binding.value.el : binding.value,
          label: binding.value.label,
          name: name
        }
      }).$mount(newNode))
    },

    update (el, binding, vnode) {
      console.log(binding.value.el)
      if (binding.value.el && binding.value.el.behavior) {
        el.dataset.behavior = binding.value.el.behavior || 'auto'
      }
    }
  }
}

export default installStyler
