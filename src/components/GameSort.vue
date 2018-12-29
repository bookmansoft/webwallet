<template>
  <div>
    <group-title>游戏类别</group-title>
    <grid :show-lr-borders="false" :show-vertical-dividers="true" :cols="3">
      <grid-item v-for="(item, index) in gameCategeroys" :key="index" :label="item.label" @on-item-click="onItemClick(item)">
        <img slot="icon" :src="item.icon">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem, GroupTitle } from 'vux'
//益智，消除，休闲，棋牌，射击
const getGameSorts = () => [{
  label: '益智',
  tag: 'yizhi',
  index: 0,
  icon: 'static/images/icon2/g0.png'
}, {
  label: '消除',
  tag: 'xiaochu',
  index: 1,
  icon: 'static/images/icon2/g1.png'
},{
  label: '休闲',
  tag: 'xiuxian',
  index: 2,
  icon: 'static/images/icon2/g2.png'
},{
  label: '棋牌',
  tag: 'qipai',
  index: 3,
  icon: 'static/images/icon2/g3.png'
},{
  label: '射击',
  tag: 'sheji',
  index: 4,
  icon: 'static/images/icon2/g4.png'
},{
  label: '角色',
  tag: 'juese',
  index: 5,
  icon: 'static/images/icon2/g5.png'
},{
  label: '竞技',
  tag: 'jingji',
  index: 6,
  icon: 'static/images/icon2/g6.png'
},{
  label: '动作',
  tag: 'dongzuo',
  index: 7,
  icon: 'static/images/icon2/g7.png'
},{
  label: '小游戏',
  tag: 'xiaoyouxi',
  index: 8,
  icon: 'static/images/icon2/g8.png'
}]

export default {
  name: 'GameSort',
  components: {
    Grid,
    GridItem,
    GroupTitle
  },
  data () {
    return {
      gameCategeroys: getGameSorts()
    }
  },
  methods: {
      onItemClick(item) {
        console.log(item)
      }
  }
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