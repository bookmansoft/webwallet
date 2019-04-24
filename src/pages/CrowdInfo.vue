<template>
  <div>
      <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
      <div class="crowd-car">
        <img :src="crowdItem.pic" class="img-top">
        <div style="background-color: white">
            <div style="padding-left:10px;">
                <p><span style="font-size:16px;font-weight:610;">{{crowdItem.cname}}</span></p>
                <br/>
                <p><span style="font-size:13px; color:#888;">{{crowdItem.title}}</span></p>
            </div>

            <flexbox style="height:40px;line-height:40px;">
              <flexbox-item :span="7">
                  <div class="flex-left">
                    <span style="color:coral; font-size:16px;">￥{{crowdItem.price}}/份</span>
                  </div>
              </flexbox-item>
              <flexbox-item :span="5">
                <div class="flex-right" >
                    <span style="font-size:15px; color:#888;">剩余{{crowdItem.remainder/100}}份</span>
                </div>
              </flexbox-item>
            </flexbox>
        </div>
      </div>
      <group style="">
        <flexbox style="height:40px;line-height:40px;">
            <flexbox-item :span="6">
                <div class="flex-left">
                <span style="color:#888; font-size:14px;">状态： </span>
                <span style="color:green; font-size:15px;">众筹中</span>
                </div>
            </flexbox-item>
            <flexbox-item :span="6">
            <div class="flex-right" >
                <span style="color:#888; font-size:14px;">剩余时间： </span>
                <span >15天</span>
            </div>
            </flexbox-item>
        </flexbox> 
        <flexbox>
            <flexbox-item :span="4" class="flex-center"><p>{{crowdItem.totality/100}}</p><p><span style="font-size:12px; color:#888;">上架个数</span></p></flexbox-item>
            <flexbox-item :span="3" class="flex-center"><p>{{crowdItem.remainder/100}}</p><p><span style="font-size:12px; color:#888;">剩余数量</span></p></flexbox-item>
            <flexbox-item  class="flex-center"><p>199</p><p><span style="font-size:12px; color:#888;">参与人数</span></p></flexbox-item>
        </flexbox>
        <div style="background-color: white; padding: 20px;">
            <div class="crowd-info">
                <p>什么是代练宝宝？</p>
                <br/>
                <p>代练宝宝是游戏厂商公开出售的道具，拥有代练宝宝的玩家，可以持续获得来自游戏内的游戏金收入，拥有的代练宝宝越多，获得的游戏金收益也越多。游戏金可用于游戏内购买道具或赠送给他人。</p>
                <br/>
                <p>代练宝宝能出售吗？</p>
                <br/>
                <p>代练宝宝仅能以游戏金形式在自由市场出售，出售价格由卖方自行设置。出售后原拥有者将不再享受游戏金收入，已获得的收入不变，新的持有者将获得之后的游戏金收入。</p>
            </div>
        </div>

      </group>
      <box gap="10px 10px">
          <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="crowdOrder()">立即购买</x-button>
      </box>
  </div>
  
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XButton, Tab, XHeader, TabItem, Flexbox, FlexboxItem, Group, Divider, Box} from 'vux'
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
    Navs, Tab, XHeader, XButton, TabItem, Flexbox, FlexboxItem, Group, Divider, Box
  },
  data () {
    return {
      msg: '众筹',
      headerTitle: '众筹详情',
      tabIndex: 0,
      crowdItem: null
    }
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'Crowd'})
    },
    onItemClick(index) {
      console.log(this.tabIndex)
    },
    crowdDetail(item, index) {

    },
    crowdOrder() {
      this.$router.push({ name: 'CrowdOrder', params: { item: this.crowdItem }})
    },
    userToken() {
        if(this.GLOBAL.uid == 0) {
            return
        }
        let data = {func:'UserToken', control: 'cp', oemInfo: this.GLOBAL.oemInfo,
            uid: this.GLOBAL.userBase.uid,
            account: this.GLOBAL.userBase.uid, 
            user_id: this.GLOBAL.userBase.uid,
            cid: this.crowdItem.cid
        }
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            //console.log(res.data)
            this.cpAddr = res.data.ret.data.addr
            console.log('cpAddr', this.cpAddr)
        });
    },
  },
  created() {
    this.crowdItem = this.$route.params.item
    this.userToken()
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
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 30px;
}
.flex-center {
  text-align: center;
  padding: 5px;
}
</style>
