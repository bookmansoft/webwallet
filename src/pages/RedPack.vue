<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group title="红包测试">
        <div style="padding:15px;"><p>{{version}}</p></div>
    </group>
    <group v-if="retMsg!=null">
        <div style="padding:15px;"><p>{{retMsg}}</p></div>
    </group>
    <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <div style="padding:15px;">
        <x-button type="primary" @click.native="sendRedPack" v-if="wxopenid!=null">发一个红包试试</x-button>
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
      code: null,
      wxopenid: null,
      uid: 0,
      retMsg: null
    }
  },
  methods: {
      onBack() {
        this.$router.go(-1);
      },
      sendRedPack() {
          let data = {func:'SendRecPack', control: 'wechat', openid: this.wxopenid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
              if(res.data.errcode=='success') {
                  this.retMsg = res.data.ret
              }
          });
      },
      wxAuthod() {
          console.log('wxAuthod')
          let redirect_uri = 'https://mini.gamegold.xin/gg-wechat-client/?openid=' + this.GLOBAL.openid
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5e9d7ae34ad4b4'
          url += '&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
          window.location.href = url
      },
      getOpenid() {
          console.log('getOpenid')
          let data = {func:'GetMapOpenId', control: 'wechat', code: this.code, openid: this.GLOBAL.openid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
              if(res.data.errcode=='success') {
                  this.wxopenid = res.data.userProfile.wxopenid
                  this.uid = res.data.userProfile.uid
              }
          });
      }
  },
  created() {
    if(!!this.$route.params.code) {
        this.code = this.$route.params.code
        this.getOpenid()
    } else {
        if(!!!this.GLOBAL.userProfile) {
            this.$router.push('/mine')
            console.log('goto route mine')
        } else if( !!!this.GLOBAL.userProfile.wxopenid) {
            this.wxAuthod()
        } else {
            this.wxopenid = this.GLOBAL.userProfile.wxopenid
            this.uid = this.GLOBAL.userProfile.uid      
            console.log('has wxopenid & uid ', this.wxopenid, this.uid)   
        }
    }
  }
}
</script>