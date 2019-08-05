<!-- VIP会员页面 
--> 
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <memberJoin v-if="!!mine && !mine.vl" @click.native="orderRePay"></memberJoin>
    <memberGold v-if="!!mine && mine.vl > 0" :mine="mine" ></memberGold>
    
    <div><p class="memberMore"><span>会员方案</span></p></div>
    <div class="memberMoreDiv">
        <flexbox>
          <flexbox-item v-for="(item, index) in btnItems" :key="index">
            <div class="box2" @click="vipSelect(item)">
              <img :src="item.status==0 ? item.src0 : item.src1">
            </div>
          </flexbox-item>
        </flexbox>
    </div>

    <div class="vipDesc">
      <divider>.</divider>
      <div class="vipDescDiv">
        <swiper v-model="vipDescIndex" height="120px" :show-dots="false">
          <swiper-item v-for="(item, index) in vipDescItems" :key="index">
            <p v-for="(item1, index1) in item.memo" :key="index1">{{item1}}</p>
          </swiper-item>
        </swiper>
      </div>
    </div>
    
    <div class="memberBtn">
        <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="orderRePay" :disabled="!btnEnable">
          <span>{{btnTitle + btnTitleFee}}</span>
        </x-button>
    </div>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import MemberJoin from '@/components/MemberJoin.vue'
import MemberGold from '@/components/MemberGold.vue'
import { XHeader, Flexbox, FlexboxItem, Group, Divider, XButton, Swiper, SwiperItem  } from 'vux'

export default {
  components: {
    MemberJoin, MemberGold,
    XHeader, Flexbox, FlexboxItem, Group, Divider, XButton, Swiper, SwiperItem
  },
  data () {
    return {
      headerTitle: '会员服务',
      vipDescIndex: 0,
      curPrice: 0,
      product: null,
      vipDescItems: [],
      vipConfig: {},
      btnItems: {},
      mine: null,
      btnTitle: '',
      btnTitleFee: '',
      btnEnable: true,
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },

      vipSelect(item) {
        this.vipDescIndex = parseInt(item.index) - 1;
        this.btnItems.forEach(element => {
          if(element.index != item.index) {
            element.status = 0;
          } else {
            element.status = 1;
          }
        });

        this.product = this.vipConfig[this.vipDescIndex+1];
        let select_vip = parseInt(this.product.value);
        if(!!this.mine.vl) {
          if(select_vip < this.mine.vl) {
            this.btnTitle = '不可降级';
            this.btnEnable = false;
          } else if(select_vip > this.mine.vl) {
            this.btnTitle = '升级VIP' + select_vip;
            this.btnEnable = true;
          } else {
            this.btnTitle = 'VIP' + this.mine.vl + '续费';
            this.btnEnable = true;
          }
        } else {
          this.btnTitle = '开通会员';
        }

        let current_time = Date.parse(new Date())/1000;
        if(!this.mine.vl || current_time > this.mine.vet || this.mine.vl == select_vip) {
          this.curPrice = parseFloat(this.vipConfig[select_vip].price/100).toFixed(2);
        } else if(select_vip > this.mine.vl) {
          let days = ((this.mine.vet - this.mine.vst) / (24 * 3600)) | 0;
          this.curPrice = parseFloat((this.vipConfig[select_vip].price - this.vipConfig[this.mine.vl].price) * days / 30 / 100).toFixed(2);
        } else {
          this.curPrice = 0;
        }
        this.btnTitleFee = `(￥${this.curPrice})`;
      },

      orderRePay() {
        this.product = this.product || this.vipConfig[1];
        let val = parseInt(this.product.value);
        if(!!this.mine.vl && val < this.mine.vl) {
            this.showPluginAuto('不能降级，当前已经是' + this.product.label);
            return;
        }

        console.log('vip orderRePay', this.product);

        this.$router.push({name:'WeChatPay', params: {
          order: {
            type:'vip',
            id: val,
            price: this.curPrice,
            desc: this.product.label,
            num: 1,
          },
          retPath: '/member',
        }});
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
        }, 2000)
      },
  },
  //#region 生命周期函数
  created() {
    if(!this.global.userBase.uid) {
      this.$router.push('/login');
    }

    this.mine = this.global.userBase;
    if(!this.mine.vl) {
      this.mine.vl = 0;
    }
  },
  mounted() {
    this.ConfigMgr.get('vip', (err, config) => {
      if(!err) {
        //将对象转化为客户端要求的数组
        this.vipDescItems = Object.keys(config).map(key => config[key]);
        this.vipConfig = config;
        this.btnItems = Object.keys(config).map(key => {
          let item = {    
              index: key,
              src0: `static/img/member/v${key}_no.png`,
              src1: `static/img/member/v${key}_yes.png`,
              status: this.mine.vl == key ? 1 : 0,
          };
          return item;
        });

        if(!!this.mine.vl) {
            this.vipSelect(this.btnItems[this.mine.vl-1]);
        } else {
            this.vipSelect(this.btnItems[0]);
        }
      }
    });
  },
  beforeDestroy() {
    //在此集中取消不再需要的监听事件，避免不当持有造成的内存泄漏
  },
  //#endregion
}
</script>
<style lang="less" scoped>

.box2{
  text-align:center; 
}
.box2 img {
  width: 80px;
  height: 64px;
}
.vipDesc {
  background-color: white; padding:5px 25px 15px 25px;
}
.vipDescDiv {
  color:#CC9900; font-size:13px;
}
.memberMore {
  text-align:center;width:100%;background-color: white;padding-top:5px; top:8px; position: relative;
}
.memberMoreDiv {
  background-color: white; padding:15px;
}
.memberMore span {
  color:#CC9900; font-size:15px;font-weight:620;
}
.memberBtn {
  padding: 10px; 
  background-color: white; 
  top:8px; 
  position: relative;
}
</style>