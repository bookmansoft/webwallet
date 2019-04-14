<template>
  <div>
      <div style="background-color: #f5f5f9; padding: 12px;">
          <div style="background-color: white; padding: 15px;">
            <flexbox>
                <flexbox-item :span="3" class="flex-left">
                    <img src="static/img/crowd/gift.png" style="width:80px; height:80px" />
                </flexbox-item>
                <flexbox-item :span="9" class="flex-left">
                    <p><span style="font-size:17px;">进击的兵长 代练宝宝</span></p>
                    <br/>
                    <p><span style="color:coral; font-size:16px;">￥10.00</span></p>
                </flexbox-item>
            </flexbox>
            <br/>
            <flexbox>
                <flexbox-item :span="5" class="flex-left">
                    <p><span style="font-size:17px;">购买数量</span></p>
                </flexbox-item>
                <flexbox-item class="flex-right">
                    <p><inline-x-number width="50px"></inline-x-number></p>
                </flexbox-item>
            </flexbox>
          </div>
      </div>
      <div style="background-color: #f5f5f9; padding: 0px 12px 0px 12px">
          <div style="background-color: white; padding: 15px;">
          </div>
      </div>

  </div>
  
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XButton, Tab, TabItem, Flexbox, FlexboxItem, Group, Divider, Box, InlineXNumber } from 'vux'
import Navs from '@/components/Navs.vue'

export default {
  components: {
    Navs, Tab, XButton, TabItem, Flexbox, FlexboxItem, Group, Divider, Box, InlineXNumber 
  },
  data () {
    return {
      msg: '众筹',
      tabIndex: 0,
      tabItems: tabList(),
      crowdItems: crowdList()
    }
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex)
    },
    crowdDetail(item, index) {

    }
  }
}
</script>

<style scoped>
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowd-info {
  padding: 15px;
  background-color: #f5f5f9; 
  border-radius: 4%;
  font-size: 14px;
}

.img-game-list {
    width: 75px;
    height: 75px;
    border-radius: 12%;
    margin-left: 3px;
}

.img-top {
  width:100%;
  height:220px;
  /*border-radius: 4%;*/
  /*border-top-left-radius:1.5em;*/ 
  /*border-top-right-radius:1.5em; */
}
.imgDemo {
  width: 100%;
  height: auto;
}
.flex-left {
  text-align: left;
  padding-left: 10px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
.flex-center {
  text-align: center;
  padding: 5px;
}
</style>
