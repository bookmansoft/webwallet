<template>
  <div>
    <div class="topDiv">
      <div align="center">
        <img class="topHeadImg" style="width:60px;height:60px;" src="/static/img/manyRed/head3.png">
      </div>
      <div align="center">
        <label id="label1">张祖钦的游戏金红包</label>
      </div>
      <div align="center">
        <label id="label2">恭喜发财，万事如意</label>
      </div>
    </div>
    <div class="nextDiv">
      <div align="center">
        <label id="label3">0.456千克</label>
      </div>
      <div align="center">
        <label id="label4">已领取，进入钱包查看> </label>
      </div>
    </div>

    <group class="group">
      <group-title slot="title">
        <span class="groupTitle">已领取 16/20 个</span>
      </group-title>
    </group>
    <div v-show="true">
      <box gap="10px 10px">
        <card class="card">
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div class="imgDiv" align="center">
                  <img style="width:60px;height:60px;" src="/static/img/manyRed/head1.png">
                </div>
              </flexbox-item>
              <flexbox-item :span="6">
                <div class="text">
                  Nartuto
                  <br>3-10 23:52
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="text">+0.500千克</div>
              </flexbox-item>
            </flexbox>
          </div>
        </card>

        <card class="card">
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div class="imgDiv" align="center">
                  <img style="width:60px;height:60px;" src="/static/img/manyRed/head2.png">
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
        </card>
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
      tabIndex: 0,
      tabItems: tabList()
    };
  },
  methods: {
    onItemClick(index) {
      this.tabIndex = index;

      //alert(this.tabIndex);
    }
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
  color:#ffff00;
}
#label2 {
  font-size: 18px;
  color:#ffff00;
}
#label3 {
  font-size: 32px;
}
#label4 {
  font-size: 16px;
  color:#888888;
}
</style>