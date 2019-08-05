<!-- 我玩过的游戏，疑未实现
-->
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <no-data src="/static/img/default/no-mygame.png"></no-data>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import NoData from '@/components/NoData.vue'

export default {
  components: {
    XHeader, NoData
  },
  data () {
    return {
      headerTitle: '我的游戏',
      items: []
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
