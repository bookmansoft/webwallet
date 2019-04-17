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
      <alert v-model="show" :title="好的">点击页面右上角-发送给好友，即可将该红包分享到微信好友/群。</alert>
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
import wx from "weixin-js-sdk";

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
      show: false,
      sendData: {},
      send_id: -1,
      that: {}
    };
  },
  methods: {
    //显示发送给朋友对话框
    showDialog() {
      this.show = true;
    }
  },

  created: function() {
    this.send_id = this.$route.params.send_id;
    let that = this.send_id;
    //第一步先获取参数带来的发送包信息
    let params = {
      func: "Retrieve",
      control: "manysend",
      uid: this.GLOBAL.userBase.uid,
      oemInfo: this.GLOBAL.oemInfo,
      id: this.send_id
    };
    console.log("84:", params);
    this.axios.post(this.GLOBAL.apiUrl, params).then(res => {
      this.sendData = res.data.data;
      console.log("红包组信息:", this.sendData);
      let sendDataWishing = this.sendData.wishing;
      let sendDataSendNickName = this.sendData.send_nickname;
      //配置成的处理方法
      wx.ready(function() {
        console.log("wx ready ok!!!");
        console.log("http://h5.gamegold.xin/?path=/manyRed/unpack/" + that);
        //发送给朋友
        wx.onMenuShareAppMessage({
          title: "[游戏金红包]" + sendDataWishing + "！", // 分享标题
          desc: "来自" + sendDataSendNickName + "的游戏金红包", // 分享描述
          link: "http://h5.gamegold.xin/?path=/manyRed/unpack/" + that, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "http://h5.gamegold.xin/static/img/manyRed/redpacketsmall.jpg", // 分享图标
          success: function() {
            console.log("微信分享设置成功");
            // 设置成功
          },
          fail: function(res) {
            console.log("失败了：" + JSON.stringify(res));
          }
        });
        console.log("走过了设置程序");
      });
    });

    //获取配置信息
    let url = location.href.split("#")[0]; //"http://h5.gamegold.xin/#/manyRed/justSend";
    console.log("WechatConfig:" + url);
    let data = {
      func: "WechatConfig",
      control: "wechat",
      oemInfo: this.GLOBAL.oemInfo,
      url: url
    };
    //alert(data);
    this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
      //alert(res.data);
      if (res.data.errcode == "success") {
        console.log("wxconfig::" + JSON.stringify(res.data.wxconfig));
        wx.config(res.data.wxconfig);
      } else {
        console.log("获取WechatConfig信息失败");
      }
    });
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