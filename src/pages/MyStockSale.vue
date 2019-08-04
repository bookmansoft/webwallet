<!-- 出售凭证页面
-->
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
                  <p>
                    <span style="font-size:15px;">{{crowdItem.title}}</span>
                    <div style="color: coral; font-size:14px;">持有 {{crowdItem.sum}} 个</div>
                    <div style="color: coral; font-size:14px;">成本 {{parseFloat(crowdItem.price / GLOBAL.base.kg).toFixed(3)}} 千克</div>
                  </p>
                </div>
            </flexbox-item>
        </flexbox>
    </group>
    <group >
      <x-input title="出售数量" name="quantity" placeholder="请输入" v-model="quantity"></x-input>
    </group>
    <group >
      <x-input title="出售价格" name="price" placeholder="请输入(单位 千克)" v-model="price"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="btnSale()" type="primary" v-bind:show-loading="showLoading"> 出售</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader, XButton, Tab, TabItem, XInput, Flexbox, Group, FlexboxItem, LoadMore, } from 'vux'
import Navs from '@/components/Navs.vue'
import NoData from '@/components/NoData.vue'

export default {
  components: {
    Navs, XHeader, Tab, XButton, XInput, TabItem, Flexbox, FlexboxItem, NoData, Group, LoadMore,
  },
  data () {
    return {
      headerTitle: '我的代练宝宝',
      msg: '众筹',
      crowdItem: null,
      quantity: '',
      price: '',
      showLoading: false
    }
  },
  methods: {
        onBack() {
            this.$router.push({ name: 'MyStockInfo', params: { item: this.crowdItem }})
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
            if(this.quantity > this.crowdItem.sum) {
                this.showPlugin("出售数量超出")
                return
            }
            if(this.price == '') {
                this.showPlugin("请输入出售价格")
                return
            }
            this.remote.fetching({
                func:'stockMgr.bidStock',
                params: {
                  addr: this.crowdItem.addr,
                  cid: this.crowdItem.cid,
                  price: this.price*this.GLOBAL.base.kg,
                  num: this.quantity,
                }
            }).then(res => {
                if(res.code == 0) {
                    setTimeout(() => {
                        this.showLoading = false
                        this.$router.push({ name: 'StocksMine'})
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
