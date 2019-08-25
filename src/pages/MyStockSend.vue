<!-- 出售凭证页面
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
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
                    <div style="color: coral; font-size:14px;">成本 {{parseFloat(crowdItem.price / unit.kg).toFixed(3)}} 千克</div>
                  </p>
                </div>
            </flexbox-item>
        </flexbox>
        <flexbox :gutter="0" class="content">
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="9">
            <x-input title="转让地址" name="address" placeholder="请输入转让地址" v-model="address"></x-input>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;padding-left:10px;" @click="wxScanCode">
              <img src="/static/img/stock/send/scan.png" style="width:auto;height:auto;max-width:100%;max-height:100%;">
            </div>
          </flexbox-item>
          <flexbox-item :span="1"></flexbox-item>
        </flexbox>
        <flexbox :gutter="0" class="content">
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="9">
            <x-input title="转让数量" name="quantity" placeholder="请输入" v-model="quantity"></x-input>
          </flexbox-item>
          <flexbox-item :span="1">
          </flexbox-item>
          <flexbox-item :span="1"></flexbox-item>
        </flexbox>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="btnSend()" type="primary" v-bind:show-loading="showLoading">转让</x-button>
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
      address: '',
      showLoading: false
    }
  },
  computed: {
    unit() {return this.$store.state.config.dict['base'];},
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
        btnSend() {
            if(this.quantity < 0 ) {
                this.showPlugin("请输入有效数量")
                return
            }
            if(this.quantity > this.crowdItem.sum) {
                this.showPlugin("转让数量超限")
                return
            }
            if(this.address == '') {
                this.showPlugin("请输入转让地址")
                return
            }

            this.$store.dispatch('stockMine/send', {
                  addr: this.crowdItem.addr,
                  cid: this.crowdItem.cid,
                  address: this.address,
                  num: this.quantity,
            }).then(res => {
                if(res.code == 0) {
                    setTimeout(() => {
                        this.showLoading = false
                        this.$router.push({ name: 'StocksMine'})
                    }, 2000);
                    
                }
            });  
        },
        /**
        * 调用摄像头
        */
        wxScanCode() {
          let self = this;
          this.$store.dispatch('user/WechatConfig', {
            uri: window.location.href.split('#')[0],
          }).then(res=>{
            if (res.code == 0) {
              self.$wechat.config(res.data);
              self.$wechat.ready(function(){
                self.$wechat.scanQRCode({
                  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                  scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                  success: function(r) {
                    console.log('scanQRCode', r);
                    self.address = r.resultStr; // 当needResult 为 1 时，扫码返回的结果
                  },
                  fail: function(r) {
                    console.log('scanQRCode', r);
                    self.utils.myAlert(self.$vux.alert, `地址扫描失败${JSON.stringify(r)}`);
                  }
                });
              });
            } else {
              self.utils.myAlert(self.$vux.alert, `获取微信签名失败 ${res.code}`);
            }
          });
        },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else { 
      this.crowdItem = this.$route.params.item
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
