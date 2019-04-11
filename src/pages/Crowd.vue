<template>
  <div>
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
      </tab-item>
    </tab>
    <div v-if="tabIndex==0">
      <div class="crowd-car">
        <img src="static/img/crowd/binzan.jpg" class="img-top">
            <flexbox>
              <flexbox-item :span="8">
                  <div class="flex-left">
                    <span style="font-size:15px;font-weight:700;">进击的兵长</span>
                  </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right">
                    <span>d</span>
                </div>
              </flexbox-item>
            </flexbox>
      </div>
    </div>
    <div v-else>

    </div>
    <navs></navs>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
import Navs from '@/components/Navs.vue'

const tabList = () => [
  {
    label:'众筹大厅'
  },{
    label:'自由市场'
}]

export default {
  components: {
    Navs, Tab, TabItem, Flexbox, FlexboxItem
  },
  data () {
    return {
      msg: '众筹',
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

<style scoped>
.crowd-car {
  padding: 10px; 
  /*background-color: white; */ 
  /*border-radius: 4%;*/
}
.img-top {
  width:100%;
  height:160px;
  /*border-radius: 4%;*/
  border-top-left-radius:1.5em; 
  border-top-right-radius:1.5em; 
}
.imgDemo {
  width: 100%;
  height: auto;
}
.flex-left {
  text-align: left;
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
</style>
