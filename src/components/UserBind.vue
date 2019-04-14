<template>
  <div>
    <x-header :left-options="{showBack: false}" >{{toDo}}</x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="手机号码" name="mobile" placeholder="必填" v-model="mobile" keyboard="number"></x-input>
    </group>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="短信验证码" class="weui-vcode">
          <x-button slot="right" type="primary" mini v-model="code">发送验证码</x-button>
        </x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="btnCreate()" type="primary" v-bind:show-loading="showLoading"> 登录</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton, XHeader  } from 'vux'
import { setTimeout } from 'timers';

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    XHeader 
  },
  data () {
    return {
      toDo: '账号绑定',
      showLoading: false,
      showCreateing: false,
      mobile: '',
      code: ''
    }
  },
  methods: {
      showPlugin(msg) {
        this.$vux.alert.show({
            title: '提示',
            content: msg
        })
      },

      btnLogin() {
        if(this.mobile == '') {
            this.showPlugin('手机号码不能为空')
            return
        }
        
        if(this.code == '') {
            this.showPlugin('验证码不能为空')
            return
        }

        if(this.GLOBAL.userBase.openid == null) {
            this.showPlugin('未用微信账号登录，现在无法绑定')
            return 
        }

        this.showLoading = true
        setTimeout(()=>{
            this.showPlugin('游戏金ID或密码错误')
            this.showLoading = false
        }, 1000)

      },

      btnCreate() {
        if(this.GLOBAL.userBase.openid == null) {
            this.showPlugin('未用微信账号登录，无法创建新用户')
            return 
        }

        console.log('InitUserFromOpenId')
        let openid = this.GLOBAL.userBase.openid
        let data = {func:'InitUserFromOpenId', control: 'wechat', openid: openid, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
            if(res.data.errcode=='success') {
                let userProfile = res.data.userProfile
                this.GLOBAL.userBase.uid = res.data.uid
                this.$router.push('/login')
            } else {
                this.showPlugin('创建失败')
            }
        });

      },
  },
  created() {
      console.log('onUserBind')
  }
}
</script>
