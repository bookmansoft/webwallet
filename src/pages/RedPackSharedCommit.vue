<!-- 多人红包发送页面
-->
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
          <x-button class="xbutton" plain type="warn" @click.native="copyAddr(address, $event)">复制链接</x-button>
        </flexbox-item>
      </flexbox>
    </box>

    <div v-transfer-dom>
      <alert v-model="show" :title="Title">点击页面右上角-发送给好友，即可将该红包分享到微信好友/群。</alert>
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
import Clipboard from 'clipboard'

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
      Title: '好的',
      address: '',
      sendData: {},
      send_id: -1,
      that: {}
    };
  },
  methods: {
    //显示发送给朋友对话框
    showDialog() {
      this.show = true;
    },
    copyAddr(text, event){
      const clipboard = new Clipboard(event.target, {
        text: () => text
      })
      clipboard.on('success', e => {  
        // 释放内存  
        this.$vux.toast.show({text: '已复制到剪贴板'})
        clipboard.destroy()  
      })  
      clipboard.on('error', e => {  
        // 不支持复制  
        // 释放内存  
        this.$vux.toast.show({text: '浏览器不支持复制'})
        clipboard.destroy()  
      })  
    },
  },

  created: function() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
        return;
    }
    
    this.send_id = this.$route.params.send_id;

    let that = this;
    //第一步先获取参数带来的发送包信息
    this.remote.fetching({
      func: "sharedredpack.Retrieve",
      id: this.send_id
    }).then(res => {
      if(res.code == 0) {
        this.sendData = res.data;
        this.address = `${this.remote.appConfig.siteUri}?path=/redpackshared/unpack/${this.send_id}`;

        this.$wechat.ready(function() {
          //发送给朋友
          that.$wechat.onMenuShareAppMessage({
            title: `[游戏金红包]${that.sendData.wishing}！`,                                   // 分享标题
            desc: `来自${that.sendData.send_nickname}的游戏金红包`,                            // 分享描述
            link: that.address,                                                               // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: `${that.remote.appConfig.siteUri}static/img/manyRed/redpacketsmall.jpg`,  // 分享图标
            success: function() {
              console.log("微信分享设置成功");
              // 设置成功
            },
            fail: function(res) {
              console.log("失败了：" + JSON.stringify(res));
            }
          });
        });
      } else {
        throw new Error(`sharedredpack.Retrieve: ${res.code}`);
      }
    }).catch(e=>{
      console.log(e);
      this.$router.push('/home')
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