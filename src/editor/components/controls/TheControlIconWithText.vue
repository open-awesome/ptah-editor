<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

const LIST_ICONS = [
  'checkMark',
  'close',
  'plus'
]

export default {
  name: 'ControlTextWithIcon',

  components: {
    VuseIcon
  },

  data () {
    return {
      iconName: {}
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    icon () {
      return this.settingObjectOptions.icon
    },

    icons () {
      const options = LIST_ICONS.map((icon) => {
        return { name: icon, value: icon }
      })
      return {
        options
      }
    }
  },

  methods: {
    visibleIcon () {
      this.icon.visible = !this.icon.visible
    },
    changeIcon () {
      this.icon.name = this.iconName.value
      this.icon.value = this.iconName.value
    }
  },

  mounted () {
    this.iconName = this.icon
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <base-select label="Icon" :options="icons.options" :value="iconName" v-model="iconName" @input="changeIcon"></base-select>
    </div>
    <div class="b-text-controls__control">
      <div>Visible icon</div>
      <div class="b-icon-with-text">
        <div class="b-icon-with-text__item"
             :class="{ 'b-icon-with-text__item_opacity' : false === icon.visible }"
             @click="visibleIcon"
        >

            <span class="b-icon-with-text__item-eye"
                  title="Show / Hide"
            >
              <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
            </span>

          <span>
              Visible
            </span>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__control
    margin-top: 2.2rem
.b-icon-with-text
  margin: 0.8rem 0
  &__item
    color: #4D7DD8
    fill: #4D7DD8
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: #000
      fill: #000
    &-eye
      border: none
      background: transparent
      padding: 0 0.5rem
      display: inline-block
      fill: inherit

</style>
