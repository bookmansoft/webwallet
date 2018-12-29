<template>
  <div>
    <tabbar v-model="tabIndex">
      <tabbar-item :link="item.link" :badge="item.badge" :show-dot="item.showDot" v-for="(item,index) in items" :key="index">
        <img slot="icon" :src="item.icon">
        <img slot="icon-active" :src="item.iconActive">
        <span slot="label" style="font-size:13px;">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
import { create } from 'domain';
const getTabItems = () => [
    { icon:'static/images/icon3/home1.png', iconActive: 'static/images/icon3/home3.png', label:'首页', showDot: false, link:'/home', badge:''},
    { icon:'static/images/icon3/market1.png', iconActive: 'static/images/icon3/market3.png', label:'集市', showDot: false, link:'/market', badge:''},
    { icon:'static/images/icon3/crowd1.png', iconActive: 'static/images/icon3/crowd3.png', label:'众筹', showDot: false, link:'/crowd', badge:''},
    { icon:'static/images/icon3/mine1.png', iconActive: 'static/images/icon3/mine3.png', label:'我的', showDot: false, link:'/mine', badge:''}
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