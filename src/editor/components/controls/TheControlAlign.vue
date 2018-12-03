<script>
export default {
  props: {
    isBox: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    flex: {
      left: ['justify-content', 'flex-start'],
      center: ['justify-content', 'center'],
      right: ['justify-content', 'flex-end']
    },
    text: {
      left: ['text-align', 'left'],
      center: ['text-align', 'center'],
      right: ['text-align', 'right']
    },
    align: {
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
    }
  }),
  methods: {
    aligned () {
      if (this.isBox) {
        this.$emit('boxAligned', this.flex[this.align.value])
      } else {
        this.$emit('textAligned', this.text[this.align.value])
      }
    }
  }
}
</script>

<template>
  <BaseButtonTabs :list="align.list" v-model="align.value" @change="aligned"/>
</template>
