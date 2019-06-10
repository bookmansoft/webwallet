<template>
  <div class="weui-progress">
    <div class="weui-progress__bar">
      <div class="weui-progress__inner-bar" :style="{width: percent + '%'}"></div>
    </div>
    <a href="javascript:;" class="weui-progress_opr" v-show="showCancel">
      <i class="weui-icon-cancel" @click="cancel"></i>
    </a>
  </div>
</template>

<script>
import Base from '../../node_modules/vux/src/libs/base'

export default {
  name: 'XXProgress',
  mixins: [Base],
  props: {
    percent: {
      type: Number,
      default: 0
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cancel () {
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
// @import '../../node_modules/vux/src/styles/weui/widget/weui_progress/weui_progress';
@import '../../src/style/vux_styles/weui/widget/weui_progress/weui_progress';
</style>
