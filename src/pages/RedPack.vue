<template>
  <div>
      <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group title="红包测试">
        <div style="padding:15px;"><p>{{version}}</p></div>
    </group>
    <group>
        <div style="padding:15px;"><p>code: {{code}}</p></div>
    </group>
    <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <div style="padding:15px;">
        <x-button type="primary" @click.native="wxAuthod" v-if="code==null">授权</x-button>
        </div>
    </group>
  </div>
</template>
<script>
import { XHeader, Group, XButton} from 'vux'

export default {
  components: {
    XHeader,  Group, XButton
  },
  data () {
    return {
      version: '领一个红包',
      headerTitle: '抢红包',
      code: null
    }
  },
  methods: {
      onBack() {
        this.$router.go(-1);
      },
      wxAuthod() {
          console.log('wxAuthod')
          let redirect_uri = 'https://mini.gamegold.xin/gg-wechat-client/?openid=' + this.GLOBAL.openid
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5e9d7ae34ad4b4'
          url += '&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
          window.location.href = url
      },
      getOpenid() {
          let data = {func:'GetMapOpenId', control: 'wechat', code: this.code, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
          });
      }
  },
  created() {
      if(!!!this.$route.params.code) {
          this.code = this.$route.params.code
      }
      
  }
}
</script>