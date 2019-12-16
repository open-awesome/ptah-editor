<script>
import * as types from '@editor/types'
import merge from 'lodash-es/merge'
import Seeder from '@editor/seeder'
import defaults from '../mixins/defaults'
import sectionMedia from '../mixins/sectionMedia'

export default {
  /**
   * Имя, группа которой принадлежит секция, ее обложка и короткое описание
   * Эта информация будет отображаться в левой панели редактора
   */
  name: 'SampleSection',
  group: 'Elements',
  cover: '',
  description: 'Description for section',

  /**
   * Миксины необходимые для работы секции
   */
  mixins: [defaults, sectionMedia],

  /**
   * Схема секции
   * mainStyle - объект описывающий секцию
   * container - объект описывающий слот внутри секции
   * components - массив элементов внутри слота
   *
   * В данном примере секция содержит 1 слот внутри которого расположен заголов - элемент с типом 'text'
   * Актуальный список элементов можно найти в компоненте src/components/slots/ElementsList.vue
   *
   * дефолтные значения для всех частей схемы заданы в Seeder
   *
   * после того как будет создан экземеляр секции, эти данные будут доступны в $sectionData
   */
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: [
      {
        name: 'TextElement',
        element: types.Text,
        type: 'text',
        class: 'b-title',
        label: 'title'
      }
    ]
  },

  created () {
    /**
     * Описываем кастомные стили для секции
     */
    const SCHEMA_CUSTOM = {
      mainStyle: {
        styles: {
          'background-color': '#000'
        }
      },
      components: merge({}, [
        {
          element: {
            text: '<p><b>Section title</b></p>',
            styles: {
              'font-family': 'Montserrat',
              'font-size': '4rem',
              'color': 'white'
            },
            media: {
              'is-mobile': {
                'font-size': '3rem'
              }
            }
          }
        }
      ]),
      container: {
        width: 9 // ширина слота внутри секции (задана в колонках, принимает значения от 1 до 12)
      },
      edited: true // этот флаг необходим
    }

    /**
     * Стилизуем все компоненты секции
     */
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    /**
     * Внутри компонента доступны следующие свойства:
     *
     * $section - экземпляр класса src/editor/section.js описывающий этот компонент
     * $builder - экземплер класса в который добавляются все секции лендинга
     * $sectionData - Is a computed property that mirrors $section.data which contains the current
     * values (text, images, etc...) for the section.
     */
  }
}
</script>

<template>
  <!--
    Для того, чтобы можно было отредкатировать стили и настройки секций и элементов используется
    директива v-styler в которую необходимо передать путь до редактируемого элемента
   -->
  <section
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <!-- menu, video, overlay - небходимы для правильной работы настроек и стилей -->
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <!--
            Компонент <sandbox> описывает "слот", внутри которого будут находиться элементы.
            В данной секции изначально будет только 1 текстовый элемент.
            Sandbox принимает 2 параметра - путь до контейнера и компонентов описанные в схеме ($scheme).
           -->
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            class="b-sandbox">

            <!-- <draggable> нужен для работы перетаскивания внутри слота -->
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <!--
                перечисляем элементы и выводим их с помощью мета-компонента <component>
                для корректной работы в него нужно передать все параметры и директиву v-styler описанные ниже
               -->
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                   v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                   :is="component.name"
                   :href="$sectionData.components[index].element.link.href"
                   :target="$sectionData.components[index].element.link.target"
                   :path="`components[${index}].element`"
                   :style="$sectionData.components[index].element.styles"
                   :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
                  <div v-html="$sectionData.components[index].element.text"></div>
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
  @import '../../assets/sass/section-media'
</style>
