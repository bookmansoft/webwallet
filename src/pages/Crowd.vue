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
                    <span style="font-size:17px;font-weight:590;">进击的兵长</span>
                  </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right">
                    <p style="margin:0 auto; overflow:hidden; display:block; height:40px;line-height:40px;">
                      <img src="static/img/crowd/hot.png" style="width:18px; heigth:18px;" />
                      <span style="font-size: 15px; color:green;">众筹中</span>
                    </p>
                </div>
              </flexbox-item>
            </flexbox>

            <flexbox style="height:40px;line-height:40px;">
              <flexbox-item :span="8">
                  <div class="flex-left">
                    <span style="color:coral; font-size:16px;">￥10.00 起售</span>
                  </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right" >
                    <x-button mini :gradients="['#FF5E3A', '#FF9500']" >立即支持</x-button>
                </div>
              </flexbox-item>
            </flexbox>

            <flexbox style="height:30px;line-height:30px; color:#888; font-size:14px;">
              <flexbox-item :span="8">
                  <div class="flex-left">
                    199人支持
                  </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right" >
                    还剩11份
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
import { XButton, Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
import Navs from '@/components/Navs.vue'

const tabList = () => [
  {
    label:'众筹大厅'
  },{
    label:'自由市场'
}]

export default {
  components: {
    Navs, Tab, XButton, TabItem, Flexbox, FlexboxItem
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
  height:180px;
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
