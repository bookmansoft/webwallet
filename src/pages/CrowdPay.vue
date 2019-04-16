<template>
  <div>
    <msg :icon="icon" >
        <template slot="description">
            <p><span v-text="title"></span></p>
        </template>
        <template slot="buttons">
            <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="backToInfo"><span style="font-size:15px;">查看我的代练宝宝</span></x-button>
            <x-button @click.native="backToInfo"><span style="font-size:15px;">返回众筹列表</span></x-button>
        </template>
    </msg>
  </div>
</template>

<script>
import { Msg, Divider, XButton } from 'vux'
//import { setTimeout } from 'timers';

export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  data () {
    return {
      title: '代练宝宝正在发往至您的账户，请注意查收',
      description: 'msg description',
      icon: '',
      order: null,
      tradeId: '',
      wePay: false,
      payTimeCount: 0,
      isDestroy: false,
      showLoading: false,
      btnLabel: '确定',
      btnDisabled: true,
      buttons: [{
        type: 'default',
        text: '查看我的代练宝宝',
        link: '/crowd/info'
      }, {
        type: 'default',
        text: '返回众筹列表',
        link: '/crowd/info'
      }]
    }
  },
  methods: {

    btnClick() {
      this.$router.go(-1)
    },

    backToInfo() {
        this.$router.push({ name: 'Crowd', params: {  }})
    }
  },

  beforeDestroy() {
    this.isDestroy = true
    console.log('beforeDestroy')
  },
  destroyed() {
    this.isDestroy = true
    console.log('destroyed')
  },
  created() {
    console.log('created')

  }
}
</script>