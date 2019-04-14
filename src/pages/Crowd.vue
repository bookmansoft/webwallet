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
                    <p><span>199人支持</span></p>
                  </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right" >
                    <p><span>还剩11份</span></p>
                </div>
              </flexbox-item>
            </flexbox>

      </div>

      <div v-for="(item, index) in crowdItems" :key="index" class="crowdItem">
            <flexbox @click.native="crowdDetail(item, index)">
              <flexbox-item :span="2.5" style="padding:0.3rem;">
                <div class="flex-demo-left">
                  <img :src="item.src" class="img-game-list" />
                </div></flexbox-item>
              <flexbox-item>
                <div style="padding-left:6px;">
                  <p><span style="font-size:15px;">{{item.title}}</span></p>
                  <p><span style="color: coral; font-size:14px;">{{item.desc}}</span></p>
                  <p>
                    <flexbox>
                    <flexbox-item :span="8"><p><span style="color: #888; font-size:13px;">{{item.support}}</span></p></flexbox-item>
                    <flexbox-item :span="4"><p><span style="color: #888; font-size:13px;">{{item.remainder}}</span></p></flexbox-item>
                    </flexbox>
                  </p>
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

const crowdList = () => [
  {
    src: 'static/img/crowd/item1.jpg',
    title: 'Forza Horizon 3',
    desc: '￥ 25元起售',
    support: '60人支持',
    remainder: '剩余13天'
  },{
    src: 'static/img/crowd/item2.jpg',
    title: 'Forza Horizon 3',
    desc: '￥ 47元起售',
    support: '52人支持',
    remainder: '剩余8天'
  },{
    src: 'static/img/crowd/item3.jpg',
    title: 'Forza Horizon 3',
    desc: '￥ 47元起售',
    support: '139人支持',
    remainder: '剩余5天'
  }
]
export default {
  components: {
    Navs, Tab, XButton, TabItem, Flexbox, FlexboxItem
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
      this.$router.push({ name: 'CrowdInfo', params: {  }})
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

.crowdItem p {
  height: 30px;
  line-height: 30px;
}
.crowd-car {
  padding: 10px; 
  /*background-color: white; */ 
  /*border-radius: 4%;*/
}

.img-game-list {
    width: 75px;
    height: 75px;
    border-radius: 12%;
    margin-left: 3px;
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
