<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onTabClick">我领取的</tab-item>
      <tab-item @on-item-click="onTabClick">我发出的</tab-item>
    </tab>
    <!--第1页-->
    <div v-show="tabIndex==0">
      <box gap="10px 10px">
        <card>
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
        </card>

        <card>
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
        </card>
      </box>
    </div>
    <!--第2页-->
    <div v-show="tabIndex==1">
      <box gap="10px 10px">
        <card  @click.native="onItemClick">
          <div slot="content">
            <flexbox >
              <flexbox-item :span="2">
                <div id="imgDiv" align="center">
                  <img style="width:60px;height:72px;" src="/static/img/manyRed/redpacketsmall.jpg" >
                </div>
              </flexbox-item>
              <flexbox-item :span="6">
                <div class="text" >
                  游戏金红包10个
                  <br>3-10 23:52
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="text">-5.000千克</div>
              </flexbox-item>
            </flexbox>
          </div>
        </card>

        <card   @click.native="onItemClick">
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
        </card>

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
      tabItems: tabList()
    };
  },
  methods: {
    onTabClick(index) {
      this.tabIndex = index;
    },
    onItemClick() {
      this.$router.push('/manyRed/receive');
    }
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