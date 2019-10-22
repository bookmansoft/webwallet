<!-- 集市
PropSales   道具交易市场
Stocks      凭证交易市场
Contract    游戏金交易市场
-->
<template>
  <div>
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
      </tab-item>
    </tab>
    <div v-if="tabIndex==0">
      <PropSales></PropSales>
    </div>
    <div v-else-if="tabIndex==1">
      <Stocks></Stocks>
    </div>
    <div v-else>
      <Contract></Contract>
    </div>
    <Nav></Nav>
  </div>
</template>
<script>
import { Tab, TabItem} from 'vux'
import Nav from '@/components/Nav.vue'
import PropSales from '@/components/PropSales.vue'
import Contract from '@/components/Contract.vue'
import Stocks from '@/pages/Stocks.vue'

const tabList = () => [
  {
    label:'道具交易'
  }
  ,{
    label:'凭证交易'
  }
  ,{
    label:'游戏金交易'
  }
]

export default {
  components: {
    Tab,
    TabItem,
    Nav,
    Contract,
    PropSales,
    Stocks,
  },
  data () {
    return {
      tabIndex: 0,
      tabItems: tabList()
    }
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex)
    }
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    }
  },
}
</script>