<!-- 邮件详情展示页面
邮件数据格式
{
  id,         //邮件索引号
  from,       //发件人
  dst,        //收件人
  time,       //发送时间
  state,      //状态 0 未读 1已读
  type,       //邮件类型
  content,    //邮件内容
  bonus,      //附加奖励
}
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <div v-if="!!data">
      <!-- 根据邮件类型选择显示样式 -->
      <div v-if="data.type == 10001">
        <form-preview header-label="账户变更通知" header-value="" :body-items="data.list"></form-preview>
      </div>
      <div v-if="data.type == 10002 && typeof data.content.body.content == 'object'">
        <form-preview header-label="用游戏金支付订单" header-value="" :body-items="data.list"></form-preview>
        <group label-width="3.5em" label-margin-right="2em" label-align="right">
          <div v-if="data.state==0" style="padding:15px;background-color:white;">
            <x-button type="primary" @click.native="payNow()">立即支付</x-button>
          </div>
          <div v-if="data.state==1" style="padding:15px;background-color:white;">已支付</div>
        </group>
      </div>
      <div v-if="data.type == 10002 && typeof data.content.body.content == 'string'">
        <form-preview header-label="通告" header-value="" :body-items="data.list"></form-preview>
      </div>
      <div v-if="data.type!=10001 && data.type!=10002">
        <form-preview header-label="普通邮件" header-value="" :body-items="data.list"></form-preview>
      </div>
    </div>
  </div>
</template>

<script>
import { FormPreview, XHeader, XButton, Group } from 'vux'

export default {
  components: {
    FormPreview, XHeader, XButton, Group
  },
  data () {
    return {
      headerTitle: '订单支付',
      data: {},
    }
  },
  computed: {
    userBase () { return this.$store.state.user.auth; },
  },
  methods: {
    onBack() {
        this.$router.go(-1)
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

    payNow() {
      this.$store.dispatch('wallet/orderpay', {
        sn: this.data.content.sn,
      }).then(res => {
          if(res.code == 0) {
            this.showPluginAuto('支付成功');
            this.$store.dispatch('message/read', this.data.id);
          } else {
            this.showPluginAuto('支付异常');
          }
          this.$router.push('/Message')
      });
    }
  },

  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else {
      if(!this.$route.params.data) {
        this.$router.push('/Message');
      } else {
        this.data = this.$route.params.data;
        let order = this.data.content; //邮件内容

        if(this.data.type == 10001) { //账户变更
          this.data.list = [
            {label: '发起用户',value: this.data.from},
            {label: '目标用户',value: this.data.dst},
            {label: '交易编码',value: order.hash},
          ];
          if(order.out.length > 0) {
            this.data.list.push(
              {label: '收入(千克):',value: order.out.reduce((sofar,cur)=>{if(!!sofar) {sofar += ' | '} sofar += this.assistant.toKg(cur[1]); return sofar;},'')}
            );
          }
          if(order.in.length < 0) {
            this.data.list.push(
              {label: '支出(千克):',value: order.in.reduce((sofar,cur)=>{if(!!sofar) {sofar += ' | '} sofar += this.assistant.toKg(cur[1]); return sofar;},'')}
            );
          }
          this.data.list.push(
            {label: '账户余额',value: `${this.assistant.toKg(order.balance.unconfirmed)}千克`}
          );
        } else if(this.data.type == 10002) { //道具订单
          if(typeof order.body.content == 'string') {
            this.data.list = [
              {label: '发起用户',value: this.data.from},
              {label: '目标用户',value: this.data.dst},
              {label: '消息内容',value: order.body.content},
            ];
          } else {
            this.data.list = [
              {label: '发起用户',value: this.data.from},
              {label: '目标用户',value: this.data.dst},
              {label: '游戏编号',value: order.body.content.cid},
              {label: '道具名称',value: order.body.content.props_name},
              {label: '销售价格',value: `${this.assistant.toKg(order.body.content.price)}千克`},
            ];
          }
        } else { //普通邮件
          this.data.list = [
            {label: '发起用户',value: this.data.from},
            {label: '目标用户',value: this.data.dst},
            {label: '信件内容',value: order.body.content},
          ];
        }
      }
    }
  }
}
</script>