<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">用户登录<a slot="right" @click="btnRegister">注册</a></x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" v-model="username" keyboard="number" is-type="china-mobile"></x-input>
    </group>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="密码" type="password" placeholder="必填" ></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="btnLogin()" ref="child1" type="primary" v-bind:show-loading="showLoading"> 登录</x-button>
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
      username: ''
    }
  },
  methods: {
      btnLogin() {
        console.log('btnLogin')
        this.showLoading = true
      },
      btnRegister() {
        console.log('Register')
        this.$router.push('/Register')
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
