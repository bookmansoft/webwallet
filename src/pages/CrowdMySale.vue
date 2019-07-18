<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group>
        <flexbox class="crowdItem">
            <flexbox-item :span="2.5" style="padding:0.3rem;">
                <div class="flex-demo-left">
                <img :src="crowdItem.src" class="img-game-list" />
                </div></flexbox-item>
            <flexbox-item>
                <div style="padding-left:6px;">
                <p><span style="font-size:15px;">{{crowdItem.title}}</span></p>
                <p><span style="color: coral; font-size:14px;">持有 {{crowdItem.quantity}} 个</span>
                </p>
                </div>
            </flexbox-item>
        </flexbox>
    </group>
    <group >
      <x-input title="出售数量" name="quantity" placeholder="请输入" v-model="quantity"></x-input>
    </group>
    <group >
      <x-input title="出售价格" name="price" placeholder="请输入" v-model="price"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="btnSale()" type="primary" v-bind:show-loading="showLoading"> 出售</x-button>
    </div>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XHeader, XButton, Tab, TabItem, XInput, Flexbox, Group, FlexboxItem, LoadMore } from 'vux'
import Navs from '@/components/Navs.vue'
import NoData from '@/components/NoData.vue'

const tabList = () => [
  {
    label:'收益情况'
  },{
    label:'交易记录'
}]

export default {
  components: {
    Navs, XHeader, Tab, XButton, XInput, TabItem, Flexbox, FlexboxItem, NoData, Group, LoadMore
  },
  data () {
    return {
      headerTitle: '我的代练宝宝',
      msg: '众筹',
      crowdItem: null, //crowdList(),
      tabItems: tabList(),
      tabIndex: 0,
      quantity: '',
      price: '',
      showLoading: false
    }
  },
  methods: {
        onBack() {
            this.$router.push({ name: 'CrowdMyInfo', params: { item: this.crowdItem }})
        },
        showPlugin(msg) {
        this.$vux.alert.show({
            title: '提示',
            content: msg
        })
        },

        showPluginAuto(msg) {
        this.showPlugin(msg)
        setTimeout(() => {
            this.$vux.alert.hide()
        }, 3000)
        },
        onItemClick() {

        },
        btnSale() {
            if(this.quantity < 0 ) {
                this.showPlugin("请输入有效数量")
                return
            }
            if(this.quantity > this.crowdItem.quantity) {
                this.showPlugin("出售数量超出")
                return
            }
            if(this.price == '') {
                this.showPlugin("请输入出售价格")
                return
            }
            this.remote.fetching({
                func:'StockSale',
                control: 'stock',
                cid: this.crowdItem.cid,
                price: this.price,
                quantity: this.quantity,
            }).then(res => {
                if(res.code == 0) {
                    setTimeout(() => {
                        this.showLoading = false
                        this.$router.push({ name: 'CrowdMy'})
                    }, 2000);
                    
                }
            });  
        }
  },
  created() {
    this.crowdItem = this.$route.params.item
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
  height: 45px;
  line-height: 45px;
}

.crowdItem2 {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem2 p {
  height: 40px;
  line-height: 40px;
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

.img-game-list2 {
    width: 65px;
    height: 65px;
    border-radius: 10%;
    margin-left: 4px;
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
.flex-center {
  font-size: 15px;
  text-align: center;
  padding: 5px;
}
.flex-center p {
  height: 30px;
  line-height: 30px;
}
</style>
