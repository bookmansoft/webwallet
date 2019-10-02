<!-- 钱包首页
-->
<template>
  <div>
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
      </tab-item>
    </tab>
    <div v-if="tabIndex==0">
      <games></games>
    </div>
    <div v-else>
      <GameSort></GameSort>
    </div>
    <nav></nav>
  </div>
</template>
<script>
import { Tab, TabItem} from 'vux'
import Nav from '@/components/Nav.vue'
import Games from '@/components/Games.vue'
import GameSort from '@/components/GameSort.vue'

const tabList = () => [
  {
    label:'游戏'
  },{
    label:'类别'
  }]

export default {
  components: {
    Tab,
    TabItem,
    Nav,
    Games,
    GameSort
  },
  data () {
    return {
      tabIndex: 0,
      tabItems: tabList()
    }
  },
  computed: {
    userBase() { return this.$store.state.user.auth; }
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex)
    }
  },
  created() {
    let urlParamPath = this.utils.getUrlKey('path') || this.$route.params.path;
    if(!this.userBase.uid) {
      this.$router.push({ name: 'Login', params: { path: urlParamPath, }});
    }
  },
}
</script>