<!-- 游戏分类页面
1. 数据接口 gameCategory: 获取服务端类别配置表
-->
<template>
  <div>
    <grid :show-lr-borders="false" :show-vertical-dividers="true" :cols="3" style="top:5px;">
      <grid-item v-for="(item, index) in gameCategory" :key="index" :label="item.label" @on-item-click="onItemClick(item)">
        <img slot="icon" :src="item.icon">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vux'

export default {
  name: 'GameSort',
  components: {
    Grid,
    GridItem
  },
  data () {
    return {
      gameCategory: [],
    }
  },
  methods: {
      onItemClick(item) {
        console.log(item)
      }
  },
  created() {
    this.GLOBAL.ConfigMgr.get('gameCategory', (err, config)=>{
      if(!err) {
        this.gameCategory = config;
      }
    });
  },
}
</script>
<style scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
</style>