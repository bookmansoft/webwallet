<template>
  <div>

      <group class="group">
        <group-title slot="title">
          <span class="groupTitle">已领取 16/20 个</span>
        </group-title>
      </group>
    <div v-show="true">
      <box gap="10px 10px">
        <card>
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div id="imgDiv" align="center">
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

        <card>
          <div slot="content">
            <flexbox>
              <flexbox-item :span="2">
                <div id="imgDiv" align="center">
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