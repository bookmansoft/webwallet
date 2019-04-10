<template>
  <div>
    <div class="topDiv">
      <div align="center">
        <img class="topHeadImg" style="width:60px;height:60px;"  :src="this.sendData.send_headimg">
      </div>
      <div align="center">
        <label id="label1">{{this.sendData.send_nickname}}的游戏金红包</label>
      </div>
      <div align="center">
        <label id="label2">{{this.sendData.wishing}}</label>
      </div>
    </div>
    <div class="nextDiv">
      <div align="center">
        <label id="label3">{{this.sendData.total_amount|amountFomat}}千克</label>
      </div>
      <div align="center">
        <label id="label4">已领取，进入钱包查看></label>
      </div>
    </div>

    <group class="group">
      <group-title slot="title">
        <span class="groupTitle">已领取 16/20 个</span>
      </group-title>
    </group>
    <div v-show="true">
      <box gap="10px 10px">
        <template v-for="item in this.receiveData">
          <card class="card" :key="item.id">
            <div slot="content">
              <flexbox>
                <flexbox-item :span="2">
                  <div class="imgDiv" align="center">
                    <img style="width:60px;height:60px;" :src="item.receive_headimg">
                  </div>
                </flexbox-item>
                <flexbox-item :span="6">
                  <div class="text">
                    {{item.send_nickname}}
                    <br>{{item.modify_date|dateFormat}}
                  </div>
                </flexbox-item>
                <flexbox-item>
                  <div class="text">+{{item.receive_amount|amountFomat}}千克</div>
                </flexbox-item>
              </flexbox>
            </div>
          </card>
        </template>
        <!-- <card class="card">
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div class="imgDiv" align="center">
                  <img style="width:60px;height:60px;" :src="imgTest">
                </div>
              </flexbox-item>
              <flexbox-item :span="6">
                <div class="text">
                  Sasuke
                  <br>3-10 23:52
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="text">+0.500千克</div>
              </flexbox-item>
            </flexbox>
          </div>
        </card> -->
      </box>
    </div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Divider,
  XInput,
  Group,
  XButton,
  Cell,
  Box,
  GroupTitle,
  Card
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
    Flexbox,
    FlexboxItem,
    Divider,
    XInput,
    Group,
    XButton,
    Cell,
    Box,
    GroupTitle,
    Card
  },
  data() {
    return {
      receiveData: {},
      sendData: {},
      // imgTest: require("../../static/img/manyRed/head2.png"),
    };
  },
  methods: {},
  filters: {
    dateFormat: function(el) {
      return moment(el * 1000).format("MM-DD HH:mm");
    },
    amountFomat: function(el) {
      return parseInt(el / 100) / 1000;
    },

  },
  created: function() {
    // alert(this.$route.params.send_id);
    //获取发送的信息
    let params1 = {
      func: "Retrieve",
      control: "manysend",
      uid: this.GLOBAL.userBase.uid,
      oemInfo: this.GLOBAL.oemInfo,
      id: this.$route.params.send_id
    };

    this.axios.post(this.GLOBAL.apiUrl, params1).then(res => {
      this.sendData = res.data.data;
      //  alert(JSON.stringify(this.sendData));
    });

    //获取接收列表
    let params2 = {
      func: "ListRecord",
      control: "manyreceive",
      uid: this.GLOBAL.userBase.uid,
      oemInfo: this.GLOBAL.oemInfo,
      send_id: this.$route.params.send_id //此处用send_id
    };
    this.axios.post(this.GLOBAL.apiUrl, params2).then(res => {
      this.receiveData = res.data.list;
      alert(JSON.stringify(this.receiveData));
    });
  }
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
.groupTitle {
  font-size: 16px;
  margin-bottom: 20px;
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