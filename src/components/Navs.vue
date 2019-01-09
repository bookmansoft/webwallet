<template>
  <div>
    <tabbar v-model="tabIndex">
      <tabbar-item :link="item.link" :badge="item.badge" :show-dot="item.showDot" v-for="(item,index) in items" :key="index">
        <img slot="icon" :src="item.icon">
        <img slot="icon-active" :src="item.iconActive">
        <span slot="label" style="font-size:13px;font-weight:620;">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
import { create } from 'domain';
const getTabItems = () => [
    { icon:'static/img/icon/home_no_select.png', iconActive: 'static/img/icon/home_select.png', label:'首页', showDot: false, link:'/home', badge:''},
    { icon:'static/img/icon/market_no_select.png', iconActive: 'static/img/icon/market_select.png', label:'集市', showDot: false, link:'/market', badge:''},
    { icon:'static/img/icon/crowd_no_select.png', iconActive: 'static/img/icon/crowd_select.png', label:'众筹', showDot: false, link:'/crowd', badge:''},
    { icon:'static/img/icon/mine_no_select.png', iconActive: 'static/img/icon/mine_select.png', label:'我的', showDot: false, link:'/mine', badge:''}
]

export default {
  name: 'navs',
  data() {
    return {
      items: getTabItems(),
      tabIndex: 0
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  created() {
    console.log('this.$route.path', this.$route.path)
    this.items.forEach( (item, index) => {
      if(item.link == this.$route.path) {
        this.tabIndex = index 
      }
    });
  }
}
</script>