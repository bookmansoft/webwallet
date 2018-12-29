<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <balance></balance>
    <group style="margin-top: 8px;">
        <grid :show-lr-borders="false" :show-vertical-dividers="true" :cols="2">
        <grid-item v-for="(item, index) in items" :key="index" :label="item.label" @on-item-click="onItemClick(item)" :link="item.link">
            <img slot="icon" :src="item.icon">
        </grid-item>
        </grid>
    </group>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, Grid, GridItem, Group } from 'vux'

const getItems = () => [{
  label: '发送',
  tag: 'send',
  index: 0,
  icon: 'static/images/icon1/7.png',
  link: '/wallet/send'
}, {
  label: '接收',
  tag: 'receive',
  index: 1,
  icon: 'static/images/icon1/1.png',
  link: '/wallet/receive'
},{
  label: '交易流水',
  tag: 'detail',
  index: 2,
  icon: 'static/images/icon1/3.png',
  link: '/wallet/detail'
},{
  label: '发布BTC交易对',
  tag: 'trans',
  index: 3,
  icon: 'static/images/icon1/5.png',
  link: '/wallet/trans'
}]

export default {
  components: {
    XHeader, Balance, Grid, GridItem, Group
  },
  data () {
    return {
      headerTitle: '我的钱包',
      items: getItems()
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },
      onItemClick() {

      }
  },
  created() {
     
  }
}
</script>
