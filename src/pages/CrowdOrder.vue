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
                    <p><inline-x-number width="50px" v-model="quantity"></inline-x-number></p>
                </flexbox-item>
            </flexbox>
          </div>
      </div>
      <div style="background-color: #f5f5f9; padding: 0px 0px 0px 0px">
          <div style="padding: 0px 12px 0px 12px">
                <group>
                <cell :is-link="true" value="微信支付">
                  <span slot="title">
                    <span style="vertical-align:middle;">支付方式</span>
                  </span>
                </cell>
                <cell :is-link="true" value="无可用">
                  <span slot="title">
                    <span style="vertical-align:middle;">优惠券</span>
                  </span>
                </cell>
              </group>

              <group>
                <cell :is-link="true" value="10元">
                  <span slot="title">
                    <span style="vertical-align:middle;">商品金额</span>
                  </span>
                </cell>
              </group>

          </div>
      </div>
      <div>
        <br/>
        <box gap="10px 10px">
            <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="crowdPay()">去支付</x-button>
        </box>
      </div>
  </div>
  
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XButton, Tab, TabItem, Flexbox, FlexboxItem, Group, Divider, Box, InlineXNumber, Cell, CellBox, CellFormPreview, Badge } from 'vux'
import Navs from '@/components/Navs.vue'

export default {
  components: {
    Navs, Tab, XButton, TabItem, Flexbox, FlexboxItem, Group, Divider, Box, InlineXNumber, Cell, CellBox, CellFormPreview, Badge
  },
  data () {
    return {
      msg: '众筹',
      tabIndex: 0,
      crowdItem: null,
      quantity: 1
    }
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex)
    },

    orderRePay() {
      let data = {
        func:'CommonOrderRepay',
        control: 'order',
        uid: this.GLOBAL.userBase.uid,
        price: this.quantity * 10,
        productId: this.crowdItem.id,
        attach: this.crowdItem.cid,
        quantity: this.quantity,
        productIntro: this.crowdItem.cname,
        oemInfo: this.GLOBAL.oemInfo
      };
      console.log('order', data)
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          console.log(res.data);
          if(res.data.errcode='success') {
            //this.orderPay(res.data.tradeId)
            this.$router.push({name:'WeChatPay', params: {order: res.data.order, tradeId: res.data.tradeId}})
          }
      });       
    },
    crowdPay() {
      this.orderRePay()
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
