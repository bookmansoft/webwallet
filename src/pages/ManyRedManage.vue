<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">我领取的</tab-item>
      <tab-item @on-item-click="onItemClick">我发出的</tab-item>
    </tab>
  </div>
</template>
<script>
import { Tab, TabItem} from 'vux'


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

  },
  data () {
    return {
      tabIndex: 0,
      tabItems: tabList()
    }
  },
  methods: {
    onItemClick(index) {
      this.tabIndex=index;
      
      alert(this.tabIndex);
    }
  }
}
</script>