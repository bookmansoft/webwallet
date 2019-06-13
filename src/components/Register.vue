<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">用户注册<a slot="right" @click="btnLogin">登录</a></x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="手机号码" name="mobile" ref="mobile" placeholder="请输入手机号码" v-model="mobile" keyboard="number" is-type="china-mobile" required></x-input>
    </group>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="密码" type="password" placeholder="输入密码" required></x-input>
    </group>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="验证码" class="weui-vcode" placeholder="验证码" v-model="vfcode" :is-type="codeValue" ref="vfcode" required>
          <x-button slot="right" type="primary" @click.native="getVfcode" mini>发送验证码</x-button>
      </x-input>
    </group>

    <div style="padding:15px;">
      <x-button @click.native="btnRegister()" ref="child1" type="primary" v-bind:show-loading="showLoading"> 注册</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton, XHeader  } from 'vux'

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
      mobile: '',
      vfcode: '',
      codeValue: function(value){
        return {
          valid: value.length === 4,
          msg: "验证码有误!"
        }
      }
    }
  },
  methods: {
      btnLogin() {
        console.log('btnLogin')
        this.$router.push('/Login')
      },
      btnRegister() {
        this.showLoading = true
      },
      onBack() {
        this.$router.push('/Home')
      },
      getVfcode() {
        console.log("mobile result:" + this.$refs.mobile.valid);
        console.log("refcode result:" + this.$refs.vfcode.valid);
        const data = {
          username: this.mobile,
          type: 1
        }
        this.axios.post(this.GLOBAL.apiUrl+'/user/vfcode', data).then(res => {
          console.log(res.data)
          if(res.data.code == 0) {
              this.vfcode = res.data.verify_code
          }
        })
      }
  },
  created() {
      console.log('on create')
  }
}
</script>
