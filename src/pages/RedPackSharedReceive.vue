<!-- 多人红包详情展示页面
-->
<template>
  <div>
    <div class="topDiv">
      <div align="center">
        <img class="topHeadImg" style="width:60px;height:60px;"  :src="this.sendData.send_headimg">
      </div>
      <div align="center">
        <label id="label1">来自{{this.sendData.send_nickname}}的红包</label>
      </div>
      <div align="center">
        <label id="label2">{{this.sendData.wishing}}</label>
      </div>
    </div>
    <div class="nextDiv">
      <div align="center">
        <label id="label3">{{this.sendData.state_id==1?(parseInt(this.sendData.real_amount/100)/1000+'千克'):this.sendData.state_name}}</label>
      </div>
      <div align="center">
        <span @click="gotoWallet"><label id="label4">{{'进入钱包查看 >>'}}</label></span>
        <span @click="gotoShare"><label id="label4">{{'分享给朋友 >>'}}</label></span>
      </div>
    </div>

    <div v-show="true">
        <panel :header="panelTitle" :list="receiveData" :type="panelType"></panel>
    </div>
  </div>
</template>
<script>
import {
  Panel,
} from "vux";
import moment from "moment";
const tabList = () => [
  {
    label: "道具交易"
  },
  {
    label: "比特币交易"
  }
];

export default {
  components: {
    Panel,
  },
  data() {
    return {
      panelTitle: '',
      panelType: '1',
      receiveData: [],
      sendData: {},
      // imgTest: require("../../static/img/manyRed/head2.png"),
    };
  },
  computed: {
    userBase() {
      return this.$store.state.user.auth;
    }
  },
  methods: {
    gotoWallet() {
      this.$router.push('/redpackshared');
    },
    gotoShare() {
      this.$router.push(`/redpackshared/justSend/${this.$route.params.send_id}`);
    },
    dateFormat(el) {
      return moment(el * 1000).format("MM-DD HH:mm");
    },
    amountFomat(el) {
      return parseFloat(el/100000).toFixed(3);
    },
  },
  created: function() {
    if(!this.$route.params.send_id) {
      if(!this.userBase.uid) { 
        this.$router.push({ name: 'Login'});
      } else {
        this.$router.push('/home');
      }
    } else if(!this.userBase.uid) {
      this.$router.push({ name: 'Login', params: { path: `/redpackshared/unpack/${this.$route.params.send_id}` }});
    } else {
      this.$store.dispatch('rps/receive', {
        id: this.$route.params.send_id
      }).then(res => {
        if(res.code == 0) {
          this.sendData = res.data.send;
          this.receiveData = res.data.receive.map(item=>{
            item.src = item.recv_headimg;
            item.title = `${item.recv_nickname} ${this.dateFormat(item.modify_date)}`;
            item.desc = `+${this.amountFomat(item.receive_amount)}千克`;
            return item;
          });
          this.panelTitle = `已领取 ${this.receiveData.length}/${this.sendData.total_num} 个`;
          console.log('sharedredpack_receive.Receive', res.data);
        } else {
          throw new Error(`sharedredpack_receive.Receive: ${res.code}`);
        }
      }).catch(e=>{
        console.error(e);
        this.$router.push('/home');
      });
    }
  },
};
</script>

<style scoped>
.topDiv {
  background-image: url(/static/img/manyRed/top.png);
  background-repeat: no-repeat;
  height: 200px;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.nextDiv {
  background-color: white;
}
.imgDiv {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;
}
.topHeadImg {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;
}
.input {
  font-size: 20px;
}
.text {
  font-size: 20px;
  line-height: 36px;
}
.card {
  margin-top: -5px;
}
#label1 {
  font-size: 22px;
  color: #ffff00;
}
#label2 {
  font-size: 18px;
  color: #ffff00;
}
#label3 {
  font-size: 32px;
}
#label4 {
  font-size: 16px;
  color: #888888;
}
</style>