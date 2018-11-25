<template>
  <div class="b-sandbox-page">
    <h1>A page for components preview and testing</h1>
    <hr>
    <h2>BaseDropdown <button @click="ddOpen = !ddOpen">toggle</button></h2>
    <div style="width: 246px;">
      <BaseDropdown :isOpened="ddOpen">
        <ul>
          <li>Section</li>
          <li>Gallery</li>
          <li>Cover</li>
          <li>Image</li>
          <li>Form</li>
        </ul>
      </BaseDropdown>
    </div>
    <hr>
    <h2>BaseLoading</h2>
    <BaseLoading/>
    <hr>

    <h2>BaseTimeout</h2>
    <BaseTimeout/>
    <hr>

    <h2>BaseButton</h2>
    <BaseButton
      :color="'black'"
      >
      Button
    </BaseButton>
    <BaseButton
      :color="'gray'"
      :transparent="true"
      >
      Button
    </BaseButton>
    <BaseButton
      :color="'light-gray'"
      :transparent="false"
      >
      Button
    </BaseButton>
    <hr>
    <h2>Icons</h2>
    <div class="b-icons">
      <icon-base name="alignLeft" color="red"></icon-base>
      <icon-base name="alignRight" color="green"></icon-base>
      <icon-base name="alignCenter" color="magenta"></icon-base>
      <icon-base name="arrowDropDown" width="6" color="black"></icon-base>
      <icon-base name="close"></icon-base>
      <icon-base name="colorFill"></icon-base>
      <icon-base name="drag"></icon-base>
      <icon-base name="equalizer"></icon-base>
      <icon-base name="fontBold"></icon-base>
      <icon-base name="fontFamily"></icon-base>
      <icon-base name="fontItalic"></icon-base>
      <icon-base name="fontSize"></icon-base>
      <icon-base name="fontUnderline"></icon-base>
      <icon-base name="menu"></icon-base>
      <icon-base name="platformDesktop"></icon-base>
      <icon-base name="platformLaptop"></icon-base>
      <icon-base name="platformMobile"></icon-base>
      <icon-base name="plus"></icon-base>
    </div>

    <hr>
    <h2>ButtonTabs</h2>

    Обычный
    <div style="margin: 10px; width: 300px;">
      <BaseButtonTabs :list="buttonTabs.text.list" v-model="buttonTabs.text.value"/>
    </div>
    Тут можно выбрать несколько:
    <div style="margin: 10px; width: 300px;">
      <BaseButtonTabs :list="buttonTabs.text.list" v-model="buttonTabs.text.valueMultiple"/>
    </div>
    С иконками
    <div style="margin: 10px; width: 200px;">
      <BaseButtonTabs :list="buttonTabs.icons.list" v-model="buttonTabs.icons.value"/>
    </div>
    С иконками и текстом (на будущее)
    <div style="margin: 10px; width: 300px;">
      <BaseButtonTabs :list="buttonTabs.iconsWithText.list" v-model="buttonTabs.iconsWithText.value"/>
    </div>
    <hr>

    <h2>BaseTextField</h2>
    <div style="display: flex;">
      <base-text-field v-model="textFieldValue">
        <span slot="label">Text field</span>
      </base-text-field>
      <base-text-field v-model="textFieldValue" :hasError="true">
        <span slot="label">Error text field</span>
        <span slot="error">
          Error text
        </span>
      </base-text-field>
      <base-text-field :value="textFieldValue" :disabled="true">
        <span slot="label">Disabled text field</span>
      </base-text-field>
    </div>

    <hr>
    <h2>BaseRangeSlider</h2>
    <div style="width: 300px">
      <base-range-slider v-model="rangeSliderValue" step="10">
        {{rangeSliderValue}} %
      </base-range-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sandbox',

  data () {
    return {
      ddOpen: true,

      textFieldValue: 'Some entered text',
      
      rangeSliderValue: 50,

      buttonTabs: {
        text: {
          list: [
            {
              text: 'Hello',
              value: 'hello'
            },
            {
              text: 'Bye',
              value: 'bye'
            },
            {
              text: 'Ok',
              value: 'ok'
            }
          ],
          value: '',
          valueMultiple: []
        },

        icons: {
          list: [
            {
              iconName: 'alignLeft',
              tooltipText: 'Align left',
              value: 'left'
            },
            {
              iconName: 'alignCenter',
              tooltipText: 'Align center',
              value: 'center'
            },
            {
              iconName: 'alignRight',
              tooltipText: 'Align right',
              value: 'right'
            }
          ],
          value: ''
        },

        iconsWithText: {
          list: [
            {
              iconName: 'fontBold',
              text: 'bold',
              value: 'left'
            },
            {
              iconName: 'fontFamily',
              text: 'font',
              value: 'center'
            },
            {
              iconName: 'fontItalic',
              text: 'italic',
              value: 'right'
            }
          ],
          value: ''
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-sandbox-page
  background: #fff
  padding: 2.5rem

.b-icons
  width: 70rem
  display: flex
  align-items: center
  justify-content: space-between
  margin: 1rem
</style>
