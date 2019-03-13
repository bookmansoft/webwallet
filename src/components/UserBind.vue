<template>
  <div>
    <x-header :left-options="{showBack: false}" >用户绑定</x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="钱包ID" name="user_name" placeholder="游戏金钱包ID" v-model="user_name" keyboard="number"></x-input>
    </group>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="密码" v-model="password" type="password" placeholder="必填" ></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="btnBind()" type="primary" v-bind:show-loading="showLoading"> 绑定</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="btnCreate()" type="default" v-bind:show-loading="showCreateing"> 自动创建新用户</x-button>
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
      showLoading: false,
      showCreateing: false,
      user_name: '',
      password: ''
    }
  },
  methods: {
      showPlugin(msg) {
        this.$vux.alert.show({
            title: '提示',
            content: msg
        })
      },

      btnBind() {
        if(this.user_name == '') {
            this.showPlugin('游戏金ID不能为空')
            return
        }
        if(this.password == '') {
            this.showPlugin('密码不能为空')
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
                this.$router.push('/home')
            } else {
                this.showPlugin('创建失败')
            }
        });

      },

      onBack() {
        this.$router.push('/Home')
      },
  },
  created() {
      console.log('on create')
  }
}
</script>
