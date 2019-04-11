<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onTabClick">我领取的</tab-item>
      <tab-item @on-item-click="onTabClick">我发出的</tab-item>
    </tab>
    <!--第1页-->
    <div v-show="tabIndex==0">
      <box gap="10px 10px">
        <!-- <card>
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div id="imgDiv" align="center">
                  <img style="width:60px;height:72px;" src="/static/img/manyRed/redpacketsmall.jpg">
                </div>
              </flexbox-item>
              <flexbox-item :span="6">
                <div class="text">
                  来自张祖钦的红包
                  <br>3-10 23:52
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="text">+0.500千克</div>
              </flexbox-item>
            </flexbox>
          </div>
        </card>-->
        <template v-for="item in this.receiveData">
          <card :key="item.id">
            <div slot="content">
              <flexbox>
                <flexbox-item :span="2">
                  <div id="imgDiv" align="center">
                    <img
                      style="width:60px;height:72px;"
                      src="/static/img/manyRed/redpacketsmall.jpg"
                    >
                  </div>
                </flexbox-item>
                <flexbox-item :span="6">
                  <div class="text">
                    来自{{item.send_nickname}}的红包
                    <br>
                    {{item.modify_date | dateFormat}}
                  </div>
                </flexbox-item>
                <flexbox-item>
                  <div class="text">+{{item.receive_amount|amountFomat}}千克</div>
                </flexbox-item>
              </flexbox>
            </div>
          </card>
        </template>
      </box>
    </div>
    <!--第2页-->
    <div v-show="tabIndex==1">
      <box gap="10px 10px">
        <template v-for="item in this.sendData">
          <card :key="item.id" @click.native="onItemClick(item.id)">
            <div slot="content">
              <flexbox>
                <flexbox-item :span="2">
                  <div id="imgDiv" align="center">
                    <img
                      style="width:60px;height:72px;"
                      src="/static/img/manyRed/redpacketsmall.jpg"
                    >
                  </div>
                </flexbox-item>
                <flexbox-item :span="6">
                  <div class="text">
                    游戏金红包{{item.total_num}}个
                    <br>
                    {{item.modify_date | dateFormat}}
                  </div>
                </flexbox-item>
                <flexbox-item>
                  <div class="text">-{{item.total_amount|amountFomat}}千克</div>
                </flexbox-item>
              </flexbox>
            </div>
          </card>
        </template>

        <!-- <card @click.native="onItemClick">
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div id="imgDiv" align="center">
                  <img style="width:60px;height:72px;" src="/static/img/manyRed/redpacketsmall.jpg">
                </div>
              </flexbox-item>
              <flexbox-item :span="6">
                <div class="text">
                  游戏金红包5个
                  <br>3-10 23:52
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="text">-1.500千克</div>
              </flexbox-item>
            </flexbox>
          </div>
        </card>-->
      </box>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem,
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
    Tab,
    TabItem,
    Card
  },
  data() {
    return {
      tabIndex: 0,
      tabItems: tabList(),
      receiveData: {},
      sendData: {}
    };
  },
  methods: {
    onTabClick(index) {
      this.tabIndex = index;
      // 我领取的
      if (index == 0) {
        let params = {
          func: "ListRecord",
          control: "manyreceive",
          uid: this.GLOBAL.userBase.uid,
          oemInfo: this.GLOBAL.oemInfo,
          receive_uid: this.GLOBAL.userBase.uid,
        };
        this.axios.post(this.GLOBAL.apiUrl, params).then(res => {
          this.receiveData = res.data.list;
        });
      } else if (index == 1) {  //我发出的
        let params = {
          func: "ListRecord",
          control: "manysend",
          uid: this.GLOBAL.userBase.uid,
          oemInfo: this.GLOBAL.oemInfo,
          send_uid: this.GLOBAL.userBase.uid,
        };
        this.axios.post(this.GLOBAL.apiUrl, params).then(res => {
          this.sendData = res.data.list;
        });
      }
    },
    onItemClick(send_id) {
      this.$router.push(`/manyRed/receive/${send_id}`);
    }
  },
  filters: {
    dateFormat: function(el) {
      return moment(el * 1000).format("MM-DD HH:mm");
    },
    amountFomat: function(el) {
      return parseInt(el / 100)/1000;
    },
  },
  created: function() {
    let params = {
      func: "ListRecord",
      control: "manyreceive",
      uid: this.GLOBAL.userBase.uid,
      oemInfo: this.GLOBAL.oemInfo
    };
    this.axios.post(this.GLOBAL.apiUrl, params).then(res => {
      this.receiveData = res.data.list;
    });
  }
};


</script>

<style scoped>
#imgDiv {
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
</style>