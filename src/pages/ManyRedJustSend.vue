<template>
  <div>
    <box gap="10px 10px">
      <div id="imgDiv" align="center">
        <img style="width:250px" src="/static/img/manyRed/redpacketready.jpg">
      </div>
      <flexbox>
        <flexbox-item :span="3"></flexbox-item>
        <flexbox-item :span="6">
          <x-button class="xbutton" type="warn" @click.native="showDialog">发送给朋友</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="3"></flexbox-item>
        <flexbox-item :span="6">
          <x-button class="xbutton" plain type="warn">复制链接</x-button>
        </flexbox-item>
      </flexbox>
    </box>

    <div v-transfer-dom>
      <alert v-model="show" :title="asdsds">ddd</alert>
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
  XImg,
  AlertModule,
  Alert,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XInput,
    XButton,
    Group,
    GroupTitle,
    Cell,
    Box,
    XImg,
    AlertModule,
    Alert
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    //显示发送给朋友对话框
    showDialog() {
      this.show=true;
    }

  }
};
</script>

<style scoped>
#imgDiv {
  margin-top: 45px;
  margin-bottom: 45px;
  margin-left: 50px;
  margin-right: 50px;
}
.xbutton {
  margin-top: 20px;
}
.space6 {
  margin-top: 6px;
}
.space12 {
  margin-top: 12px;
}
.space24 {
  margin-top: 24px;
}
</style>