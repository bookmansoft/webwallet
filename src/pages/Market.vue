<template>
  <div>
    <!--
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
      </tab-item>
    </tab>
    <div v-if="tabIndex==0">
      <PropSales></PropSales>
    </div>
    <div v-else>
      <Contract></Contract>
    </div>
    -->
    <PropSales></PropSales>
    <navs></navs>
  </div>
</template>
<script>
import { Tab, TabItem} from 'vux'
import Navs from '@/components/Navs.vue'
import PropSales from '@/components/PropSales.vue'
import Contract from '@/components/Contract.vue'

const tabList = () => [
  {
    label:'道具交易'
  },{
    label:'比特币交易'
  }]

export default {
  components: {
    Tab,
    TabItem,
    Navs,
    Contract,
    PropSales
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
  }
}
</script>