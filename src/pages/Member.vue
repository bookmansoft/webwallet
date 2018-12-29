<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group>
        <div class="divMember"><img src="static/images/member/m1.png" class="imgMember" /></div>
    </group>
    <group>
        <div class="divMember">
            <divider>{{ msg }}</divider>
            <br>
            <button-tab v-model="btnTab">
                <button-tab-item v-for="(item, index) in items" :key="index">{{item.label}}</button-tab-item>
            </button-tab>
            <swiper v-model="btnTab" height="220px" :show-dots="false">
                <swiper-item v-for="(item, index) in items" :key="index">
                    <card>
                    <div slot="content" class="card-padding">
                        <p style="color:#999;font-size:16px;">{{item.tag}}</p>
                        <br/>
                        <p style="font-size:15px;line-height:1.2;color:#C46E43;">{{item.memo}}</p>
                    </div>
                    </card>
                </swiper-item>
            </swiper>
        </div>
    </group>
    <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <div class="divMember"><x-button type="primary" @click.native="getMember">立即开通</x-button></div>
    </group>
    <div v-transfer-dom>
      <popup v-model="showCard">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        :left-text="cancel"
        :right-text="done"
        :title="selectCard"
        :show-bottom-border="false"
        @on-click-left="showCard = false"
        @on-click-right="showCard = false"></popup-header>
        <group gutter="0">
          <radio :options="options"></radio>
        </group>
      </popup>
    </div>

  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, XButton, Grid, GridItem, Group, ButtonTab, ButtonTabItem, Divider, Swiper, SwiperItem, Card } from 'vux'
import { PopupHeader, Popup, TransferDom, Radio } from 'vux'

const getItems = () => [{
  label: 'VIP1',
  tag: '6元/月',
  index: 0,
  memo: 'VIP 1会员特权：首次开通会员立得价值188元游戏道具大礼包，解锁XXX功能，该功能在会员到期后仍然可以使用，会员有效期内，每日可领取10kg游戏金福利，点亮VIP1会员专属勋章，开通会员方案，后续会员服务升级，已开通用户将自动更新服务',
}, {
  label: 'VIP2',
  tag: '66元/月',
  index: 1,
  memo: 'VIP 1会员特权：首次开通会员立得价值188元游戏道具大礼包，解锁XXX功能，该功能在会员到期后仍然可以使用，会员有效期内，每日可领取100kg游戏金福利，点亮VIP2会员专属勋章，开通会员方案，后续会员服务升级，已开通用户将自动更新服务',
},{
  label: 'VIP3',
  tag: '666元/月',
  index: 2,
  memo: 'VIP 1会员特权：首次开通会员立得价值188元游戏道具大礼包，解锁XXX功能，该功能在会员到期后仍然可以使用，会员有效期内，每日可领取300kg游戏金福利，点亮VIP3会员专属勋章，开通会员方案，后续会员服务升级，已开通用户将自动更新服务',
}]

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader, XButton, Balance, Grid, GridItem, Group, Card,
    ButtonTab, ButtonTabItem, Divider, Swiper, SwiperItem,
    PopupHeader, Popup, Radio
  },
  data () {
    return {
      showCard: false,
      headerTitle: '会员服务',
      cancel: '取消',
      done: '确定',
      selectCard: '选择会员服务',
      items: getItems(),
      msg: '会员享受特权服务',
      btnTab: 0,
      options: ['VIP1/6元', 'VIP2/66元', 'VIP3/666元']
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },
      getMember() {
          this.showCard = true
      }
  },
  created() {
     
  }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.divMember {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
}
.imgMember {
  width: 100%;
  height: auto;
}
</style>